import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormField } from '../../../models/field';

@Component({
  selector: 'app-number-field',
  imports: [MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>{{ field().label }}</mat-label>
      <input
        matInput
        type="number"
        [required]="field().required"
        [placeholder]="field().placeholder || ''"
        [min]="field().min"
        [max]="field().max"
        [step]="field().step || 1"
      />
      @if(field().required) {
      <mat-error>This field is required</mat-error>
      }
    </mat-form-field>
  `,
  styles: ``,
})
export class NumberFieldComponent {
  field = input.required<FormField>();
}
