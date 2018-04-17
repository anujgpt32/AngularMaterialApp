import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as CryptoJS from 'crypto-js';
import * as EmailValidator from 'email-validator';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    username:string;
    password:string;
    confirmPassword:string;
    firstName:string;
    lastName:string;
    email:string;
    agreed:string;

    constructor(private authService:AuthService, public snackBar:MatSnackBar) { }

    ngOnInit() {
    }

    /**
     * Reads the current state of the checkBox
     */
    onCheckboxStateChanged($event) {
        this.agreed = $event.checked;
    }

    /**
     * OnClick for the Register button.
     */
    register() {
        if (this.agreed) {
            let isValid = this.checkValidity();
            if (isValid['isValid']) {
                let authData = {
                    'firstName':this.firstName,
                    'lastName':this.lastName,
                    'username':this.username,
                    'password':CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex),
                    'email':this.email
                };
                this.authService.signUp(authData).subscribe(registrationResult => {
                    console.log(JSON.stringify(registrationResult));
                    if (registrationResult['success'] == 1) {
                        this.onRegistrationSuccess(registrationResult);
                        //show the "Head to Sign In Snackbar for ReAuthentication";
                        this.snackBar.open("Sign In Successful. Head to Sign In", null, {
                            duration:2000
                        });
                    } else {
                        //show snackbar for failed operation with suitable error.
                        //alert(registrationResult['message'])
                        this.handleAuthError(registrationResult['message'])
                    }
                })
            } else {
                //show the snackbar for invalid data.
                //"errors":["Invalid username","Password should be atleast length 8","Empty email field",
                //"Confirm Password should be atleast length 8"]
                //alert(JSON.stringify(isValid));
                //alert(typeof(isValid['errors']))
                this.snackBar.open(isValid['errors'], null, {
                    duration:5000
                });
            }
        } else {
            this.snackBar.open("Please Agree to terms and conditions.", null, {
                duration:2000
            });
        }
    }
    
    handleAuthError(message) {
        //Validation failed: username: Error, expected `username` to be unique. Value: `anujgpt32`, email: Error, expected `email` to be unique. Value: `anujgpt32@gmail.com`
        //show toasts
        let snackMessage = "";
        if (message.includes(`expected \`username\` to be unique`)) {
            snackMessage = "Username";
        }
        if (message.includes(`expected \`email\` to be unique`)) {
            snackMessage = snackMessage+" Email";
        }
        this.snackBar.open(snackMessage+" already taken", null, {
            duration:2000
        });
    }

    onRegistrationSuccess(result) {
        alert(JSON.stringify(result));        
    }

    /**
     * method to validate the form Data.
     */
    checkValidity(){
        let isValid = true;
        let result = [];
        let message = {};
        if (this.username==null || this.username=="") {
            isValid = false;
            result.push('Invalid username');
        }
        if (this.password==null || this.password.length<7) {
            isValid = false;
            result.push('Password should be atleast length 8');
        }
        if (this.email==null || this.email.length==0) {
            isValid = false;
            result.push('Empty email field');
        }
        else if (!EmailValidator.validate(this.email)) {
            isValid = false;
            result.push('Invalid email');
        }
        if (this.confirmPassword==null || this.confirmPassword.length<7) {
            isValid = false;
            result.push('Confirm Password should be atleast length 8');
        }
        if (this.confirmPassword != this.password) {
            isValid = false;
            result.push(`Password and Confirm Password doesn't match`);
        }
        message['isValid'] = isValid;
        message['errors'] = result;
        return message;
    }

}
