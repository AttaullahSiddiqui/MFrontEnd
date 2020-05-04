import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawMethodsComponent } from './withdraw-methods.component';

describe('WithdrawMethodsComponent', () => {
  let component: WithdrawMethodsComponent;
  let fixture: ComponentFixture<WithdrawMethodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawMethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
