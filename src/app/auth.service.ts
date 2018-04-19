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
        let url = this.authBaseUrl+"/signup";
        data['timestamp'] = Date.now();
        return this.httpClient.post(url, data);
    }

    /**
     * this method handles sign in.
     * 
     * @param data holds the request body.
     */
    login(data:any) {
        let url = this.authBaseUrl+"/login";
        //timestamp of login is stored in the database for the record.
        data['timestamp'] = Date.now();
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

    /**
     * This method is to be called after local data
     * validation and before starting the transaction.
     * @param data : holds username and password of the user.
     */
    authenticateUser(data:any) {
        let url = this.authBaseUrl+"/authenticateUser";
        return this.httpClient.post(url, data);
    }

    /**
     * changes the password from settings
     * @param data holds the username, oldpassword, newpassword.
     */
    changePasswordFromConsole(data:any) {
        let url = this.authBaseUrl+"/changePasswordFromConsole";
        return this.httpClient.post(url, data);
    }

}
