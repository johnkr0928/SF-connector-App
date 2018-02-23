import { Component, Injectable, Inject, ViewContainerRef } from '@angular/core';
import { MaterialModule, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Ng2MaterialModule } from "ng2-material";
import { SFConfigurationUpdateModel } from './sfconfigurationupdate.interface'
import { SFConfigurationUpdateService } from './sfconfigurationupdate.service'
import { Http, Response } from '@angular/http';
import { Router, RouterLink} from '@angular/router';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'update',
    templateUrl: 'app/component/sfconfigurationprofile/sfconfigurationupdate/sfconfigurationupdate.component.html', providers: [SFConfigurationUpdateService, MdSnackBar]
})
export class SfConfigurationUpdateComponent {
    lang: string;
    id: any;
    paramsSub: any;
    private data: any;
    private router: any;
    private _snackBar: MdSnackBar;
    private _viewContainerRef: ViewContainerRef;
    sfconfigurationupdate = new SFConfigurationUpdateModel("", "", "", "", "", "",false,false, "", "", false, "");
    private _sfconfigurationupdateService: any;
    private sub: any;
    private route: ActivatedRoute;
    constructor( @Inject(ActivatedRoute) _route: ActivatedRoute, @Inject(Router) _router: Router, @Inject(SFConfigurationUpdateService) sfconfigurationupdateService: SFConfigurationUpdateService, @Inject(MdSnackBar) snackbar: MdSnackBar, @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef) {        
        this._sfconfigurationupdateService = sfconfigurationupdateService;
        this.router = _router;
        this.route = _route;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
    }
    sfconfigurationupdateUser(sfconfigurationupdate: SFConfigurationUpdateModel,t=1000): void {
        var result = this._sfconfigurationupdateService.sfconfigurationupdateUser(sfconfigurationupdate)
            .subscribe(
            response => {
                let config = new MdSnackBarConfig(this._viewContainerRef);
                if (response == "0") {
                    let simpleSnackBarRef = this._snackBar.open('Exception', '', config);
                    setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef), t);
                    localStorage.setItem("sfconfig", "0");
                    this.router.navigate(['/sfconfigurationupdate']);
                }
                else if (response == "2") {
                    let simpleSnackBarRef = this._snackBar.open('User configuration Updated Successfully', '', config);
                    setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef), t);
                    if (localStorage.getItem("Admin") == "true") {
                        this.router.navigate(['/sfconfigurationprofile']);
                    }
                }
                else {
                    this._snackBar.open('Model Not Valid', 'Try Again', config);
                    localStorage.setItem("sfconfig", "3");
                    this.router.navigate(['/sfconfigurationupdate']);
                }
            },
            function (error) { console.log("Error happened" + error) }
            );
    };

    

    ngOnInit() {
        debugger;
        if (localStorage.getItem("Admin") == "true") {
            this.sub = this.route.params.subscribe(params => {
                this.id = +params['Id'];
            });
            this._sfconfigurationupdateService.getUser(this.id)
                .subscribe(
                update => this.sfconfigurationupdate = update,
                response => {
                    if (response.status == 404) {
                        this.router.navigate(['NotFound']);
                    }
                });
        }
        else {
            this.sub = this.route.params.subscribe(params => {
                this.id = +params['Id'];
            });
            this._sfconfigurationupdateService.getConfigId(this.id)
                .subscribe(
                update => this.sfconfigurationupdate = update,
                response => {
                    if (response.status == 404) {
                        this.router.navigate(['NotFound']);
                    }
                });
        }
    }
    IsAdmin() {
        return localStorage.getItem("Admin") !== "false";
    }
}