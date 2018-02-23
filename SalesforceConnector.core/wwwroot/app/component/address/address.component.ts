import { Component, Injectable, Inject, ViewContainerRef } from '@angular/core';
import { MaterialModule, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Ng2MaterialModule } from "ng2-material";
import { AddressModel } from './address.interface'
import { AddressService } from './address.service'
import { Http, Response } from '@angular/http';
import { Router, RouterLink} from '@angular/router';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
declare var jQuery: any;

@Component({
    selector: 'address',
    templateUrl: 'app/component/address/address.component.html', providers: [AddressService, MdSnackBar] 
})

export class AddressComponent {  
    private data: any;
    private router: any;
    private _snackBar: MdSnackBar;
    private _viewContainerRef: ViewContainerRef;
    address = new AddressModel("", "", "", "", "", "", "", "", "", "", "", "", "", "", false,"");
    private route: ActivatedRoute;
    private _addressService: any;
    customerId: any;
    private sub: any;
    constructor( @Inject(ActivatedRoute) _route: ActivatedRoute, @Inject(Router) _router: Router, @Inject(AddressService) addressService: AddressService, @Inject(MdSnackBar) snackbar: MdSnackBar, @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef) {
        this._addressService = addressService;
        this.router = _router;
        this.route = _route;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.customerId = +params['Id'];             
        });
        this.address.CustomerId = this.customerId;        
    }
    addressUser(address: AddressModel): void {
        var result = this._addressService.addressUser(address)
            .subscribe(
            response => {
                let config = new MdSnackBarConfig(this._viewContainerRef);
                if (response == "1") {
                    this._snackBar.open('Address Saved Successfully', 'Thank You', config);
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
    SameAsBilling() { 
        this.address.IsBillingShipping = jQuery('#input-SameAsBillingAddress').attr('ng-reflect-checked');
          
        if (jQuery('#input-SameAsBillingAddress').attr('ng-reflect-checked') == "true") {
           
            jQuery('#ShippingAddress1-input').val(jQuery('#BillingAddress1-input').trigger('input').val());           

            jQuery('#ShippingAddress2-input').val(jQuery('#BillingAddress2-input').val());
       
            jQuery('#ShippingCountry-input').val(jQuery('#BillingCountry-input').val());      

            jQuery('#ShippingState-input').val(jQuery('#BillingState-input').val());     

            jQuery('#ShippingCity-input').val(jQuery('#BillingCity-input').val());       

            jQuery('#ShippingPostalCode-input').val(jQuery('#BillingPostalCode-input').val());       

            jQuery('#ShippingPhoneNumber-input').val(jQuery('#BillingPhoneNumber-input').val());    
        }
    }
}
