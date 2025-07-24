import { Component, input, signal } from '@angular/core';
import { FieldTypeDefinition } from '../../../models/field';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-field-button',
  imports: [MatIconModule, DragDropModule],
  template: `
    <button
      cdkDrag
      [cdkDragData]="field()"
      (cdkDragStarted)="whileDragging.set(true)"
      (cdkDragEnded)="whileDragging.set(false)"
      class="w-full p-3 border border-gray-200 hover:border-primary hover:shadow-md transition-shadow rounded-lg flex items-center gap-3 cursor-pointer"
    >
      <div
        class="rounded-md bg-primary-container flex items-center jutifiy-center p-1"
      >
        <mat-icon class="scale-75 !text-primary">{{ field().icon }}</mat-icon>
      </div>
      <span>
        {{ field().label }}
      </span>

      <div *cdkDragPlaceholder></div>
    </button>

    @if(whileDragging()) {
    <div
      class="w-full p-3 border border-gray-200 hover:border-black hover:shadow-md transition-shadow rounded-lg flex items-center gap-3 cursor-pointer"
    >
      <div
        class="rounded-md bg-primary-container flex items-center jutifiy-center p-1"
      >
        <mat-icon class="scale-75 !text-primary">{{ field().icon }}</mat-icon>
      </div>
      <span>
        {{ field().label }}
      </span>
    </div>

    }
  `,
  styles: ``,
})
export class FieldButtonComponent {
  field = input.required<FieldTypeDefinition>();

  whileDragging = signal(false);
}
