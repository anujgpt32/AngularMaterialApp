import { MatSnackBar } from '@angular/material';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

    username:string;
    password:string;
    amount:string;

    constructor(private authService:AuthService, 
        private transactionService:TransactionService,
        private localStorage: LocalStorage,
        public snackBar: MatSnackBar) {
        this.localStorage.getItem('user').subscribe(data => {
            this.username = data['username'];
            console.log(this.username);
        });
    }

    ngOnInit() {
    }

    add() {
        let isValid = this.validateData();
        if (isValid) {
            this.authAndSaveData();
        }
    }

    authAndSaveData() {
        let authData = {
            username:this.username,
            password:CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex)
        }
        this.authService.authenticateUser(authData).subscribe(authResult => {
            if (authResult['success'] == 1) {
                this.addMoney();
            } else {
                this.snackBar.open('Authentication Failure');
            }
        });
    }

    addMoney() {
        let moneyData = {
            username:this.username,
            amount: Number(this.amount)
        }
        this.transactionService.addMoney(moneyData).subscribe(transactionResult => {
            // console.log(JSON.stringify(transactionResult));
            if (transactionResult['success'] == 1) {
                this.localStorage.getItem('user').subscribe(data => {
                    console.log(JSON.stringify(data));
                    data['balance'] = Number(data['balance'])+Number(this.amount);
                    this.localStorage.clear();
                    this.localStorage.setItem('user', data).subscribe(() => {
                        this.snackBar.open('Successful', 'DISMISS', {
                            duration:2000
                        });
                    });
                })
            } else {
                this.snackBar.open('Transaction Unsuccessful', 'DISMISS', {
                    duration:2000
                });
            }
        });
    }

    validateData() {
        let isValid = true;
        let messages = [];
        if (this.password == null || this.password.length < 7) {
            messages.push('Password should be atleast length 8.');
            isValid = false;
        }
        if (this.amount == null || isNaN(Number(this.amount))) {
            messages.push('Amount should be a number');
            isValid = false;
        }
        else if (!isNaN(Number(this.amount))) {
            let amt = Number(this.amount);
            if (amt <= 0) {
                isValid = false;
                messages.push('Amount Should be atleast $1.')
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
