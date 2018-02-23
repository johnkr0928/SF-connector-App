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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var FBConfigurationService = (function () {
    function FBConfigurationService(http) {
        this._http = http;
    }
    FBConfigurationService.prototype.createAuthorizationHeader = function (headers) {
        headers.append('Authorization', 'Basic ' +
            btoa('a20e6aca-ee83-44bc-8033-b41f3078c2b6:c199f9c8-0548-4be79655-7ef7d7bf9d20'));
    };
    // Uses http.get() to load a single JSON file
    //validateUser(loginModel: LoginModel): Observable<string[]> {
    //    return this._http.post('http://localhost:10079/api/Login/LoginUser', loginModel).map((res: Response) => res.json());
    //}
    FBConfigurationService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || ' error');
    };
    FBConfigurationService.prototype.fbconfigurationUser = function (body) {
        var headers = new http_1.Headers();
        //this.createAuthorizationHeader(headers);
        headers.append('Content-Type', 'application/json');
        var content = JSON.stringify(body);
        var reqOpt = new http_1.RequestOptions({ headers: headers });
        return this._http.post('/api/FBConfiguration', content, { headers: headers }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    FBConfigurationService.prototype.getFbConfigCustomerName = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get('/api/Connector/GetCustomerName', { headers: headers }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    FBConfigurationService.prototype.extractData = function (res) {
        debugger;
        var body = res.json();
        return body.data || {};
    };
    // Uses Observable.forkJoin() to run multiple concurrent http.get() requests.
    // The entire operation will result in an error state if any single request fails.
    FBConfigurationService.prototype.getBooksAndMovies = function () {
        //   return Observable.forkJoin(
        //this.http.get('/app/books.json').map((res: Response) => res.json()),
        //this.http.get('/app/movies.json').map((res: Response) => res.json())
    };
    FBConfigurationService = __decorate([
        __param(0, core_1.Inject(http_1.Http))
    ], FBConfigurationService);
    return FBConfigurationService;
}());
exports.FBConfigurationService = FBConfigurationService;
