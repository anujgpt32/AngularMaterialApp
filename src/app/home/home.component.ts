import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    appTitle = `PaymentsApp`;
    username: string;
    constructor(private localStorage: LocalStorage, private router: Router, private location:Location) {
        this.localStorage.getItem('user').subscribe(data => {
            if (data != null)
                this.username = data['username'];
            else
                this.location.back();
        });
     }

    ngOnInit() {}

    signOut() {
        this.localStorage.clear().subscribe(() => {
            this.router.navigate(['']);
        });
    }

    settings() {
        this.router.navigate(['settings']);
    }

}
