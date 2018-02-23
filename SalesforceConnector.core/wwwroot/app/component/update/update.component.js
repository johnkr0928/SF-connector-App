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
var update_interface_1 = require('./update.interface');
var update_service_1 = require('./update.service');
var router_1 = require('@angular/router');
var router_2 = require('@angular/router');
var UpdateComponent = (function () {
    function UpdateComponent(_route, _router, updateService, snackbar, viewContainerRef) {
        this.update = new update_interface_1.UpdateModel("", "", "", "", "", "", false, "");
        this._updateService = updateService;
        this.router = _router;
        this.route = _route;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
    }
    UpdateComponent.prototype.updateUser = function (update, t) {
        var _this = this;
        if (t === void 0) { t = 1000; }
        var result = this._updateService.updateUser(update)
            .subscribe(function (response) {
            var config = new material_1.MdSnackBarConfig(_this._viewContainerRef);
            if (response == "0") {
                var simpleSnackBarRef = _this._snackBar.open('Exception', '', config);
                setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef), t);
                //localStorage.setItem("user", "0");
                _this.router.navigate(['/update']);
            }
            else if (response == "2") {
                var simpleSnackBarRef = _this._snackBar.open('User Updated Successfully', '', config);
                setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef), t);
                if (localStorage.getItem("Admin") == "true") {
                    _this.router.navigate(['/profile']);
                }
            }
            else if (response == "-1") {
                _this._snackBar.open('Email already exists', 'Try Again', config);
                localStorage.setItem("user", "-1");
                _this.router.navigate(['/update']);
            }
            else {
                _this._snackBar.open('Model Not Valid', 'Try Again', config);
                localStorage.setItem("user", "3");
                _this.router.navigate(['/update']);
            }
        }, function (error) { console.log("Error happened" + error); });
    };
    ;
    UpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = +params['Id'];
        });
        this._updateService.getUser(this.id)
            .subscribe(function (update) { return _this.update = update; }, function (response) {
            if (response.status == 404) {
                _this.router.navigate(['NotFound']);
            }
        });
    };
    UpdateComponent.prototype.IsAdmin = function () {
        return localStorage.getItem("Admin") !== "false";
    };
    UpdateComponent = __decorate([
        core_1.Component({
            selector: 'update',
            templateUrl: 'app/component/update/update.component.html', providers: [update_service_1.UpdateService, material_1.MdSnackBar]
        }),
        __param(0, core_1.Inject(router_2.ActivatedRoute)),
        __param(1, core_1.Inject(router_1.Router)),
        __param(2, core_1.Inject(update_service_1.UpdateService)),
        __param(3, core_1.Inject(material_1.MdSnackBar)),
        __param(4, core_1.Inject(core_1.ViewContainerRef))
    ], UpdateComponent);
    return UpdateComponent;
}());
exports.UpdateComponent = UpdateComponent;
