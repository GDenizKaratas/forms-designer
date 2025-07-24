import { Component, inject, signal } from '@angular/core';
import { FormEditorComponent } from './form-editor/form-editor.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormPreviewComponent } from './form-preview/form-preview.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-main-canvas',
  imports: [
    FormEditorComponent,
    MatButtonToggleModule,
    FormPreviewComponent,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div
      class="p-4 bg-white rounded-lg h-[calc(100vh-150px)] overflow-y-auto border-gray-200 shadow-sm"
    >
      <div class="pb-4 border-b border-gray-200 flex gap-2 items-center">
        <h3 class="text-xl font-medium text-primary">Form Canvas</h3>
        <mat-button-toggle-group
          [value]="activeTab()"
          (valueChange)="activeTab.set($event)"
          hideSingleSelectionIndicator="true"
        >
          <mat-button-toggle value="editor">Editor</mat-button-toggle>
          <mat-button-toggle value="preview">Preview</mat-button-toggle>
        </mat-button-toggle-group>
        @if(activeTab() === 'editor') {
        <div class="flex-1"></div>
        <button
          mat-flat-button
          class="compact-button"
          (click)="formService.addRow()"
        >
          Add Row
          <mat-icon>add_circle</mat-icon>
        </button>
        }
      </div>

      @if(activeTab() === 'editor') {

      <app-form-editor />
      } @else {
      <app-form-preview />
      }
    </div>
  `,
  styles: `
  @use '@angular/material' as mat;
  mat-button-toggle-group {
    @include mat.button-toggle-overrides((
      shape:5px,
      height:36px,
      selected-state-background-color: var(--mat-sys-primary),
      selected-state-text-color: var(--mat-sys-on-primary)
    ))
  }
  
  `,
})
export class MainCanvasComponent {
  activeTab = signal<'preview' | 'editor'>('editor');

  formService = inject(FormService);
}
