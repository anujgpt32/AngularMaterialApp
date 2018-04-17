import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'
import { MatInputModule, MatCardModule, MatCheckboxModule, MatTabsModule, MatButtonModule, MatSnackBar, MatSnackBarModule } from '@angular/material'
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LocalStorageModule } from '@ngx-pwa/local-storage';
 
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth.service';
import { TransactionService } from './transaction.service';

let authRoutes:Routes = [

];
let homeChildRoutes:Routes = [

];
let routes:Routes = [
    {
        path:'',
        component:AuthComponent,
        children:authRoutes
    },
    {
        path:'auth',
        component:AuthComponent,
        children:authRoutes
    },
    {
        path:'home',
        component:HomeComponent,
        children:homeChildRoutes
    }
];

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        HomeComponent,
        LoginComponent,
        SignupComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatCheckboxModule,
        MatCardModule,
        MatInputModule,
        MatTabsModule,
        MatButtonModule,
        MatSnackBarModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        LocalStorageModule
    ],
    providers: [HttpClient, AuthService, TransactionService, MatSnackBar],
    bootstrap: [AppComponent]
})
export class AppModule { }
