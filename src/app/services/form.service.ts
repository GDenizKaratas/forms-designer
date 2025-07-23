import { computed, Injectable, signal } from '@angular/core';
import { FormRow } from '../models/form';
import { FormField } from '../models/field';

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

  constructor() {
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
    this._rows.set(newRows);
  }

  deleteField(fieldId: string) {
    const rows = this._rows();
    const newRows = rows.map((row) => {
      const updatedFields = row.fields.filter((field) => field.id !== fieldId);
      return { ...row, fields: updatedFields };
    });
    this._rows.set(newRows);
  }

  addRow() {
    const newRow: FormRow = { id: crypto.randomUUID(), fields: [] };
    this._rows.set([...this._rows(), newRow]);
  }

  deleteRow(rowId: string) {
    if (this._rows().length === 1) {
      return;
    }
    const newRows = this._rows().filter((row) => row.id !== rowId);
    this._rows.set(newRows);
  }

  moveField(
    fieldId: string,
    sourceRowId: string,
    tragetRowId: string,
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

    const targetRowIndex = newRows.findIndex((row) => row.id === tragetRowId);
    if (targetRowIndex >= 0) {
      const targetFields = [...newRows[targetRowIndex].fields];
      targetFields.splice(targetIndex, 0, fieldToMove);
      newRows[targetRowIndex].fields = targetFields;
    }

    this._rows.set(newRows);
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
    this._rows.set(newRows);
  }
}
