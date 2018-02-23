import { Component, Injectable, Inject, ViewContainerRef, OnInit } from '@angular/core';
import { MaterialModule, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Ng2MaterialModule } from "ng2-material";
import {FormsModule} from "@angular/forms";
import { SfConfigurationModel } from './sfconfiguration.interface'
import { SfConfigurationService } from './sfconfiguration.service'
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
    selector: 'sfconfiguration',
    templateUrl: 'app/component/sfconfiguration/sfconfiguration.component.html', providers: [SfConfigurationService, MdSnackBar]
})

export class SfConfigurationComponent implements OnInit { 
    private data: any;
    private router: any;
    private _snackBar: MdSnackBar;
    private _viewContainerRef: ViewContainerRef;
    sfconfiguration = new SfConfigurationModel("", "", "", "", "", "", false, false, "", "", false);
    private _sfconfigurationService: any;
    private names: SfConfigurationModel[]; 
    constructor( @Inject(Router) _router: Router, @Inject(SfConfigurationService) sfconfigurationService: SfConfigurationService, @Inject(MdSnackBar) snackbar: MdSnackBar, @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef) {
        this._sfconfigurationService = sfconfigurationService;
        this.router = _router;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
       
    }
    sfconfigurationUser(sfconfiguration: SfConfigurationModel): void {    
        var result = this._sfconfigurationService.sfconfigurationUser(this.sfconfiguration)           
            .subscribe(
            response => {               
                let config = new MdSnackBarConfig(this._viewContainerRef);
                if (response == "1") {
                    this._snackBar.open('Record Saved Successfully', 'Thank You', config);
                    localStorage.setItem("sfconfig", response);
                    this.router.navigate(['/sfconfigurationprofile']);
                }
                else if (response == "-1") {
                    this._snackBar.open('ConsumerId Already Exists', 'Try Again', config);
                    localStorage.setItem("sfconfig", "-1");
                    this.router.navigate(['/sfconfiguration']);
                }
                else if (response == "3") {
                    this._snackBar.open('Model Not Valid', 'Try Again', config);
                    localStorage.setItem("sfconfig", "3");
                    this.router.navigate(['/sfconfiguration']);
                }
                else if (response == "0") {
                    this._snackBar.open('Exceptions', 'Try Again', config);
                    localStorage.setItem("sfconfig", response);
                    this.router.navigate(['/sfconfiguration']);
                }
            },
            function (error) { console.log("Error happened" + error) }
            );
    };
    ngOnInit(): void {
        debugger;  
        var result = this._sfconfigurationService.getSfConfigCustomerName()
            .subscribe(
            response => {                
                this.names = <SfConfigurationModel[]>(response);
            },
            function (error) { console.log("Error happened" + error) }
        );        
   };
}





