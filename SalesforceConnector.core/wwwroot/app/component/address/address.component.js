"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var material_1 = require('@angular/material');
var address_interface_1 = require('./address.interface');
var address_service_1 = require('./address.service');
var router_1 = require('@angular/router');
var router_2 = require('@angular/router');
var AddressComponent = (function () {
    function AddressComponent(_route, _router, addressService, snackbar, viewContainerRef) {
        this.address = new address_interface_1.AddressModel("", "", "", "", "", "", "", "", "", "", "", "", "", "", false, "");
        this._addressService = addressService;
        this.router = _router;
        this.route = _route;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
    }
    AddressComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.customerId = +params['Id'];
        });
        this.address.CustomerId = this.customerId;
    };
    AddressComponent.prototype.addressUser = function (address) {
        var _this = this;
        var result = this._addressService.addressUser(address)
            .subscribe(function (response) {
            var config = new material_1.MdSnackBarConfig(_this._viewContainerRef);
            if (response == "1") {
                _this._snackBar.open('Address Saved Successfully', 'Thank You', config);
                localStorage.setItem("user", response);
                _this.router.navigate(['/profile']);
            }
            else if (response == "3") {
                _this._snackBar.open('Model Not Valid', 'Try Again', config);
                localStorage.setItem("user", "3");
                _this.router.navigate(['/address']);
            }
            else {
                _this._snackBar.open('Exception', 'Try Again', config);
                localStorage.setItem("user", "0");
                _this.router.navigate(['/address']);
            }
        }, function (error) { console.log("Error happened" + error); });
    };
    ;
    AddressComponent.prototype.SameAsBilling = function () {
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
    };
    AddressComponent = __decorate([
        core_1.Component({
            selector: 'address',
            templateUrl: 'app/component/address/address.component.html', providers: [address_service_1.AddressService, material_1.MdSnackBar]
        }),
        __param(0, core_1.Inject(router_2.ActivatedRoute)),
        __param(1, core_1.Inject(router_1.Router)),
        __param(2, core_1.Inject(address_service_1.AddressService)),
        __param(3, core_1.Inject(material_1.MdSnackBar)),
        __param(4, core_1.Inject(core_1.ViewContainerRef))
    ], AddressComponent);
    return AddressComponent;
}());
exports.AddressComponent = AddressComponent;
