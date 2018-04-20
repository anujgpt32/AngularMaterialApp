import { MatSnackBar } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'
        
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LocalStorageModule } from '@ngx-pwa/local-storage';
import { MaterialModule } from './material/material.module';
 
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TransactionsComponent } from './transactions/transactions.component'
import { AuthService } from './auth.service';
import { TransactionService } from './transaction.service';
import { BalanceComponent } from './balance/balance.component';
import { AddComponent } from './add/add.component';
import { SendComponent } from './send/send.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { DebitTransactionsComponent } from './debit-transactions/debit-transactions.component';
import { CreditTransactionsComponent } from './credit-transactions/credit-transactions.component';
import { SettingsComponent } from './settings/settings.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';

let homeChildRoutes = [
    {
        path:'',
        component: BalanceComponent
    },
    {
        path:'balance',
        component: BalanceComponent
    },
    {
        path:'add',
        component: AddComponent
    },
    {
        path:'send',
        component: SendComponent
    },
    {
        path:'transactions',
        component: TransactionsComponent
    }
];
let settingsChildRoute = [
    {
        path:'',
        component: AccountInfoComponent
    },
    {
        path: 'accountInfo',
        component: AccountInfoComponent
    },
    {
        path: 'changePassword',
        component: ChangePasswordComponent
    }
];
let routes:Routes = [
    {
        path:'',
        component:AuthComponent
    },
    {
        path:'auth',
        component:AuthComponent
    },
    {
        path:'home',
        component:HomeComponent,
        children:homeChildRoutes
    },
    {
        path:'settings',
        component: SettingsComponent,
        children:settingsChildRoute
    }
];

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        HomeComponent,
        LoginComponent,
        SignupComponent,
        BalanceComponent,
        AddComponent,
        TransactionsComponent,
        SendComponent,
        AllTransactionsComponent,
        DebitTransactionsComponent,
        CreditTransactionsComponent,
        SettingsComponent,
        AccountInfoComponent,
        ChangePasswordComponent,
        ChangePasswordDialogComponent,
        DeleteAccountComponent,
        DeleteAccountDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        LocalStorageModule,
        MaterialModule
    ],
    entryComponents:[
        ChangePasswordDialogComponent, DeleteAccountDialogComponent
    ],
    providers: [HttpClient, AuthService, TransactionService],
    bootstrap: [AppComponent]
})
export class AppModule { }
