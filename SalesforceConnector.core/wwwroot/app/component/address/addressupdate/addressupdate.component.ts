import { Component, Injectable, Inject, ViewContainerRef } from '@angular/core';
import { MaterialModule, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Ng2MaterialModule } from "ng2-material";
import { AddressModel } from './addressupdate.interface'
import { AddressUpdateService } from './addressupdate.service'
import { Http, Response } from '@angular/http';
import { Router, RouterLink} from '@angular/router';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
declare var jQuery: any;

@Component({
    selector: 'addressupdate',
    templateUrl: 'app/component/address/addressupdate/addressupdate.component.html', providers: [AddressUpdateService, MdSnackBar]
   
})
export class AddressUpdateComponent {
    id: any;
    paramsSub: any;
    private data: any;
    private router: any;
    private _snackBar: MdSnackBar;
    private _viewContainerRef: ViewContainerRef;
    addressupdate = new AddressModel("", "", "", "", "", "", "", "", "", "", "", "", "", "","");
    private _addressupdateService: any;
    private sub: any;
    private route: ActivatedRoute;
    constructor( @Inject(ActivatedRoute) _route: ActivatedRoute, @Inject(Router) _router: Router, @Inject(AddressUpdateService) addressupdateService: AddressUpdateService, @Inject(MdSnackBar) snackbar: MdSnackBar, @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef) {
        this._addressupdateService = addressupdateService;
        this.router = _router;
        this.route = _route;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
    }

    addressupdateUser(addressupdate: AddressModel): void {
        var result = this._addressupdateService.addressupdateUser(addressupdate)
            .subscribe(
            response => {
                let config = new MdSnackBarConfig(this._viewContainerRef);
                if (response == "2") {
                    this._snackBar.open('Address Updated Successfully', 'Thank You', config);
                    localStorage.setItem("user", response);
                    this.router.navigate(['/profile']);
                }
                else if (response == "3") {
                    this._snackBar.open('Model Not Valid', 'Try Again', config);
                    localStorage.setItem("user", "3");
                    this.router.navigate(['/address']);
                }
                else {
                    this._snackBar.open('Exception', 'Try Again', config);
                    localStorage.setItem("user", "0");
                    this.router.navigate(['/address']);
                }
            },
            function (error) { console.log("Error happened" + error) }
            );
    };

    ngOnInit() {  
            this.sub = this.route.params.subscribe(params => {
            this.id = +params['Id']; // (+) converts string 'id' to a number
        });
        this._addressupdateService.getUser(this.id)
            .subscribe(
            update => this.addressupdate = update,
            response => {
                if (response.status == 404) {
                    this.router.navigate(['NotFound']);
                }
            });
    }

}