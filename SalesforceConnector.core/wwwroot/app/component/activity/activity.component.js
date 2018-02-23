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
var activity_interface_1 = require('./activity.interface');
var activity_service_1 = require('./activity.service');
var router_1 = require('@angular/router');
var ActivityComponent = (function () {
    function ActivityComponent(_router, activityService, snackbar, viewContainerRef) {
        this.test = new Date();
        this.activity = new activity_interface_1.ActivityModel("", "", "", "");
        this.sort = { name: "UserName", descending: false };
        this.sort.descending = false;
        this._activityService = activityService;
        this.router = _router;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
        this.get();
        this.getActivityResponse();
    }
    ActivityComponent.prototype.ngOnInit = function () {
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
    ActivityComponent.prototype.get = function () {
        var _this = this;
        var result = this._activityService.getActivities()
            .subscribe(function (response) {
            var config = new material_1.MdSnackBarConfig(_this._viewContainerRef);
            if (response == "0") {
                _this._snackBar.open('Username / Password is wrong', 'Try Again', config);
                localStorage.setItem("user", "-1");
                _this.router.navigate(['/login']);
            }
            else {
                _this.activities = (response);
            }
        }, function (error) { console.log("Error happened" + error); });
    };
    ;
    ActivityComponent.prototype.getActivityResponse = function () {
        var _this = this;
        var result = this._activityService.getActivitiesresponse()
            .subscribe(function (response) {
            var config = new material_1.MdSnackBarConfig(_this._viewContainerRef);
            if (response == "0") {
                _this._snackBar.open('Username / Password is wrong', 'Try Again', config);
                localStorage.setItem("user", "-1");
                _this.router.navigate(['/login']);
            }
            else {
                _this.getactivitiesresponse = (response);
            }
        }, function (error) { console.log("Error happened" + error); });
    };
    ;
    ActivityComponent.prototype.selectedClass = function (columnName) {
        return columnName == this.sort.name ? ' sort-' + this.sort.descending : '';
    };
    ActivityComponent.prototype.changeSorting = function (columnName, descending) {
        this.sort.name = columnName;
        this.sort.descending = !this.sort.descending;
    };
    ActivityComponent.prototype.convertSorting = function () {
        if (this.sort)
            return this.sort.descending ? '-' + this.sort.name : this.sort.name;
    };
    ActivityComponent = __decorate([
        core_1.Component({
            selector: 'activity',
            templateUrl: 'app/component/activity/activity.component.html', providers: [activity_service_1.ActivityService, material_1.MdSnackBar],
        }),
        __param(0, core_1.Inject(router_1.Router)),
        __param(1, core_1.Inject(activity_service_1.ActivityService)),
        __param(2, core_1.Inject(material_1.MdSnackBar)),
        __param(3, core_1.Inject(core_1.ViewContainerRef))
    ], ActivityComponent);
    return ActivityComponent;
}());
exports.ActivityComponent = ActivityComponent;
