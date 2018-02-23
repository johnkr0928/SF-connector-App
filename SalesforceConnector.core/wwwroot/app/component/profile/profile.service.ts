import { Injectable, Inject } from '@angular/core';
import {
    RequestOptions,
    RequestMethod,
    Response,
    RequestOptionsArgs,
    Http,
    Headers // <------
} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ProfileModel } from './profile.interface'

export class ProfileService {
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
    getProfiles() {
        var headers = new Headers();      
        headers.append('Content-Type', 'application/json');
        return this._http.get('/api/Connector/', { headers: headers }).map(res => res.json()).catch(this.handleError);
    } 
    deleteUser(id) {   
        return this._http.delete('/api/Connector/' + id)
            .map(res => res.json());
    }
    getCustomerName() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get('/api/Connector/GetCustomerName', { headers: headers }).map(res => res.json()).catch(this.handleError);
    } 
}