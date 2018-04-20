import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AuthService } from './../auth.service';
import { Component, OnInit, Inject } from '@angular/core';
import Utility from './../utilities/utility'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnInit {

    username:string;
    password:string;

    constructor(public snackBar:MatSnackBar, 
        public dialogRef:MatDialogRef<ChangePasswordDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private newPassword:string,
        private authService:AuthService, private localStorage:LocalStorage,
        private router:Router) { }

    ngOnInit() { }

    changePassword() {
        let isValid = this.validateData();
        if (isValid) {
            let authData = {
                username:this.username,
                password:Utility.passwordToSHA256(this.password)
            }
            this.authService.authenticateUser(authData).subscribe(authResult => {
                if (authResult['success'] == 1) {
                    let newData = {
                        'username':this.username,
                        'newPassword':this.newPassword,
                        'oldPassword':Utility.passwordToSHA256(this.password)
                    };
                    this.authService.changePasswordFromConsole(newData).subscribe(changeResult => {
                        if (changeResult['success'] == 1) {
                            //password succesfully changed
                            this.localStorage.clear().subscribe(() => {
                                this.dialogRef.close();
                                this.router.navigate(['']);
                            });
                        } else {
                            this.snackBar.open('Operation Failed', null, {
                                duration:1300
                            });
                        }
                    });
                }
            })
        }
    }

    validateData() {
        let isValid = true;
        if (this.username == null || this.username == "") {
            isValid = false;
        }
        if (this.password == null || this.password.length<8) {
            isValid = false;
        }
        if (!isValid) {
            this.snackBar.open('InvalidData', null, {
                duration:1500
            });
        }
        return isValid;
    }

    cancel() {
        this.dialogRef.close('cancel');
    }

    close(data:any) {
        this.dialogRef.close(data);
    }

}
