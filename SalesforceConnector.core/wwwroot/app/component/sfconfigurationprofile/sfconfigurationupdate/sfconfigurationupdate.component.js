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
var sfconfigurationupdate_interface_1 = require('./sfconfigurationupdate.interface');
var sfconfigurationupdate_service_1 = require('./sfconfigurationupdate.service');
var router_1 = require('@angular/router');
var router_2 = require('@angular/router');
var SfConfigurationUpdateComponent = (function () {
    function SfConfigurationUpdateComponent(_route, _router, sfconfigurationupdateService, snackbar, viewContainerRef) {
        this.sfconfigurationupdate = new sfconfigurationupdate_interface_1.SFConfigurationUpdateModel("", "", "", "", "", "", false, false, "", "", false, "");
        this._sfconfigurationupdateService = sfconfigurationupdateService;
        this.router = _router;
        this.route = _route;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
    }
    SfConfigurationUpdateComponent.prototype.sfconfigurationupdateUser = function (sfconfigurationupdate, t) {
        var _this = this;
        if (t === void 0) { t = 1000; }
        var result = this._sfconfigurationupdateService.sfconfigurationupdateUser(sfconfigurationupdate)
            .subscribe(function (response) {
            var config = new material_1.MdSnackBarConfig(_this._viewContainerRef);
            if (response == "0") {
                var simpleSnackBarRef = _this._snackBar.open('Exception', '', config);
                setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef), t);
                localStorage.setItem("sfconfig", "0");
                _this.router.navigate(['/sfconfigurationupdate']);
            }
            else if (response == "2") {
                var simpleSnackBarRef = _this._snackBar.open('User configuration Updated Successfully', '', config);
                setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef), t);
                if (localStorage.getItem("Admin") == "true") {
                    _this.router.navigate(['/sfconfigurationprofile']);
                }
            }
            else {
                _this._snackBar.open('Model Not Valid', 'Try Again', config);
                localStorage.setItem("sfconfig", "3");
                _this.router.navigate(['/sfconfigurationupdate']);
            }
        }, function (error) { console.log("Error happened" + error); });
    };
    ;
    SfConfigurationUpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        debugger;
        if (localStorage.getItem("Admin") == "true") {
            this.sub = this.route.params.subscribe(function (params) {
                _this.id = +params['Id'];
            });
            this._sfconfigurationupdateService.getUser(this.id)
                .subscribe(function (update) { return _this.sfconfigurationupdate = update; }, function (response) {
                if (response.status == 404) {
                    _this.router.navigate(['NotFound']);
                }
            });
        }
        else {
            this.sub = this.route.params.subscribe(function (params) {
                _this.id = +params['Id'];
            });
            this._sfconfigurationupdateService.getConfigId(this.id)
                .subscribe(function (update) { return _this.sfconfigurationupdate = update; }, function (response) {
                if (response.status == 404) {
                    _this.router.navigate(['NotFound']);
                }
            });
        }
    };
    SfConfigurationUpdateComponent.prototype.IsAdmin = function () {
        return localStorage.getItem("Admin") !== "false";
    };
    SfConfigurationUpdateComponent = __decorate([
        core_1.Component({
            selector: 'update',
            templateUrl: 'app/component/sfconfigurationprofile/sfconfigurationupdate/sfconfigurationupdate.component.html', providers: [sfconfigurationupdate_service_1.SFConfigurationUpdateService, material_1.MdSnackBar]
        }),
        __param(0, core_1.Inject(router_2.ActivatedRoute)),
        __param(1, core_1.Inject(router_1.Router)),
        __param(2, core_1.Inject(sfconfigurationupdate_service_1.SFConfigurationUpdateService)),
        __param(3, core_1.Inject(material_1.MdSnackBar)),
        __param(4, core_1.Inject(core_1.ViewContainerRef))
    ], SfConfigurationUpdateComponent);
    return SfConfigurationUpdateComponent;
}());
exports.SfConfigurationUpdateComponent = SfConfigurationUpdateComponent;
