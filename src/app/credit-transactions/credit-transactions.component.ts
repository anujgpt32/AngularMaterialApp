import { LocalStorage } from '@ngx-pwa/local-storage';
import { TransactionService } from './../transaction.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-credit-transactions',
  templateUrl: './credit-transactions.component.html',
  styleUrls: ['./credit-transactions.component.css']
})
export class CreditTransactionsComponent implements OnInit, AfterViewInit {

    username:string;
    transactions:object;

    constructor(private transactionService: TransactionService,
        private localStorage: LocalStorage) {
        this.localStorage.getItem('user').subscribe(data => {
            this.username = data['username'];
            this.fetchData();
        })
    }
    ngOnInit() { }

    ngAfterViewInit() {
        this.fetchData();
    }

    fetchData() {
        let data = {
            username:this.username
        }
        this.transactionService.getCreditTransactions(data).subscribe(transactions => {
            if (transactions['success'] == 1) {
                this.transactions = transactions['transactions'];
            }
        });
    }

}
