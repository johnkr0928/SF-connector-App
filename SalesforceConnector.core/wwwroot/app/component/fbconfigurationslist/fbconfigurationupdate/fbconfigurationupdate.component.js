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
var fbconfiguration_interface_1 = require('../fbconfiguration.interface');
var fbconfigurationupdate_service_1 = require('./fbconfigurationupdate.service');
var router_1 = require('@angular/router');
var router_2 = require('@angular/router');
var FbConfigurationUpdateComponent = (function () {
    function FbConfigurationUpdateComponent(_route, _router, fbconfigurationupdateService, snackbar, viewContainerRef) {
        this.fbconfigurationupdate = new fbconfiguration_interface_1.FBConfigurationModel("", "", "", "", "", "");
        debugger;
        this._fbconfigurationupdateService = fbconfigurationupdateService;
        this.router = _router;
        this.route = _route;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
    }
    FbConfigurationUpdateComponent.prototype.fbconfigurationupdateUser = function (fbconfigurationupdate) {
        var _this = this;
        debugger;
        var result = this._fbconfigurationupdateService.fbconfigurationupdateUser(fbconfigurationupdate)
            .subscribe(function (response) {
            debugger;
            console.log("Success Response" + response);
            var config = new material_1.MdSnackBarConfig(_this._viewContainerRef);
            if (response == "0") {
                _this._snackBar.open('Exception', 'Try Again', config);
                localStorage.setItem("user", "0");
                _this.router.navigate(['/fbconfigurationupdate']);
            }
            else if (response == "2") {
                _this._snackBar.open('Record Updated Successfully', 'Thank you', config);
                localStorage.setItem("user", response);
                _this.router.navigate(['/fbconfigurationlist']);
            }
            else if (response == "-1") {
                _this._snackBar.open('FbClientId already exists', 'Try Again', config);
                localStorage.setItem("user", "-1");
                _this.router.navigate(['/fbconfigurationupdate']);
            }
            else {
                _this._snackBar.open('Model Not Valid', 'Try Again', config);
                localStorage.setItem("user", "3");
                _this.router.navigate(['/fbconfigurationupdate']);
            }
        }, function (error) { console.log("Error happened" + error); }, function () { console.log("the subscription is completed"); });
    };
    ;
    FbConfigurationUpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        debugger;
        //var id = this.router.params.subscribe(params => {
        //var id = params['Id'];       
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = +params['Id']; // (+) converts string 'id' to a number
        });
        this._fbconfigurationupdateService.getUser(this.id)
            .subscribe(function (update) { return _this.fbconfigurationupdate = update; }, function (response) {
            if (response.status == 404) {
                _this.router.navigate(['NotFound']);
            }
        });
    };
    FbConfigurationUpdateComponent = __decorate([
        core_1.Component({
            selector: 'update',
            templateUrl: 'app/component/fbconfigurationslist/fbconfigurationupdate/fbconfigurationupdate.component.html', providers: [fbconfigurationupdate_service_1.FBConfigurationUpdateService, material_1.MdSnackBar]
        }),
        __param(0, core_1.Inject(router_2.ActivatedRoute)),
        __param(1, core_1.Inject(router_1.Router)),
        __param(2, core_1.Inject(fbconfigurationupdate_service_1.FBConfigurationUpdateService)),
        __param(3, core_1.Inject(material_1.MdSnackBar)),
        __param(4, core_1.Inject(core_1.ViewContainerRef))
    ], FbConfigurationUpdateComponent);
    return FbConfigurationUpdateComponent;
}());
exports.FbConfigurationUpdateComponent = FbConfigurationUpdateComponent;
