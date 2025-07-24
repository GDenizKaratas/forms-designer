import { Component, input } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormField } from '../../../models/field';

@Component({
  selector: 'app-radio-field',
  imports: [MatRadioModule],
  template: `
    <div class="w-full">
      <label class="block text-sm font-medium mb-2">
        {{ field().label }}
        @if(field().required) {
        <span class="text-red-500">*</span>
        }
      </label>
      <mat-radio-group
        [required]="field().required"
        class="flex flex-col gap-2"
      >
        @if(field().options) { @for(option of field().options; track
        option.value) {
        <mat-radio-button [value]="option.value">
          {{ option.label }}
        </mat-radio-button>
        } } @else {
        <mat-radio-button value="option1">Option 1</mat-radio-button>
        <mat-radio-button value="option2">Option 2</mat-radio-button>
        <mat-radio-button value="option3">Option 3</mat-radio-button>
        }
      </mat-radio-group>
    </div>
  `,
  styles: ``,
})
export class RadioFieldComponent {
  field = input.required<FormField>();
}
