import { MatSnackBar } from '@angular/material';
import { TransactionService } from './../transaction.service';
import { AuthService } from './../auth.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {

    from:string;
    to:string;
    password:string;
    balance:number;     //current amount the sender possess
    amount:number;      //amount to be sent.
    description:string;     //description of the transaction.

    constructor(private localStorage:LocalStorage, 
        private authService:AuthService, 
        private transactionService:TransactionService, 
        private snackBar:MatSnackBar) { 
        
        this.localStorage.getItem('user').subscribe(data => {
            this.from = data['username'];
            this.balance = Number(data['balance']);
        });
    
    }

    ngOnInit() {
    }

    pay() {
        let isValid = this.validate();
        if (isValid) {
            this.authAndSendData();
        }
    }

    authAndSendData() {
        let authData = {
            username:this.from,
            password:CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex)
        }
        this.authService.login(authData).subscribe(authResult => {
            if (authResult['success'] == 1) {
                this.sendMoney();
            } else {
                this.snackBar.open('Authentication Failed', 'Dismiss', {
                    duration:2000
                });
            }
        });
    }

    sendMoney() {
        let moneyData = {
            from:this.from,
            to:this.to,
            description:this.description,
            amount: Number(this.amount)
        }
        this.transactionService.sendMoney(moneyData).subscribe(transactionResult => {
            console.log(JSON.stringify(transactionResult));
            if (transactionResult['success'] == 1) {
                this.localStorage.getItem('user').subscribe(data => {
                    console.log(JSON.stringify(data));
                    data['balance'] -= this.amount;
                    this.localStorage.clear();
                    this.localStorage.setItem('user', data).subscribe(() => {
                        this.snackBar.open('Successful', 'DISMISS', {
                            duration:2000
                        });
                    });
                })
            } else {
                this.snackBar.open('Invalid Reciever', 'DISMISS', {
                    duration:2000
                });
            }
        });
    }

    validate() {
        let isValid = true;
        let messages = [];
        if (this.to == null || this.to == '') {
            messages.push('Invalid Reciever username.');
            isValid = false;
        }
        if (this.password == null || this.password.length < 7) {
            messages.push('Password should be atleast length 8.');
            isValid = false;
        }
        if (this.amount == null || isNaN(Number(this.amount))) {
            messages.push('Amount should be a number.');
            isValid = false;
        }
        if (this.description == null || this.description == '') {
            messages.push('Empty Description');
            isValid = false;
        }
        else if (!isNaN(Number(this.amount))) {
            let amt = Number(this.amount);
            if (amt <= 0) {
                isValid = false;
                messages.push('Amount Should be atleast $1.')
            }
            else if (amt > this.balance) {
                isValid = false;
                messages.push('Amount is Greater than balance');
            }
        }
        if (messages.length > 0) {
            this.snackBar.open(messages.join(' '), 'DISMISS', {
                duration:2000
            });
        }
        return isValid;
    }

}
