import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawApprovalComponent } from './withdraw-approval.component';

describe('WithdrawApprovalComponent', () => {
  let component: WithdrawApprovalComponent;
  let fixture: ComponentFixture<WithdrawApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
