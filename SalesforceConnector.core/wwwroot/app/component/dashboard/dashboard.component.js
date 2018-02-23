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
var dashboard_service_1 = require('./dashboard.service');
var router_1 = require('@angular/router');
var DashboardComponent = (function () {
    function DashboardComponent(_router, dashboardService, snackbar, viewContainerRef, dialog) {
        this.dialog = dialog;
        this._dashboardService = dashboardService;
        this.router = _router;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
        debugger;
        // var some = this.get();
        var some = parseInt(this.get());
        debugger;
        this.pieChartOptions = {
            chartType: 'ColumnChart',
            dataTable: [
                ['Customer', 'No Of Hits'],
                ['FirstName', some],
            ],
            options: { 'title': 'Api Consumed' },
        };
    }
    DashboardComponent.prototype.get = function () {
        var _this = this;
        debugger;
        var result = this._dashboardService.getcustomerid(localStorage.getItem("user"))
            .subscribe(function (response) {
            debugger;
            //    return response;        
            _this.pieChartOptions = {
                chartType: 'ColumnChart',
                dataTable: [
                    ['Customer', 'No Of Hits'],
                    [response.FirstName + " " + response.LastName, response.response],
                ],
                options: { 'title': 'Api Request', backgroundColor: '#E4E4E4', colors: ['#5c3292'] },
            };
        }, function (error) { console.log("Error happened" + error); });
    };
    ;
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: 'app/component/dashboard/dashboard.component.html', providers: [dashboard_service_1.DashboardService, material_1.MdSnackBar]
        }),
        __param(0, core_1.Inject(router_1.Router)),
        __param(1, core_1.Inject(dashboard_service_1.DashboardService)),
        __param(2, core_1.Inject(material_1.MdSnackBar)),
        __param(3, core_1.Inject(core_1.ViewContainerRef))
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
