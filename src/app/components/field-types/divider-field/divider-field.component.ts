import { Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { FormField } from '../../../models/field';

@Component({
  selector: 'app-divider-field',
  imports: [MatDividerModule],
  template: `
    <div class="w-full my-6">
      @if(field().label) {
      <h3 class="text-lg font-medium mb-2 text-gray-700">
        {{ field().label }}
      </h3>
      }
      <mat-divider
        [style]="{
          'border-style': field().style || 'solid',
          'border-width': '1px 0 0 0'
        }"
      >
      </mat-divider>
    </div>
  `,
  styles: ``,
})
export class DividerFieldComponent {
  field = input.required<FormField>();
}
