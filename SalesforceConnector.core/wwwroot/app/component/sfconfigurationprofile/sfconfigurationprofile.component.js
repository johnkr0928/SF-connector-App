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
var sfconfigurationprofile_interface_1 = require('./sfconfigurationprofile.interface');
var sfconfigurationprofile_service_1 = require('./sfconfigurationprofile.service');
var router_1 = require('@angular/router');
var SfConfigurationProfileComponent = (function () {
    function SfConfigurationProfileComponent(_router, sfconfigurationprofileService, snackbar, viewContainerRef) {
        this.logins = new sfconfigurationprofile_interface_1.SfConfigurationProfileModel("", "", "", "", "", "", "", "", "", "");
        this.sort = { name: "SalesForceUserName", descending: false };
        this.sort.descending = false;
        this._sfconfigurationprofileService = sfconfigurationprofileService;
        this.router = _router;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
        this.get();
    }
    SfConfigurationProfileComponent.prototype.ngOnInit = function () {
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
    SfConfigurationProfileComponent.prototype.get = function () {
        var _this = this;
        var result = this._sfconfigurationprofileService.getSfConfigurationProfiles()
            .subscribe(function (response) {
            var config = new material_1.MdSnackBarConfig(_this._viewContainerRef);
            if (response == "0") {
                _this._snackBar.open('Username / Password is wrong', 'Try Again', config);
                localStorage.setItem("user", "-1");
                _this.router.navigate(['/login']);
            }
            else {
                _this.sfconfigurationprofiles = (response);
            }
        }, function (error) { console.log("Error happened" + error); });
    };
    ;
    //Delete
    SfConfigurationProfileComponent.prototype.deleteUser = function (Id, Name) {
        var _this = this;
        var alert = (confirm("Are you sure you want to delete  " + Name + "?"));
        if (alert) {
            var result = this._sfconfigurationprofileService.deleteUser(Id)
                .subscribe(function (response) {
                var config = new material_1.MdSnackBarConfig(_this._viewContainerRef);
                if (response == "0") {
                    _this._snackBar.open('Username / Password is wrong', 'Try Again', config);
                    localStorage.setItem("user", "-1");
                    _this.router.navigate(['/profile']);
                }
                else {
                    localStorage.setItem("user", response);
                    _this.get();
                }
            }, function (error) { console.log("Error happened" + error); });
        }
        this.router.navigate(['/sfconfigurationprofile']);
    };
    SfConfigurationProfileComponent.prototype.selectedClass = function (columnName) {
        return columnName == this.sort.name ? ' sort-' + this.sort.descending : '';
    };
    SfConfigurationProfileComponent.prototype.changeSorting = function (columnName, descending) {
        this.sort.name = columnName;
        this.sort.descending = !this.sort.descending;
    };
    SfConfigurationProfileComponent.prototype.convertSorting = function () {
        if (this.sort)
            return this.sort.descending ? '-' + this.sort.name : this.sort.name;
    };
    SfConfigurationProfileComponent = __decorate([
        core_1.Component({
            selector: 'logins',
            templateUrl: 'app/component/sfconfigurationprofile/sfconfigurationprofile.component.html', providers: [sfconfigurationprofile_service_1.SfConfigurationProfileService, material_1.MdSnackBar]
        }),
        __param(0, core_1.Inject(router_1.Router)),
        __param(1, core_1.Inject(sfconfigurationprofile_service_1.SfConfigurationProfileService)),
        __param(2, core_1.Inject(material_1.MdSnackBar)),
        __param(3, core_1.Inject(core_1.ViewContainerRef))
    ], SfConfigurationProfileComponent);
    return SfConfigurationProfileComponent;
}());
exports.SfConfigurationProfileComponent = SfConfigurationProfileComponent;
