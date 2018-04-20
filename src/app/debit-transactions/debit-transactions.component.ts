import { LocalStorage } from '@ngx-pwa/local-storage';
import { TransactionService } from './../transaction.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-debit-transactions',
  templateUrl: './debit-transactions.component.html',
  styleUrls: ['./debit-transactions.component.css']
})
export class DebitTransactionsComponent implements OnInit {

    username:string;
    transactions = [];
    totalDebitedAmount = 0.0;

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
        this.transactionService.getDebitTransactions(data).subscribe(transactions => {
            if (transactions['success'] == 1) {
                this.transactions = transactions['transactions'];
                this.calculateAmount();
            }
        });
    }

    calculateAmount() {
        for (let transaction of this.transactions) {
            this.totalDebitedAmount += transaction['amount'];
        }
        console.log(this.totalDebitedAmount);
    }

}
