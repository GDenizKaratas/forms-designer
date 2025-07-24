import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormField } from '../../../models/field';

@Component({
  selector: 'app-textarea-field',
  imports: [MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>{{ field().label }}</mat-label>
      <textarea
        matInput
        [rows]="field().rows || 4"
        [required]="field().required"
        [placeholder]="field().placeholder || ''"
      ></textarea>
      @if(field().required) {
      <mat-error>This field is required</mat-error>
      }
    </mat-form-field>
  `,
  styles: ``,
})
export class TextareaFieldComponent {
  field = input.required<FormField>();
}
