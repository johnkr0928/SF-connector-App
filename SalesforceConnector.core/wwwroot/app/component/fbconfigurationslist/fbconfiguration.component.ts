import { Component, Injectable, Inject, ViewContainerRef } from '@angular/core';
import { MaterialModule, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Ng2MaterialModule } from "ng2-material";
import { FBConfigurationModel } from './fbconfiguration.interface'
import { FBConfigurationService } from './fbconfiguration.service'
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'fbconfiguration',
    templateUrl: 'app/component/fbconfigurationslist/fbconfiguration.component.html', providers: [FBConfigurationService, MdSnackBar]
})

export class FBConfigurationComponentlist {
    private data: any;
    private router: any;
    private _snackBar: MdSnackBar;
    private _viewContainerRef: ViewContainerRef;
    fbconfiguration = new FBConfigurationModel("", "", "", "", "", "");
    private _fbconfigurationService: FBConfigurationService;
    private fbconfigurations: FBConfigurationModel[];
    columns = [
        { name: 'FBDataSource' },
        { name: 'FBInitialCatalog' },
        { name: 'FBClientId' },
        { name: 'FBClientPassword' },
        { name: 'FBPort' },
        { name: 'FBConnection' }
    ];
    constructor( @Inject(Router) _router: Router, @Inject(FBConfigurationService) fbconfigurationService: FBConfigurationService, @Inject(MdSnackBar) snackbar: MdSnackBar, @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef) {
        debugger;
        this._fbconfigurationService = fbconfigurationService;
        this.router = _router;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
        this.get();
    }
    get(): void {

        debugger;
        var result = this._fbconfigurationService.fbconfigurationlistUser()
            //  .subscribe(data => (localStorage.setItem("user", data)), error => localStorage.setItem("user", "false"), () => console.log("Data Success !"));
            .subscribe(
            response => {
                debugger;
                console.log("Success Response" + response);
                let config = new MdSnackBarConfig(this._viewContainerRef);
                if (response == "0") {
                    this._snackBar.open('Username / Password is wrong', 'Try Again', config);
                    localStorage.setItem("user", "-1");
                    this.router.navigate(['/login']);
                }
                else {
                    this.fbconfigurations = <FBConfigurationModel[]>(response);

                }
            },
            function (error) { console.log("Error happened" + error) },
            function () { console.log("the subscription is completed") }
            );
    };

    //Delete
    deleteUser(Id) {
        debugger;
        var alert = (confirm("Are you sure you want to delete  " + Id + "?"))
        if (alert) {
            var result = this._fbconfigurationService.deleteUser(Id)
                .subscribe(
                response => {
                    debugger;
                    console.log("Success Response" + response);
                    let config = new MdSnackBarConfig(this._viewContainerRef);
                    if (response == "0") {
                        this._snackBar.open('Username / Password is wrong', 'Try Again', config);
                        localStorage.setItem("user", "-1");
                        this.router.navigate(['/fbconfigurationlist']);
                    }
                    else {
                        debugger;
                        localStorage.setItem("user", response);
                        this.get();
                    }
                },
                function (error) { console.log("Error happened" + error) },
                function () { console.log("the subscription is completed") }
                );
        }
        this.router.navigate(['/fbconfigurationlist']);
    }
}
