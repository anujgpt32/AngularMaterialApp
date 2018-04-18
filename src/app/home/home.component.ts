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
    constructor(private localStorage: LocalStorage, private router: Router) {
        this.localStorage.getItem('user').subscribe(data => {
            this.username = data['username'];
        });
     }

    ngOnInit() {}

    signOut() {
        this.localStorage.clear().subscribe(() => {
            this.router.navigate(['']);
        });
    }

}
