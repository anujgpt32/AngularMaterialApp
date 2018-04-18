import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitTransactionsComponent } from './debit-transactions.component';

describe('DebitTransactionsComponent', () => {
  let component: DebitTransactionsComponent;
  let fixture: ComponentFixture<DebitTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
