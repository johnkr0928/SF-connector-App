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
import { SfConfigurationProfileModel } from './sfconfigurationprofile.interface'

export class SfConfigurationProfileService {
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
    getSfConfigurationProfiles() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get('/api/SfConfiguration/', { headers: headers }).map(res => res.json()).catch(this.handleError);
    }
    save(body: SfConfigurationProfileModel) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var content = JSON.stringify(body);
        var reqOpt = new RequestOptions({ headers: headers });
        return this._http.post('/api/SfConfiguration/', content, { headers: headers }).map(res => res.json()).catch(this.handleError);
    }   
    deleteUser(id) {
        return this._http.delete('/api/SfConfiguration/' + id)
            .map(res => res.json());
    }   
}