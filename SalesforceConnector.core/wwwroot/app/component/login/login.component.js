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
var login_interface_1 = require('./login.interface');
var login_service_1 = require('./login.service');
var router_1 = require('@angular/router');
//import {}from '@angular/platform-browser';
var LoginComponent = (function () {
    function LoginComponent(_router, loginService, snackbar, viewContainerRef) {
        if (viewContainerRef === void 0) { viewContainerRef = null; }
        this.login = new login_interface_1.LoginModel("", "");
        this.isloading = false;
        this.edited = false;
        this.color = false;
        this.setAutoHide = true;
        this.autoHide = 200;
        localStorage.setItem("user", "-1");
        localStorage.setItem("Admin", "-1");
        this._loginService = loginService;
        this.router = _router;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
        this.router.navigate(['/login']);
    }
    LoginComponent.prototype.validateUser = function (login, t) {
        var _this = this;
        if (t === void 0) { t = 1000; }
        debugger;
        this.color = true;
        this.edited = true;
        var result = this._loginService.validateUser(login)
            .subscribe(function (response) {
            debugger;
            var config = new material_1.MdSnackBarConfig(_this._viewContainerRef);
            if (response == "-1") {
                var simpleSnackBarRef = _this._snackBar.open('Username/Password is incorrect', '', config);
                setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef), t);
                _this.color = false;
                _this.edited = false;
                localStorage.setItem("user", "-1");
                _this.router.navigate(['/login']);
            }
            else if (response == "4") {
                _this._snackBar.open('Contact Your Adminstrator', 'Try Again', config);
                _this.color = false;
                _this.edited = false;
                localStorage.setItem("user", "-1");
                _this.router.navigate(['/login']);
            }
            else if (response == "0") {
                _this._snackBar.open('Exceptions', 'Try Again', config);
                _this.color = false;
                _this.edited = false;
                localStorage.setItem("user", "-1");
                _this.router.navigate(['/login']);
            }
            else if (function (response) { return "1"; }) {
                debugger;
                localStorage.setItem("user", response);
                var result = _this._loginService.getAdmin(response).subscribe(function (response1) {
                    if (response1) {
                        localStorage.setItem("Admin", response1);
                        _this.router.navigate(['/profile']);
                        _this.color = false;
                        _this.edited = false;
                    }
                    else {
                        localStorage.setItem("Admin", response1);
                        _this.router.navigate(['/dashboard']);
                    }
                }, function (error) { console.log("Error happened" + error); });
            }
        }, function (error) { console.log("Error happened" + error); });
    };
    ;
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'app/component/login/login.component.html', providers: [login_service_1.LoginService, material_1.MdSnackBar]
        }),
        __param(0, core_1.Inject(router_1.Router)),
        __param(1, core_1.Inject(login_service_1.LoginService)),
        __param(2, core_1.Inject(material_1.MdSnackBar)),
        __param(3, core_1.Inject(core_1.ViewContainerRef))
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
