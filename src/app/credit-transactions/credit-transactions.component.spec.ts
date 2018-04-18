import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditTransactionsComponent } from './credit-transactions.component';

describe('CreditTransactionsComponent', () => {
  let component: CreditTransactionsComponent;
  let fixture: ComponentFixture<CreditTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
