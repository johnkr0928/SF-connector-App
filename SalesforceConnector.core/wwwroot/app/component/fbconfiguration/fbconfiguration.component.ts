import { Component, Injectable, Inject, ViewContainerRef } from '@angular/core';
import { MaterialModule, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Ng2MaterialModule } from "ng2-material";
import { FBConfigurationModel } from './fbconfiguration.interface'
import { FBConfigurationService } from './fbconfiguration.service'
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'fbconfiguration',
    templateUrl: 'app/component/fbconfiguration/fbconfiguration.component.html', providers: [FBConfigurationService, MdSnackBar]
})

export class FBConfigurationComponent {
    private data: any;
    private router: any;
    private _snackBar: MdSnackBar;
    private _viewContainerRef: ViewContainerRef;
    fbconfiguration = new FBConfigurationModel("", "", "", "", "", "","");
    private _fbconfigurationService: any;
    private names: FBConfigurationModel[];
    constructor( @Inject(Router) _router: Router, @Inject(FBConfigurationService) fbconfigurationService: FBConfigurationService, @Inject(MdSnackBar) snackbar: MdSnackBar, @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef) {
        debugger;
        this._fbconfigurationService = fbconfigurationService;
        this.router = _router;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
    }
    fbconfigurationUser(fbconfiguration: FBConfigurationModel): void {

        debugger;
        var result = this._fbconfigurationService.fbconfigurationUser(fbconfiguration)
            //  .subscribe(data => (localStorage.setItem("user", data)), error => localStorage.setItem("user", "false"), () => console.log("Data Success !"));
            .subscribe(
            response => {
                debugger;
                console.log("Success Response" + response);
                let config = new MdSnackBarConfig(this._viewContainerRef);
                if (response == "1") {
                    this._snackBar.open('Record Saved Successfully', 'Thank You', config);
                    localStorage.setItem("user", response);
                    this.router.navigate(['/fbconfigurationlist']);
                }
                else if (response == "-1") {
                    this._snackBar.open('FbClientId Already Exists', 'Try Again', config);
                    localStorage.setItem("user", "-1");
                    this.router.navigate(['/fbconfiguration']);
                }
                else if (response == "3") {
                    this._snackBar.open('Model Not Valid', 'Try Again', config);
                    localStorage.setItem("user", "3");
                    this.router.navigate(['/fbconfiguration']);

                }
                else if (response == "0") {
                    this._snackBar.open('Exceptions', 'Try Again', config);
                    localStorage.setItem("user", response);
                    this.router.navigate(['/fbconfiguration']);
                }              
            },
            function (error) { console.log("Error happened" + error) },
            function () { console.log("the subscription is completed") }
            );
    };

    ngOnInit(): void {

        var result = this._fbconfigurationService.getFbConfigCustomerName()
            .subscribe(
            response => {
                debugger;
                this.names = <FBConfigurationModel[]>(response);

            },
            function (error) { console.log("Error happened" + error) },
            function () { console.log("the subscription is completed") }
            );
    };
}

