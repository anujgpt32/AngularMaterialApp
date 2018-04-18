import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TransactionService {

    constructor(private httpClient:HttpClient) { }
    
    port = 3000;
    transactionBaseUrl = `http://localhost:${this.port}/transactions`;

    addMoney(data:any) {
        let targetUrl = this.transactionBaseUrl+"/addMoney";
        return this.httpClient.post(targetUrl, data);
    }

    sendMoney(data:any) {
        let targetUrl = this.transactionBaseUrl+"/sendMoney";
        return this.httpClient.post(targetUrl, data);
    }

    /**
     * Fetches the data of the user.
     * @param data holds only the username to get all data of the user.
     */
    getAllTransaction(data:any) {
        let targetUrl = this.transactionBaseUrl+"/getAllTransactions";
        return this.httpClient.post(targetUrl, data);
    }
}
