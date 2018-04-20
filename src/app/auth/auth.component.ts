import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage'
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    constructor(private localStorage:LocalStorage, private router:Router) { }
    index = 0;

    ngOnInit() {
        this.localStorage.getItem('user').subscribe((data) => {
            if (data != null) {
                this.router.navigate(['home']);
            }
        })
    }

    public handleEvent(childData:any){
        this.index = 0;
	}

}
