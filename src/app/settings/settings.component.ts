import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    navBarOpened = false;
    title = 'Settings';
    constructor(private location:Location, 
        private localStorage:LocalStorage,
    private router:Router, private snackBar:MatSnackBar) { }

    ngOnInit() {
    }

    toggle() {
        this.navBarOpened = !this.navBarOpened;
    }

    goHome() {
        this.location.back();
    }

    signOut() {
        //delete the user data and sign out.
        this.localStorage.clear().subscribe(() => {
            this.snackBar.open('Logged Out', null, {
                duration:500
            }).afterDismissed().subscribe(()=> {
                this.router.navigate(['']);
            });
        });
    }
}
