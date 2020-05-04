import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComissionSettingsComponent } from './comission-settings.component';

describe('ComissionSettingsComponent', () => {
  let component: ComissionSettingsComponent;
  let fixture: ComponentFixture<ComissionSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComissionSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComissionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
