import { LocalStorage } from '@ngx-pwa/local-storage';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

    private userData: any;

    private balance: number;

    constructor(private localStorage: LocalStorage) {
        localStorage.getItem('user').subscribe(data => {
            this.balance = data['balance'].toFixed(2);
            // console.log(JSON.stringify(data));
            // console.log(this.balance);
        });
    }

    ngOnInit() {
    }

}
