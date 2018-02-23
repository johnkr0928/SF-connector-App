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
var addressupdate_interface_1 = require('./addressupdate.interface');
var addressupdate_service_1 = require('./addressupdate.service');
var router_1 = require('@angular/router');
var router_2 = require('@angular/router');
var AddressUpdateComponent = (function () {
    function AddressUpdateComponent(_route, _router, addressupdateService, snackbar, viewContainerRef) {
        this.addressupdate = new addressupdate_interface_1.AddressModel("", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
        this._addressupdateService = addressupdateService;
        this.router = _router;
        this.route = _route;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
    }
    AddressUpdateComponent.prototype.addressupdateUser = function (addressupdate) {
        var _this = this;
        var result = this._addressupdateService.addressupdateUser(addressupdate)
            .subscribe(function (response) {
            var config = new material_1.MdSnackBarConfig(_this._viewContainerRef);
            if (response == "2") {
                _this._snackBar.open('Address Updated Successfully', 'Thank You', config);
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
    AddressUpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = +params['Id']; // (+) converts string 'id' to a number
        });
        this._addressupdateService.getUser(this.id)
            .subscribe(function (update) { return _this.addressupdate = update; }, function (response) {
            if (response.status == 404) {
                _this.router.navigate(['NotFound']);
            }
        });
    };
    AddressUpdateComponent = __decorate([
        core_1.Component({
            selector: 'addressupdate',
            templateUrl: 'app/component/address/addressupdate/addressupdate.component.html', providers: [addressupdate_service_1.AddressUpdateService, material_1.MdSnackBar]
        }),
        __param(0, core_1.Inject(router_2.ActivatedRoute)),
        __param(1, core_1.Inject(router_1.Router)),
        __param(2, core_1.Inject(addressupdate_service_1.AddressUpdateService)),
        __param(3, core_1.Inject(material_1.MdSnackBar)),
        __param(4, core_1.Inject(core_1.ViewContainerRef))
    ], AddressUpdateComponent);
    return AddressUpdateComponent;
}());
exports.AddressUpdateComponent = AddressUpdateComponent;
