import * as CryptoJS from 'crypto-js';
import { ChangePasswordDialogComponent } from './../change-password-dialog/change-password-dialog.component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

    newPassword:string;
    confirmNewPassword:string;
    constructor(public snackBar:MatSnackBar,
        public dialog:MatDialog) { }

    ngOnInit() {
    }

    confirm() {
        let isNewDataValid = this.validateNewData();
        if (isNewDataValid) {
            console.log("new password plain: "+this.newPassword);
            //show the dialog for getting the username and old password.
            let dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
                width: '450px',
                data: CryptoJS.SHA256(this.newPassword).toString(CryptoJS.enc.Hex)
            });
        }
    }

    validateNewData() {
        let isValid = true;
        if (this.newPassword == null || this.newPassword.length<7) {
            isValid = false;
        }
        if (this.confirmNewPassword == null || this.confirmNewPassword.length < 7) {
            isValid = false;
        }
        if (!isValid) {
            this.snackBar.open('Passwords should be atleast length 8', null, {
                duration:2000
            });
            return isValid;
        }
        if (this.confirmNewPassword != this.newPassword) {
            isValid = false;
            this.snackBar.open(`Password doesn't match`, null, {
                duration:1500
            });
            return isValid;
        }
        return isValid;
    }

}
