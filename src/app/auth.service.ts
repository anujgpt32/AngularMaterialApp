import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

    constructor(private httpClient:HttpClient) { }
    port = 3000;
    authBaseUrl = `http://localhost:${this.port}/users`;

    /**
     * this method handles sign up.
     * 
     * @param data : contains the user
     */
    signUp(data:any) {
        let url = this.authBaseUrl+"/signup"
        return this.httpClient.post(url, data);
    }

    /**
     * this method handles sign in.
     * 
     * @param data holds the request body.
     */
    login(data:any) {
        let url = this.authBaseUrl+"/login"
        return this.httpClient.post(url, data);
    }

    /**
     * this method is called for fetching the amount from the data.
     * @param data : holds the request body.
     */
    getUserData(data:any) {
        let url = this.authBaseUrl+"/getUserDetails";
        return this.httpClient.post(url, data);
    }

}
