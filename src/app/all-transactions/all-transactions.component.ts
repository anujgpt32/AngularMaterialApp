import { LocalStorage } from '@ngx-pwa/local-storage';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { MatTableDataSource} from '@angular/material'

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.css']
})
export class AllTransactionsComponent implements OnInit {

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

    fetchData() {
        let data = {
            username:this.username
        }
        this.transactionService.getAllTransaction(data).subscribe(transactions => {
            this.transactions = transactions['transactions'];
            console.log(JSON.stringify(transactions));
        });
    }

    sortData($event) {

    }

}
