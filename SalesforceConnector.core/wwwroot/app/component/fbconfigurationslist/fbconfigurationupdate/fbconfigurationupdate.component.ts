import { Component, Injectable, Inject, ViewContainerRef } from '@angular/core';
import { MaterialModule, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Ng2MaterialModule } from "ng2-material";
import { FBConfigurationModel } from '../fbconfiguration.interface'
import { FBConfigurationUpdateService } from './fbconfigurationupdate.service'
import { Http, Response } from '@angular/http';
import { Router, RouterLink} from '@angular/router';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'update',
    templateUrl: 'app/component/fbconfigurationslist/fbconfigurationupdate/fbconfigurationupdate.component.html', providers: [FBConfigurationUpdateService, MdSnackBar]
})
export class FbConfigurationUpdateComponent {

    lang: string;
    id: any;
    paramsSub: any;
    private data: any;
    private router: any;
    private _snackBar: MdSnackBar;
    private _viewContainerRef: ViewContainerRef;
    fbconfigurationupdate = new FBConfigurationModel("", "", "", "", "", "");
    private _fbconfigurationupdateService: any;
    private sub: any;
    private route: ActivatedRoute;

    constructor( @Inject(ActivatedRoute) _route: ActivatedRoute, @Inject(Router) _router: Router, @Inject(FBConfigurationUpdateService) fbconfigurationupdateService: FBConfigurationUpdateService, @Inject(MdSnackBar) snackbar: MdSnackBar, @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef) {
        debugger;
        this._fbconfigurationupdateService = fbconfigurationupdateService;
        this.router = _router;
        this.route = _route;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
    }

    fbconfigurationupdateUser(fbconfigurationupdate: FBConfigurationModel): void {
        debugger;
        var result = this._fbconfigurationupdateService.fbconfigurationupdateUser(fbconfigurationupdate)
            //  .subscribe(data => (localStorage.setItem("user", data)), error => localStorage.setItem("user", "false"), () => console.log("Data Success !"));
            .subscribe(
            response => {
                debugger;
                console.log("Success Response" + response);
                let config = new MdSnackBarConfig(this._viewContainerRef);
                if (response == "0") {
                    this._snackBar.open('Exception', 'Try Again', config);
                    localStorage.setItem("user", "0");
                    this.router.navigate(['/fbconfigurationupdate']);
                }
                else if (response == "2") {
                    this._snackBar.open('Record Updated Successfully', 'Thank you', config);
                    localStorage.setItem("user", response);
                    this.router.navigate(['/fbconfigurationlist']);
                }
                else if (response == "-1") {
                    this._snackBar.open('FbClientId already exists', 'Try Again', config);
                    localStorage.setItem("user", "-1");
                    this.router.navigate(['/fbconfigurationupdate']);
                }
                else {
                    this._snackBar.open('Model Not Valid', 'Try Again', config);
                    localStorage.setItem("user", "3");
                    this.router.navigate(['/fbconfigurationupdate']);
                }
            },
            function (error) { console.log("Error happened" + error) },
            function () { console.log("the subscription is completed") }
            );
    };

    ngOnInit() {
        debugger;

        //var id = this.router.params.subscribe(params => {
        //var id = params['Id'];       

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['Id']; // (+) converts string 'id' to a number


        });

        this._fbconfigurationupdateService.getUser(this.id)
            .subscribe(
            update => this.fbconfigurationupdate = update,
            response => {
                if (response.status == 404) {
                    this.router.navigate(['NotFound']);
                }
            });
    }

}