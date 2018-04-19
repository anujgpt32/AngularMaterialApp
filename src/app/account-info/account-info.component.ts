import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  constructor(private localStorage:LocalStorage,
    private router:Router) { }

  firstName:string;
  lastName:string;
  lastSignIn:string;
  memberSince:string;
  username:string;
  email:string;

  ngOnInit() {
    this.localStorage.getItem('user').subscribe((data) => {
        if (data == null) {
            this.router.navigate(['']);
        } else {
            console.log(JSON.stringify(data));
            this.firstName = data['firstName'];
            this.lastName = data['lastName'];
            this.lastSignIn = new Date(data['last_sign_in'])
                .toLocaleString();
            this.memberSince = new Date(data['registration'])
                .toLocaleString();
            this.username = data['username'];
            this.email = data['email'];
        }
    });
  }

}
