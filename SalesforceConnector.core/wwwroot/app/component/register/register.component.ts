import { Component, Injectable, Inject, ViewContainerRef } from '@angular/core';
import { MaterialModule, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Ng2MaterialModule } from "ng2-material";
import { RegisterModel } from './register.interface'
import { RegisterService } from './register.service'
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
    selector: 'register',
    templateUrl: 'app/component/register/register.component.html', providers: [RegisterService, MdSnackBar]
})

export class RegisterComponent {
    public user: RegisterModel;
    private data: any;
    private router: any;
    private _snackBar: MdSnackBar;
    private _viewContainerRef: ViewContainerRef;
    register = new RegisterModel("", "", "", "", "", "");
    private _registerService: any;
    constructor( @Inject(Router) _router: Router, @Inject(RegisterService) registerService: RegisterService, @Inject(MdSnackBar) snackbar: MdSnackBar, @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef) {
        this._registerService = registerService;
        this.router = _router;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
    }  
    ngOnInit() {
        jQuery(document).ready(function () {
            //jQuery(".plus").click(function () {
            jQuery.validator.setDefaults({
                debug: true,
                success: "valid"
            });
            $("#myform").validate({
                rules: {
                    Password: "required",
                    ConfirmPassword: {
                        equalTo: "#password"
                    }
                }
            });
        });
        }
    registerUser(register: RegisterModel): void {     
        var result = this._registerService.registerUser(register)
           .subscribe(
            response => {
                let config = new MdSnackBarConfig(this._viewContainerRef);  
                if (response == "1") {
                    this._snackBar.open('User Saved Successfully', 'Thank You', config);
                    localStorage.setItem("user", response);
                    this.router.navigate(['/profile']);                   
                    }
                    else if (response == "-1") {
                    this._snackBar.open('Email Already Exists', 'Try Again', config);
                        localStorage.setItem("user", "-1");
                        this.router.navigate(['/register']);
                }
                else if (response == "3") {
                    this._snackBar.open('Model Not Valid', 'Try Again', config);
                    localStorage.setItem("user", "3");
                    this.router.navigate(['/register']);
                }
                else if (response == "0") {
                    this._snackBar.open('Exceptions', 'Try Again', config);
                    localStorage.setItem("user", response);
                    this.router.navigate(['/register']);
                }                
            },
            function (error) { console.log("Error happened" + error) }
        );
    };
}