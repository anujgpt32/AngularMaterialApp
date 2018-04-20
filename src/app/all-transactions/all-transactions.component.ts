import { LocalStorage } from '@ngx-pwa/local-storage';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { MatTableDataSource} from '@angular/material';
import { MatPaginator } from '@angular/material'
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.css']
})
export class AllTransactionsComponent implements OnInit, AfterViewInit {

    username:string;
    transactions = [];

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
        this.transactionService.getAllTransactions(data).subscribe(transactions => {
            if (transactions['success'] == 1) {
                this.transactions = transactions['transactions'];
                this.changeValues();
            }
        });
    }

    changeValues() {
        for (let transaction of this.transactions) {
            console.log(transaction);
            if (transaction['from']==this.username) {
                transaction['from'] = 'You'
            }
            if (transaction['to']==this.username) {
                transaction['to'] = 'You'
            }
        }
    }

}