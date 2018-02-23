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
var profile_interface_1 = require('./profile.interface');
var profile_service_1 = require('./profile.service');
var router_1 = require('@angular/router');
var ProfileComponent = (function () {
    function ProfileComponent(_router, profileService, snackbar, viewContainerRef, dialog) {
        this.dialog = dialog;
        this.login = new profile_interface_1.ProfileModel("", "");
        this.sort = { name: "FirstName", descending: false };
        this.sort.descending = false;
        this._profileService = profileService;
        this.router = _router;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
        this.get();
    }
    ProfileComponent.prototype.ngOnInit = function () {
        jQuery(document).ready(function () {
            jQuery(".plus").click(function () {
                jQuery(".filter").slideToggle("fast");
                jQuery(".plus").css("display", "none");
                jQuery(".minus").css("display", "block");
                jQuery(".minus").addClass("active");
                jQuery(".plus").removeClass("active");
            });
            jQuery(".minus").click(function () {
                jQuery(".filter").slideToggle("fast");
                jQuery(".minus").css("display", "none");
                jQuery(".plus").css("display", "block");
                jQuery(".plus").addClass("active");
                jQuery(".minus").removeClass("active");
            });
            jQuery("#filter").click(function () {
                debugger;
                jQuery(".filter").slideToggle("fast");
                var some = jQuery(".active").attr("class");
                var myString = some;
                var arr = myString.split("");
                if (arr[6] == "p") {
                    jQuery(".minus").css("display", "block");
                    jQuery(".plus").css("display", "none");
                    jQuery(".minus").addClass("active");
                    jQuery(".plus").removeClass("active");
                }
                else {
                    jQuery(".minus").css("display", "none");
                    jQuery(".plus").css("display", "block");
                    jQuery(".plus").addClass("active");
                    jQuery(".minus").removeClass("active");
                }
            });
        });
    };
    ProfileComponent.prototype.get = function () {
        var _this = this;
        var result = this._profileService.getProfiles()
            .subscribe(function (response) {
            var config = new material_1.MdSnackBarConfig(_this._viewContainerRef);
            if (response == "0") {
                _this._snackBar.open('Username / Password is wrong', 'Try Again', config);
                localStorage.setItem("user", "-1");
                _this.router.navigate(['/login']);
            }
            else {
                _this.profiles = (response);
            }
        }, function (error) { console.log("Error happened" + error); });
    };
    ;
    //Delete
    ProfileComponent.prototype.deleteUser = function (Id, Name) {
        var _this = this;
        var alert = (confirm("Are you sure you want to delete  " + Name + "?"));
        if (alert) {
            var result = this._profileService.deleteUser(Id)
                .subscribe(function (response) {
                var config = new material_1.MdSnackBarConfig(_this._viewContainerRef);
                if (response == "0") {
                    _this._snackBar.open('Internal Server Error', 'Try Again', config);
                    localStorage.setItem("user", "-1");
                    _this.router.navigate(['/profile']);
                }
                else {
                    _this.get();
                }
            }, function (error) { console.log("Error happened" + error); });
        }
        this.router.navigate(['/profile']);
    };
    ProfileComponent.prototype.selectedClass = function (columnName) {
        return columnName == this.sort.name ? ' sort-' + this.sort.descending : '';
    };
    ProfileComponent.prototype.changeSorting = function (columnName, descending) {
        this.sort.name = columnName;
        this.sort.descending = !this.sort.descending;
    };
    ProfileComponent.prototype.convertSorting = function () {
        if (this.sort)
            return this.sort.descending ? '-' + this.sort.name : this.sort.name;
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'app/component/profile/profile.component.html', providers: [profile_service_1.ProfileService, material_1.MdSnackBar]
        }),
        __param(0, core_1.Inject(router_1.Router)),
        __param(1, core_1.Inject(profile_service_1.ProfileService)),
        __param(2, core_1.Inject(material_1.MdSnackBar)),
        __param(3, core_1.Inject(core_1.ViewContainerRef))
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
