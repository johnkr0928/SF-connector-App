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
var sfconfiguration_interface_1 = require('./sfconfiguration.interface');
var sfconfiguration_service_1 = require('./sfconfiguration.service');
var router_1 = require('@angular/router');
var SfConfigurationComponent = (function () {
    function SfConfigurationComponent(_router, sfconfigurationService, snackbar, viewContainerRef) {
        this.sfconfiguration = new sfconfiguration_interface_1.SfConfigurationModel("", "", "", "", "", "", false, false, "", "", false);
        this._sfconfigurationService = sfconfigurationService;
        this.router = _router;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
    }
    SfConfigurationComponent.prototype.sfconfigurationUser = function (sfconfiguration) {
        var _this = this;
        var result = this._sfconfigurationService.sfconfigurationUser(this.sfconfiguration)
            .subscribe(function (response) {
            var config = new material_1.MdSnackBarConfig(_this._viewContainerRef);
            if (response == "1") {
                _this._snackBar.open('Record Saved Successfully', 'Thank You', config);
                localStorage.setItem("sfconfig", response);
                _this.router.navigate(['/sfconfigurationprofile']);
            }
            else if (response == "-1") {
                _this._snackBar.open('ConsumerId Already Exists', 'Try Again', config);
                localStorage.setItem("sfconfig", "-1");
                _this.router.navigate(['/sfconfiguration']);
            }
            else if (response == "3") {
                _this._snackBar.open('Model Not Valid', 'Try Again', config);
                localStorage.setItem("sfconfig", "3");
                _this.router.navigate(['/sfconfiguration']);
            }
            else if (response == "0") {
                _this._snackBar.open('Exceptions', 'Try Again', config);
                localStorage.setItem("sfconfig", response);
                _this.router.navigate(['/sfconfiguration']);
            }
        }, function (error) { console.log("Error happened" + error); });
    };
    ;
    SfConfigurationComponent.prototype.ngOnInit = function () {
        var _this = this;
        debugger;
        var result = this._sfconfigurationService.getSfConfigCustomerName()
            .subscribe(function (response) {
            _this.names = (response);
        }, function (error) { console.log("Error happened" + error); });
    };
    ;
    SfConfigurationComponent = __decorate([
        core_1.Component({
            selector: 'sfconfiguration',
            templateUrl: 'app/component/sfconfiguration/sfconfiguration.component.html', providers: [sfconfiguration_service_1.SfConfigurationService, material_1.MdSnackBar]
        }),
        __param(0, core_1.Inject(router_1.Router)),
        __param(1, core_1.Inject(sfconfiguration_service_1.SfConfigurationService)),
        __param(2, core_1.Inject(material_1.MdSnackBar)),
        __param(3, core_1.Inject(core_1.ViewContainerRef))
    ], SfConfigurationComponent);
    return SfConfigurationComponent;
}());
exports.SfConfigurationComponent = SfConfigurationComponent;
