import { Component, input } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { FormField } from '../../../models/field';

@Component({
  selector: 'app-slider-field',
  imports: [MatSliderModule],
  template: `
    <div class="w-full">
      <label class="block text-sm font-medium mb-2">
        {{ field().label }}
        @if(field().required) {
        <span class="text-red-500">*</span>
        }
      </label>
      <mat-slider
        [min]="field().min || 0"
        [max]="field().max || 100"
        [step]="field().step || 1"
        class="w-full"
      >
        <input
          matSliderThumb
          [value]="field().value || 50"
          [required]="field().required"
        />
      </mat-slider>
      <div class="flex justify-between text-xs text-gray-500 mt-1">
        <span>{{ field().min || 0 }}</span>
        <span>{{ field().max || 100 }}</span>
      </div>
    </div>
  `,
  styles: ``,
})
export class SliderFieldComponent {
  field = input.required<FormField>();
}
