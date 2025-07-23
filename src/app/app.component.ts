import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormElementsMenuComponent } from './components/form-elements-menu/form-elements-menu.component';
import { MainCanvasComponent } from './components/main-canvas/main-canvas.component';
import { FieldSettingsComponent } from './components/field-settings/field-settings.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  imports: [
    FormElementsMenuComponent,
    MainCanvasComponent,
    FieldSettingsComponent,
    DragDropModule,
  ],
  template: `
    <div class="flex flex-col h-screen bg-gray-100 px-4">
      <div class="flex flex-col items-center justify-center gap-1 py-10">
        <h1 class="text-2xl tracking-wide font-medium">
          Angular Forms Designer
        </h1>

        <p class="text-gray-500">
          Create beautiful reactive forms with Angular Forms Designer.
        </p>
      </div>
      <div class="flex gap-4" cdkDropListGroup>
        <app-form-elements-menu class="w-64"></app-form-elements-menu>
        <app-main-canvas class="flex-1"></app-main-canvas>
        <app-field-settings class="w-64"></app-field-settings>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'forms-designer';
}
