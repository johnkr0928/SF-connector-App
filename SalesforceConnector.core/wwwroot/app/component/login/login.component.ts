import { Component, Injectable, Inject, ViewContainerRef, ApplicationRef,ViewChild } from '@angular/core';
import { MaterialModule, MdSnackBar, MdSnackBarConfig, MdDialog } from '@angular/material';
import {LocationStrategy, HashLocationStrategy}from "@angular/common";
import { Ng2MaterialModule } from "ng2-material";
import { LoginModel } from './login.interface'
import { LoginService } from './login.service'
import { Http, Response } from '@angular/http';
import { Router} from '@angular/router';
//import {}from '@angular/platform-browser';

@Component({
    selector: 'login',
    templateUrl: 'app/component/login/login.component.html', providers: [LoginService, MdSnackBar]
})
export class LoginComponent {
    private data: any;
    private router: any;
    private _snackBar: MdSnackBar;
    private _viewContainerRef: ViewContainerRef;
    login = new LoginModel("", "");
    public isloading = false;
    private _loginService: any;
    public edited = false;
    public color = false;
    setAutoHide: boolean = true;
    autoHide: number = 200;
    constructor( @Inject(Router) _router: Router, @Inject(LoginService) loginService: LoginService, @Inject(MdSnackBar) snackbar: MdSnackBar, @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef = null) {
        localStorage.setItem("user", "-1");
        localStorage.setItem("Admin", "-1");
        this._loginService = loginService;
        this.router = _router;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
        this.router.navigate(['/login']);
    }
    validateUser(login: LoginModel,t=1000): void {
        debugger;
        this.color = true;
        this.edited = true;
        var result = this._loginService.validateUser(login)
            .subscribe(
            response => {
                debugger;
                let config = new MdSnackBarConfig(this._viewContainerRef);  
                if (response == "-1") {
                    let simpleSnackBarRef = this._snackBar.open('Username/Password is incorrect', '', config);
                    setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef),t);
                    this.color = false;
                    this.edited = false;
                    localStorage.setItem("user", "-1");
                    this.router.navigate(['/login']);
                }
                else if (response == "4") {
                    this._snackBar.open('Contact Your Adminstrator', 'Try Again', config);
                    this.color = false;
                    this.edited = false;
                    localStorage.setItem("user", "-1");
                    this.router.navigate(['/login']);
                }
                else if (response == "0") {
                    this._snackBar.open('Exceptions', 'Try Again', config);
                    this.color = false;
                    this.edited = false;
                    localStorage.setItem("user", "-1");
                    this.router.navigate(['/login']);
                }
                else if (response => "1") {
                    debugger;
                    localStorage.setItem("user", response);
                    var result = this._loginService.getAdmin(response).subscribe(
                        response1 => {
                            if (response1) {
                                localStorage.setItem("Admin", response1);                               
                                this.router.navigate(['/profile']);
                                this.color = false;
                                this.edited = false;                                
                            }
                            else
                            {
                                localStorage.setItem("Admin", response1);
                                this.router.navigate(['/dashboard']);
                            }
                        },
                        function (error) { console.log("Error happened" + error) }
                    );                   
                }                
            },
            function (error) { console.log("Error happened" + error) }
            );
    };
}
