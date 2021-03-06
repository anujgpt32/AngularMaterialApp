import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import Utility from './../utilities/utility';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private authService:AuthService, 
        public snackbar:MatSnackBar,
        private localStorage:LocalStorage,
        private route:Router) { }

    username:string;
    password:string;

    ngOnInit() { }

    login() {
        let validationResult = this.validateData();
        if (validationResult) {
            let authData = {
                'username':this.username,
                'password':Utility.passwordToSHA256(this.password),
                'timestamp': Date.now()
            }
            this.authService.login(authData).subscribe(loginResult => {
                if (loginResult['success']==1) {
                    this.onSuccessfulLogin(loginResult);
                } else {
                    //show failure snackbar.
                    //console.log(JSON.stringify(loginResult));
                    this.showSnackBar('Login Failure', null, 2000);
                }
            });
        }
    }

    showSnackBar(message:string, action:string, duration:number) {
        this.snackbar.open(message, action, {
            duration:duration
        });
    }

    onSuccessfulLogin(loginResult) {
        //store the userdata in the local storage.
        this.localStorage.setItem('user', loginResult).subscribe(() => {
            //successful storage
            this.username = "";
            this.password = "";
            this.route.navigate(['home']);
        }, () => {
            //error.
            this.showSnackBar('Login Failure', null, 2000);
        })
    }

    validateData() {
        let messages = []
        let isValid = true;
        if (this.username == null || this.username == "") {
            isValid = false;
            messages.push('Invalid Username');
        }
        if (this.password == null || this.password.length<8) {
            isValid = false;
            messages.push('Invalid Password');
        }
        if (messages.length>0)
            this.showSnackBar(messages.join('. '), null, 2000);
        return isValid;
    }
}
