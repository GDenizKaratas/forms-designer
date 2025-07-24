import {
  ApplicationRef,
  computed,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { FormRow } from '../models/form';
import { FormField } from '../models/field';
import { FieldTypesService } from './field-types.service';
import { startViewTransition } from '../utils/view-transition';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private _rows = signal<FormRow[]>([]);
  private _selectedFieldId = signal<string | null>(null);

  public readonly rows = this._rows.asReadonly();
  public readonly selectedField = computed(() =>
    this._rows()
      .flatMap((row) => row.fields)
      .find((field) => field.id === this._selectedFieldId())
  );

  private appRef = inject(ApplicationRef);

  constructor(private fieldTypesService: FieldTypesService) {
    this._rows.set([{ id: crypto.randomUUID(), fields: [] }]);
  }

  addField(field: FormField, rowId: string, index?: number) {
    const rows = this._rows();
    const newRows = rows.map((row) => {
      if (row.id === rowId) {
        const updatedFields = [...row.fields];
        if (index !== undefined) {
          updatedFields.splice(index, 0, field);
        } else {
          updatedFields.push(field);
        }
        return { ...row, fields: updatedFields };
      }
      return row;
    });

    startViewTransition(() => {
      this._rows.set(newRows);
    });
  }

  deleteField(fieldId: string) {
    const rows = this._rows();
    const newRows = rows.map((row) => {
      const updatedFields = row.fields.filter((field) => field.id !== fieldId);
      return { ...row, fields: updatedFields };
    });
    startViewTransition(() => {
      this._rows.set(newRows);
    });
  }

  addRow() {
    const newRow: FormRow = { id: crypto.randomUUID(), fields: [] };
    startViewTransition(() => {
      this._rows.set([...this._rows(), newRow]);
    });
  }

  deleteRow(rowId: string) {
    if (this._rows().length === 1) {
      return;
    }
    const newRows = this._rows().filter((row) => row.id !== rowId);

    startViewTransition(() => {
      this._rows.set(newRows);
    });
  }

  moveField(
    fieldId: string,
    sourceRowId: string,
    targetRowId: string,
    targetIndex: number = -1
  ) {
    const rows = this._rows();
    let fieldToMove: FormField | undefined;
    let sourceRowIndex = -1;
    let sourceFieldIndex = -1;

    rows.forEach((row, rowIndex) => {
      if (row.id === sourceRowId) {
        sourceRowIndex = rowIndex;
        sourceFieldIndex = row.fields.findIndex(
          (field) => field.id === fieldId
        );
        if (sourceFieldIndex !== -1) {
          fieldToMove = row.fields[sourceFieldIndex];
        }
      }
    });

    if (!fieldToMove) return;

    const newRows = [...rows];
    const fieldsWithRemovedField = newRows[sourceRowIndex].fields.filter(
      (f) => f.id !== fieldId
    );
    newRows[sourceRowIndex].fields = fieldsWithRemovedField;

    const targetRowIndex = newRows.findIndex((row) => row.id === targetRowId);
    if (targetRowIndex >= 0) {
      const targetFields = [...newRows[targetRowIndex].fields];
      targetFields.splice(targetIndex, 0, fieldToMove);
      newRows[targetRowIndex].fields = targetFields;
    }

    startViewTransition(() => {
      this._rows.set(newRows);
    });
  }

  setSelectedField(fieldId: string) {
    this._selectedFieldId.set(fieldId);
  }

  updateField(fieldId: string, data: Partial<FormField>) {
    const rows = this._rows();
    const newRows = rows.map((row) => {
      const updatedFields = row.fields.map((field) => {
        if (field.id === fieldId) {
          return { ...field, ...data };
        }
        return field;
      });
      return { ...row, fields: updatedFields };
    });
    startViewTransition(() => {
      this._rows.set(newRows);
    });
  }

  moveRowUp(rowId: string) {
    const rows = this._rows();
    const rowIndex = rows.findIndex((row) => row.id === rowId);
    if (rowIndex > 0) {
      const newRows = [...rows];
      const temp = newRows[rowIndex - 1];
      newRows[rowIndex - 1] = newRows[rowIndex];
      newRows[rowIndex] = temp;

      startViewTransition(() => {
        this._rows.set(newRows);
      });
    }
  }

  moveRowDown(rowId: string) {
    const rows = this._rows();
    const rowIndex = rows.findIndex((row) => row.id === rowId);
    if (rowIndex < rows.length - 1) {
      const newRows = [...rows];
      const temp = newRows[rowIndex + 1];
      newRows[rowIndex + 1] = newRows[rowIndex];
      newRows[rowIndex] = temp;
      startViewTransition(() => {
        this._rows.set(newRows);
      });
    }
  }

  //Export related functionality
  exportForm() {
    const formCode = this.generateFormCode();
    const blob = new Blob([formCode], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'form.ts';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  generateFormCode(): string {
    let code = this.generateImports();
    code += this.generateComponentDecoretor();
    code += `  template: \`\n` + `    <form class="flex flex-col gap-4">\n`;

    for (const row of this._rows()) {
      if (row.fields.length > 0) {
        code += `       <div class="flex gap-4 flex-wrap">\n`;
        for (const field of row.fields) {
          code += `       <div class="flex-1">\n`;
          code += this.generateFieldCode(field);
          code += `        </div>\n`;
        }

        code += `        </div>\n`;
      }
    }

    code += `    </form>\n`;
    code += `  \`,\n`;
    code += `})\n`;
    code += `export class GeneratedFormComponent { \n`;
    code += `}\n`;

    return code;
  }

  generateFieldCode(field: FormField): string {
    const fieldDef = this.fieldTypesService.getFieldType(field.type);
    return fieldDef?.generateCode(field) || '';
  }

  generateImports(): string {
    return (
      `import { Component } from '@angular/core';>\n` +
      `import { FormsModule } from '@angular/forms';\n` +
      `import { MatButtonModule } from '@angular/material/button';\n` +
      `import { MatInputModule } from '@angular/material/input';\n` +
      `import { MatSelectModule } from '@angular/material/select';\n` +
      `import { MatCheckboxModule } from '@angular/material/checkbox';\n` +
      `import { MatRadioModule } from '@angular/material/radio';\n` +
      `import { MatDatepickerModule } from '@angular/material/datepicker';\n` +
      `import { MatNativeDateModule } from '@angular/material/core';\n` +
      `import { MatIconModule } from '@angular/material/icon';\n` +
      `import { MatToolbarModule } from '@angular/material/toolbar';\n` +
      `import { MatFormFieldModule } from '@angular/material/form-field';\n` +
      `import { MatTooltipModule } from '@angular/material/tooltip';\n`
    );
  }

  generateComponentDecoretor(): string {
    return (
      `@Component({\n` +
      `  selector: 'app-exported-form',\n` +
      `  imports: [FormsModule, MatButtonModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatTooltipModule],\n`
    );
  }
}
