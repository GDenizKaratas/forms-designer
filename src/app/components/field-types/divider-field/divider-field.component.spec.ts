import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerFieldComponent } from './divider-field.component';

describe('DividerFieldComponent', () => {
  let component: DividerFieldComponent;
  let fixture: ComponentFixture<DividerFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividerFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DividerFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
