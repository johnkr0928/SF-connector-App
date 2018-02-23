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
var register_interface_1 = require('./register.interface');
var register_service_1 = require('./register.service');
var router_1 = require('@angular/router');
var RegisterComponent = (function () {
    function RegisterComponent(_router, registerService, snackbar, viewContainerRef) {
        this.register = new register_interface_1.RegisterModel("", "", "", "", "", "");
        this._registerService = registerService;
        this.router = _router;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        jQuery(document).ready(function () {
            //jQuery(".plus").click(function () {
            jQuery.validator.setDefaults({
                debug: true,
                success: "valid"
            });
            $("#myform").validate({
                rules: {
                    Password: "required",
                    ConfirmPassword: {
                        equalTo: "#password"
                    }
                }
            });
        });
    };
    RegisterComponent.prototype.registerUser = function (register) {
        var _this = this;
        var result = this._registerService.registerUser(register)
            .subscribe(function (response) {
            var config = new material_1.MdSnackBarConfig(_this._viewContainerRef);
            if (response == "1") {
                _this._snackBar.open('User Saved Successfully', 'Thank You', config);
                localStorage.setItem("user", response);
                _this.router.navigate(['/profile']);
            }
            else if (response == "-1") {
                _this._snackBar.open('Email Already Exists', 'Try Again', config);
                localStorage.setItem("user", "-1");
                _this.router.navigate(['/register']);
            }
            else if (response == "3") {
                _this._snackBar.open('Model Not Valid', 'Try Again', config);
                localStorage.setItem("user", "3");
                _this.router.navigate(['/register']);
            }
            else if (response == "0") {
                _this._snackBar.open('Exceptions', 'Try Again', config);
                localStorage.setItem("user", response);
                _this.router.navigate(['/register']);
            }
        }, function (error) { console.log("Error happened" + error); });
    };
    ;
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'register',
            templateUrl: 'app/component/register/register.component.html', providers: [register_service_1.RegisterService, material_1.MdSnackBar]
        }),
        __param(0, core_1.Inject(router_1.Router)),
        __param(1, core_1.Inject(register_service_1.RegisterService)),
        __param(2, core_1.Inject(material_1.MdSnackBar)),
        __param(3, core_1.Inject(core_1.ViewContainerRef))
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
