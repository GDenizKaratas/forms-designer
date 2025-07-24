import { Type } from '@angular/core';

export interface FieldTypeDefinition {
  type: string;
  label: string;
  icon: string;
  defaultConfig: any;
  settingsConfig: FieldSettingsDefinition[];
  component: Type<unknown>;
  generateCode: (field: FormField) => string;
}

export interface FieldSettingsDefinition {
  type: 'text' | 'number' | 'checkbox' | 'select' | 'date' | 'dynamic-options';
  key: string;
  label: string;
  options?: OptionItem[];
}

export interface OptionItem {
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  inputType?: string;
  placeholder?: string;
  options?: OptionItem[];
  min?: number;
  max?: number;
  minDate?: any;
  maxDate?: any;
  step?: number;
  value?: any;
  rows?: any;
  multiple?: any;
  accept?: any;
  checked?: any;
  style?: any;
}
