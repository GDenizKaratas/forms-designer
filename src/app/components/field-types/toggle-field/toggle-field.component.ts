import { Component, input } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormField } from '../../../models/field';

@Component({
  selector: 'app-toggle-field',
  imports: [MatSlideToggleModule],
  template: `
    <div class="w-full">
      <mat-slide-toggle
        [required]="field().required"
        [checked]="field().checked || false"
        class="w-full"
      >
        {{ field().label }}
        @if(field().required) {
        <span class="text-red-500">*</span>
        }
      </mat-slide-toggle>
    </div>
  `,
  styles: ``,
})
export class ToggleFieldComponent {
  field = input.required<FormField>();
}
