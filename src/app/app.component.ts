import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormElementsMenuComponent } from './components/form-elements-menu/form-elements-menu.component';
import { MainCanvasComponent } from './components/main-canvas/main-canvas.component';
import { FieldSettingsComponent } from './components/field-settings/field-settings.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormService } from './services/form.service';

@Component({
  selector: 'app-root',
  imports: [
    FormElementsMenuComponent,
    MainCanvasComponent,
    FieldSettingsComponent,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <div class="flex flex-col h-screen bg-background px-4">
      <div
        class="bg-background flex flex-col items-center justify-center gap-1 py-10 [view-transition-name:top-header] z-10"
      >
        <h1 class="text-2xl text-primary tracking-wide font-medium">
          Angular Forms Designer
        </h1>

        <p class="text-on-background">
          Create beautiful reactive forms with Angular Forms Designer.
        </p>
      </div>
      <div class="flex gap-4 relative" cdkDropListGroup>
        <app-form-elements-menu class="w-64" />
        <app-main-canvas class="flex-1" />
        <app-field-settings class="w-64" />
        <button
          mat-flat-button
          class="!absolute -top-[50px] right-0 compact-button z-99"
          (click)="formService.exportForm()"
        >
          Export Form <mat-icon>download</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'forms-designer';

  formService = inject(FormService);
}
