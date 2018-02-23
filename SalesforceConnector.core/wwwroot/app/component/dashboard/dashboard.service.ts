import { Injectable, Inject } from '@angular/core';
import {
    RequestOptions,
    RequestMethod,
    Response,
    RequestOptionsArgs,
    Http,
    Headers
} from '@angular/http';
import { Observable } from 'rxjs/Rx';

export class DashboardService {
    private postResponse: any;
    private _http: Http;
    public headers: Headers;
    constructor( @Inject(Http) http: Http) {
        this._http = http;
    }  

    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', 'Basic ' +
            btoa('a20e6aca-ee83-44bc-8033-b41f3078c2b6:c199f9c8-0548-4be79655-7ef7d7bf9d20'));
    }    
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || ' error');
    } 
    getdashboardById() {
        console.log('success');
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get('/api/dashboard/', { headers: headers }).map(res => res.json()).catch(this.handleError);
    }
    getcustomerid(id) {
        debugger;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get('/api/Connector/GetApiCustomerId?id='+id, { headers: headers }).map(res => res.json()).catch(this.handleError);
    }
    //getapibyadmin() {
    //    var headers = new Headers();
    //    headers.append('Content-Type', 'application/json');
    //    return this._http.get('/api/Connector/GetApiByAdmin', { headers: headers }).map(res => res.json()).catch(this.handleError);
    //}
    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    } 
}