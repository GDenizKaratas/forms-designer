import { Injectable } from '@angular/core';
import { FieldTypeDefinition } from '../models/field';
import { TextFieldComponent } from '../components/field-types/text-field/text-field.component';
import { CheckboxFieldComponent } from '../components/field-types/checkbox-field/checkbox-field.component';
import { SelectFieldComponent } from '../components/field-types/select-field/select-field.component';
import { TextareaFieldComponent } from '../components/field-types/textarea-field/textarea-field.component';
import { RadioFieldComponent } from '../components/field-types/radio-field/radio-field.component';
import { DateFieldComponent } from '../components/field-types/date-field/date-field.component';
import { NumberFieldComponent } from '../components/field-types/number-field/number-field.component';
import { SliderFieldComponent } from '../components/field-types/slider-field/slider-field.component';
import { FileFieldComponent } from '../components/field-types/file-field/file-field.component';
import { ToggleFieldComponent } from '../components/field-types/toggle-field/toggle-field.component';
import { DividerFieldComponent } from '../components/field-types/divider-field/divider-field.component';

const TEXT_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'text',
  label: 'Text Field',
  icon: 'text_fields',
  defaultConfig: {
    label: 'Text Field',
    required: false,
  },
  settingsConfig: [
    {
      type: 'text',
      key: 'label',
      label: 'Label',
    },
    {
      type: 'text',
      key: 'placeholder',
      label: 'Placeholder',
    },
    {
      type: 'checkbox',
      key: 'required',
      label: 'Required',
    },
    {
      type: 'select',
      key: 'inputType',
      label: 'Input Type',
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Email', value: 'email' },
        { label: 'Number', value: 'number' },
        { label: 'Password', value: 'password' },
      ],
    },
  ],
  component: TextFieldComponent,
  generateCode: (field) => ` 
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>${field.label}</mat-label>
      <input matInput type="${field.inputType || 'text'}" placeholder="${
    field.placeholder || ''
  }" [required]="${field.required}" />
    </mat-form-field>`,
};

const CHECKBOX_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'checkbox',
  label: 'Checkbox',
  icon: 'check_box',
  defaultConfig: {
    label: 'Checkbox Field',
    required: false,
  },
  settingsConfig: [
    {
      type: 'text',
      key: 'label',
      label: 'Label',
    },
    {
      type: 'checkbox',
      key: 'required',
      label: 'Required',
    },
  ],
  component: CheckboxFieldComponent,
  generateCode: (field) => `
    <mat-checkbox [required]="${field.required}">${field.label}</mat-checkbox>
  `,
};

const SELECT_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'select',
  label: 'Dropdown',
  icon: 'arrow_drop_down_circle',
  component: SelectFieldComponent,
  defaultConfig: {
    label: 'Select Field',
    required: false,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    { type: 'checkbox', key: 'required', label: 'Required' },
    { type: 'dynamic-options', key: 'options', label: 'Dropdown Options' },
  ],
  generateCode: (field) => {
    let code =
      `           <mat-form-field appearance="outline" class="w-full">\n` +
      `             <mat-label>${field.label}</mat-label>\n` +
      `             <mat-select [required]="${field.required}">\n`;

    if (field.options) {
      field.options.forEach((option) => {
        code += `          <mat-option value="${option.value}">${option.label}</mat-option>\n`;
      });
    } else {
      code +=
        `               <mat-option value="option1">Option 1</mat-option>\n` +
        `               <mat-option value="option2">Option 2</mat-option>\n` +
        `               <mat-option value="option3">Option 3</mat-option>\n`;
    }

    code += `           </mat-select>\n` + `     </mat-form-field>\n`;
    return code;
  },
};

const TEXTAREA_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'textarea',
  label: 'Textarea',
  icon: 'notes',
  defaultConfig: {
    label: 'Textarea Field',
    required: false,
    rows: 4,
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    { type: 'text', key: 'placeholder', label: 'Placeholder' },
    { type: 'checkbox', key: 'required', label: 'Required' },
    { type: 'number', key: 'rows', label: 'Rows' },
  ],
  component: TextareaFieldComponent,
  generateCode: (field) => `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>${field.label}</mat-label>
      <textarea matInput rows="${field.rows || 4}" placeholder="${
    field.placeholder || ''
  }" [required]="${field.required}"></textarea>
    </mat-form-field>
  `,
};

const RADIO_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'radio',
  label: 'Radio Group',
  icon: 'radio_button_checked',
  defaultConfig: {
    label: 'Radio Group',
    required: false,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    { type: 'checkbox', key: 'required', label: 'Required' },
    { type: 'dynamic-options', key: 'options', label: 'Radio Options' },
  ],
  component: RadioFieldComponent,
  generateCode: (field) => {
    let code = `
    <div class="w-full">
      <label class="block text-sm font-medium mb-2">${field.label}</label>
      <mat-radio-group [required]="${field.required}">
    `;

    if (field.options) {
      field.options.forEach((option) => {
        code += `        <mat-radio-button value="${option.value}">${option.label}</mat-radio-button>\n`;
      });
    }

    code += `
      </mat-radio-group>
    </div>
    `;
    return code;
  },
};

const DATE_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'date',
  label: 'Date Picker',
  icon: 'calendar_today',
  defaultConfig: {
    label: 'Date Field',
    required: false,
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    { type: 'checkbox', key: 'required', label: 'Required' },
    { type: 'date', key: 'minDate', label: 'Min Date' },
    { type: 'date', key: 'maxDate', label: 'Max Date' },
  ],
  component: DateFieldComponent,
  generateCode: (field) => `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>${field.label}</mat-label>
      <input matInput [matDatepicker]="picker${field.id}" [required]="${field.required}">
      <mat-datepicker-toggle matIconSuffix [for]="picker${field.id}"></mat-datepicker-toggle>
      <mat-datepicker #picker${field.id}></mat-datepicker>
    </mat-form-field>
  `,
};

const NUMBER_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'number',
  label: 'Number Field',
  icon: 'pin',
  defaultConfig: {
    label: 'Number Field',
    required: false,
    min: undefined,
    max: undefined,
    step: 1,
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    { type: 'text', key: 'placeholder', label: 'Placeholder' },
    { type: 'checkbox', key: 'required', label: 'Required' },
    { type: 'number', key: 'min', label: 'Minimum Value' },
    { type: 'number', key: 'max', label: 'Maximum Value' },
    { type: 'number', key: 'step', label: 'Step' },
  ],
  component: NumberFieldComponent,
  generateCode: (field) => `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>${field.label}</mat-label>
      <input matInput type="number" 
             placeholder="${field.placeholder || ''}" 
             [required]="${field.required}"
             ${field.min !== undefined ? `min="${field.min}"` : ''}
             ${field.max !== undefined ? `max="${field.max}"` : ''}
             step="${field.step || 1}" />
    </mat-form-field>
  `,
};

const SLIDER_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'slider',
  label: 'Slider',
  icon: 'tune',
  defaultConfig: {
    label: 'Slider Field',
    required: false,
    min: 0,
    max: 100,
    step: 1,
    value: 50,
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    { type: 'checkbox', key: 'required', label: 'Required' },
    { type: 'number', key: 'min', label: 'Minimum Value' },
    { type: 'number', key: 'max', label: 'Maximum Value' },
    { type: 'number', key: 'step', label: 'Step' },
    { type: 'number', key: 'value', label: 'Default Value' },
  ],
  component: SliderFieldComponent,
  generateCode: (field) => `
    <div class="w-full">
      <label class="block text-sm font-medium mb-2">${field.label}</label>
      <mat-slider min="${field.min || 0}" max="${field.max || 100}" step="${
    field.step || 1
  }">
        <input matSliderThumb value="${field.value || 50}" [required]="${
    field.required
  }">
      </mat-slider>
    </div>
  `,
};

const FILE_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'file',
  label: 'File Upload',
  icon: 'upload_file',
  defaultConfig: {
    label: 'File Upload',
    required: false,
    multiple: false,
    accept: '',
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    { type: 'checkbox', key: 'required', label: 'Required' },
    { type: 'checkbox', key: 'multiple', label: 'Multiple Files' },
    {
      type: 'text',
      key: 'accept',
      label: 'Accepted File Types (e.g., .pdf,.jpg,.png)',
    },
  ],
  component: FileFieldComponent,
  generateCode: (field) => `
    <div class="w-full">
      <label class="block text-sm font-medium mb-2">${field.label}</label>
      <input type="file" 
             [required]="${field.required}"
             ${field.multiple ? 'multiple' : ''}
             ${field.accept ? `accept="${field.accept}"` : ''}
             class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
    </div>
  `,
};

const TOGGLE_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'toggle',
  label: 'Toggle Switch',
  icon: 'toggle_on',
  defaultConfig: {
    label: 'Toggle Field',
    required: false,
    checked: false,
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    { type: 'checkbox', key: 'required', label: 'Required' },
    { type: 'checkbox', key: 'checked', label: 'Default Checked' },
  ],
  component: ToggleFieldComponent,
  generateCode: (field) => `
    <div class="w-full">
      <mat-slide-toggle [required]="${field.required}" [checked]="${
    field.checked || false
  }">
        ${field.label}
      </mat-slide-toggle>
    </div>
  `,
};

const DIVIDER_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'divider',
  label: 'Divider',
  icon: 'horizontal_rule',
  defaultConfig: {
    label: 'Section Divider',
    style: 'solid',
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    {
      type: 'select',
      key: 'style',
      label: 'Style',
      options: [
        { label: 'Solid', value: 'solid' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Dotted', value: 'dotted' },
      ],
    },
  ],
  component: DividerFieldComponent,
  generateCode: (field) => `
    <div class="w-full my-6">
      ${
        field.label
          ? `<h3 class="text-lg font-medium mb-2">${field.label}</h3>`
          : ''
      }
      <mat-divider style="border-style: ${
        field.style || 'solid'
      }"></mat-divider>
    </div>
  `,
};

@Injectable({
  providedIn: 'root',
})
export class FieldTypesService {
  fieldTypes = new Map<string, FieldTypeDefinition>([
    ['text', TEXT_FIELD_DEFINITION],
    ['checkbox', CHECKBOX_FIELD_DEFINITION],
    ['select', SELECT_FIELD_DEFINITION],
    ['textarea', TEXTAREA_FIELD_DEFINITION],
    ['radio', RADIO_FIELD_DEFINITION],
    ['date', DATE_FIELD_DEFINITION],
    ['number', NUMBER_FIELD_DEFINITION],
    ['slider', SLIDER_FIELD_DEFINITION],
    ['file', FILE_FIELD_DEFINITION],
    ['toggle', TOGGLE_FIELD_DEFINITION],
    ['divider', DIVIDER_FIELD_DEFINITION],
  ]);

  constructor() {}

  getFieldType(type: string): FieldTypeDefinition | undefined {
    return this.fieldTypes.get(type);
  }

  getAllFieldTypes(): FieldTypeDefinition[] {
    return Array.from(this.fieldTypes.values());
  }
}
