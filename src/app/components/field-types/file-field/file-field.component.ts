import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormField } from '../../../models/field';

@Component({
  selector: 'app-file-field',
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="w-full">
      <label class="block text-sm font-medium mb-2">
        {{ field().label }}
        @if(field().required) {
        <span class="text-red-500">*</span>
        }
      </label>
      <div
        class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors"
      >
        <mat-icon class="text-gray-400 mb-2">cloud_upload</mat-icon>
        <p class="text-sm text-gray-600 mb-2">
          {{
            field().multiple
              ? 'Choose files or drag here'
              : 'Choose file or drag here'
          }}
        </p>
        <input
          type="file"
          [required]="field().required"
          [multiple]="field().multiple || false"
          [accept]="field().accept || ''"
          class="hidden"
          #fileInput
        />
        <button
          mat-raised-button
          color="primary"
          (click)="fileInput.click()"
          type="button"
        >
          <mat-icon>upload_file</mat-icon>
          Select {{ field().multiple ? 'Files' : 'File' }}
        </button>
      </div>
      @if(field().accept) {
      <p class="text-xs text-gray-500 mt-1">
        Accepted formats: {{ field().accept }}
      </p>
      }
    </div>
  `,
  styles: ``,
})
export class FileFieldComponent {
  field = input.required<FormField>();
}
