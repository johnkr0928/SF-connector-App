"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var app_component_1 = require('./app.component');
var common_1 = require('@angular/common');
var login_component_1 = require('./component/login/login.component');
var caroussel_component_1 = require('./common/caroussel.component');
var home_component_1 = require('./component/home/home.component');
var dashboard_component_1 = require('./component/dashboard/dashboard.component');
var register_component_1 = require('./component/register/register.component');
var profile_component_1 = require('./component/profile/profile.component');
var material_1 = require('@angular/material');
var ng2_material_1 = require("ng2-material");
var fbconfiguration_component_1 = require('./component/fbconfigurationslist/fbconfiguration.component');
var fbconfiguration_component_2 = require('./component/fbconfiguration/fbconfiguration.component');
var sfconfigurationprofile_component_1 = require('./component/sfconfigurationprofile/sfconfigurationprofile.component');
var sfconfiguration_component_1 = require('./component/sfconfiguration/sfconfiguration.component');
var activity_component_1 = require('./component/activity/activity.component');
var update_component_1 = require('./component/update/update.component');
var fbconfigurationupdate_component_1 = require('./component/fbconfigurationslist/fbconfigurationupdate/fbconfigurationupdate.component');
var sfconfigurationupdate_component_1 = require('./component/sfconfigurationprofile/sfconfigurationupdate/sfconfigurationupdate.component');
var address_component_1 = require('./component/address/address.component');
var addressupdate_component_1 = require('./component/address/addressupdate/addressupdate.component');
var ng2_pagination_1 = require('ng2-pagination');
var ng2_google_charts_1 = require('ng2-google-charts');
var filter_pipe_1 = require('./component/profile/filter.pipe');
var orderby_pipe_1 = require('./component/profile/orderby.pipe');
//import { ToastModule, ToastsManager, ToastOptions } from 'ng2-toastr';
var appRoutes = [
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'fbconfigurationlist', component: fbconfiguration_component_1.FBConfigurationComponentlist },
    { path: 'fbconfiguration', component: fbconfiguration_component_2.FBConfigurationComponent },
    { path: 'sfconfigurationprofile', component: sfconfigurationprofile_component_1.SfConfigurationProfileComponent },
    { path: 'sfconfiguration', component: sfconfiguration_component_1.SfConfigurationComponent },
    { path: 'activity', component: activity_component_1.ActivityComponent },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'update/:Id', component: update_component_1.UpdateComponent },
    { path: 'fbconfigurationupdate/:Id', component: fbconfigurationupdate_component_1.FbConfigurationUpdateComponent },
    { path: 'sfconfigurationupdate/:Id', component: sfconfigurationupdate_component_1.SfConfigurationUpdateComponent },
    { path: 'address/:Id', component: address_component_1.AddressComponent },
    { path: 'addressupdate/:Id', component: addressupdate_component_1.AddressUpdateComponent },
    { path: '', component: login_component_1.LoginComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule, ng2_pagination_1.Ng2PaginationModule,
                forms_1.FormsModule, ng2_google_charts_1.Ng2GoogleChartsModule,
                router_1.RouterModule.forRoot(appRoutes), material_1.MaterialModule.forRoot(), ng2_material_1.Ng2MaterialModule.forRoot()
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent, home_component_1.HomeComponent, caroussel_component_1.CSSCarouselComponent, register_component_1.RegisterComponent, profile_component_1.ProfileComponent,
                fbconfiguration_component_1.FBConfigurationComponentlist, sfconfigurationprofile_component_1.SfConfigurationProfileComponent, sfconfiguration_component_1.SfConfigurationComponent, fbconfiguration_component_2.FBConfigurationComponent, activity_component_1.ActivityComponent,
                update_component_1.UpdateComponent, fbconfigurationupdate_component_1.FbConfigurationUpdateComponent, sfconfigurationupdate_component_1.SfConfigurationUpdateComponent, address_component_1.AddressComponent, addressupdate_component_1.AddressUpdateComponent, filter_pipe_1.FilterPipe, dashboard_component_1.DashboardComponent, orderby_pipe_1.OrderBy
            ],
            providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
