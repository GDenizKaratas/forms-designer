import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormField } from '../../../models/field';

@Component({
  selector: 'app-text-field',
  imports: [MatCheckboxModule],
  template: `
    <mat-checkbox [required]="field().required">
      {{ field().label }}

      @if(field().required) {
      <span class="text-red-500">*</span>
      }
    </mat-checkbox>
  `,
  styles: ``,
})
export class CheckboxFieldComponent {
  field = input.required<FormField>();
}
