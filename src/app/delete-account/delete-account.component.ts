import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
// import * as EmailValidator from 'email-validator';
// import * as CryptoJS from 'crypto-js';
import Utility from './../utilities/utility'
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';

@Component({
    selector: 'app-delete-account',
    templateUrl: './delete-account.component.html',
    styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

    username:string;
    password:string;
    email:string;

    constructor(public snackBar:MatSnackBar, 
        private authService:AuthService,
        private dialog:MatDialog,
        private router:Router,
        private localStorage:LocalStorage) { }

    ngOnInit() {
    }

    confirm() {
        let isValid = this.validate();
        if (isValid) {
            let data = {
                username:this.username,
                password:Utility.passwordToSHA256(this.password)
            };
            this.authService.authenticateUser(data).subscribe(authResult => {
                if (authResult['success'] == 1) {
                    data['email'] = this.email;
                    let dialogRef = this.dialog.open(DeleteAccountDialogComponent);
                    dialogRef.afterClosed().subscribe(dialogResult => {
                        if (dialogResult == 'deleted') {
                            //code to delete the account.
                            this.authService.deleteAccount(data).subscribe(deleteResult => {
                                if (deleteResult['success'] == 1) {
                                    this.localStorage.clear().subscribe(() => {
                                        this.snackBar.open('Bye Bye', null, {
                                            duration:1000
                                        })
                                        .afterDismissed()
                                        .subscribe(() => {
                                            this.router.navigate(['']);
                                        })
                                    })
                                } else {
                                    this.snackBar.open('Operation Failed', null, {
                                        duration:1500
                                    })
                                }
                            });
                        } else if (dialogResult == 'cancel') {
                            this.snackBar.open('Operation Cancelled', null, {
                                duration:1500
                            });
                        }
                    });
                } else {
                    this.snackBar.open('Authentication Failure', null, {
                        duration:1500
                    });
                }
            });
        }
    }

    validate() {
        let isValid = true;
        let messages = [];
        if (this.username == null || this.username == "") {
            isValid = false;
            messages.push("Invalid Username.");
        }
        if (this.password == null || this.password.length < 8) {
            isValid = false;
            messages.push("Invalid Password");
        }
        if (this.email==null || this.email.length==0) {
            isValid = false;
            messages.push('Empty email field');
        }
        else if (!Utility.validateEmail(this.email)) {
            isValid = false;
            messages.push('Invalid email');
        }
        if (messages.length>0) {
            this.snackBar.open(messages.join(' '), null, {
                duration:2000
            });
        }
        return isValid;
    }

}
