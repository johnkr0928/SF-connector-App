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
var fbconfiguration_interface_1 = require('./fbconfiguration.interface');
var fbconfiguration_service_1 = require('./fbconfiguration.service');
var router_1 = require('@angular/router');
var FBConfigurationComponentlist = (function () {
    function FBConfigurationComponentlist(_router, fbconfigurationService, snackbar, viewContainerRef) {
        this.fbconfiguration = new fbconfiguration_interface_1.FBConfigurationModel("", "", "", "", "", "");
        this.columns = [
            { name: 'FBDataSource' },
            { name: 'FBInitialCatalog' },
            { name: 'FBClientId' },
            { name: 'FBClientPassword' },
            { name: 'FBPort' },
            { name: 'FBConnection' }
        ];
        debugger;
        this._fbconfigurationService = fbconfigurationService;
        this.router = _router;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
        this.get();
    }
    FBConfigurationComponentlist.prototype.get = function () {
        var _this = this;
        debugger;
        var result = this._fbconfigurationService.fbconfigurationlistUser()
            .subscribe(function (response) {
            debugger;
            console.log("Success Response" + response);
            var config = new material_1.MdSnackBarConfig(_this._viewContainerRef);
            if (response == "0") {
                _this._snackBar.open('Username / Password is wrong', 'Try Again', config);
                localStorage.setItem("user", "-1");
                _this.router.navigate(['/login']);
            }
            else {
                _this.fbconfigurations = (response);
            }
        }, function (error) { console.log("Error happened" + error); }, function () { console.log("the subscription is completed"); });
    };
    ;
    //Delete
    FBConfigurationComponentlist.prototype.deleteUser = function (Id) {
        var _this = this;
        debugger;
        var alert = (confirm("Are you sure you want to delete  " + Id + "?"));
        if (alert) {
            var result = this._fbconfigurationService.deleteUser(Id)
                .subscribe(function (response) {
                debugger;
                console.log("Success Response" + response);
                var config = new material_1.MdSnackBarConfig(_this._viewContainerRef);
                if (response == "0") {
                    _this._snackBar.open('Username / Password is wrong', 'Try Again', config);
                    localStorage.setItem("user", "-1");
                    _this.router.navigate(['/fbconfigurationlist']);
                }
                else {
                    debugger;
                    localStorage.setItem("user", response);
                    _this.get();
                }
            }, function (error) { console.log("Error happened" + error); }, function () { console.log("the subscription is completed"); });
        }
        this.router.navigate(['/fbconfigurationlist']);
    };
    FBConfigurationComponentlist = __decorate([
        core_1.Component({
            selector: 'fbconfiguration',
            templateUrl: 'app/component/fbconfigurationslist/fbconfiguration.component.html', providers: [fbconfiguration_service_1.FBConfigurationService, material_1.MdSnackBar]
        }),
        __param(0, core_1.Inject(router_1.Router)),
        __param(1, core_1.Inject(fbconfiguration_service_1.FBConfigurationService)),
        __param(2, core_1.Inject(material_1.MdSnackBar)),
        __param(3, core_1.Inject(core_1.ViewContainerRef))
    ], FBConfigurationComponentlist);
    return FBConfigurationComponentlist;
}());
exports.FBConfigurationComponentlist = FBConfigurationComponentlist;
