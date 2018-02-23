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
import { FBConfigurationModel } from './fbconfiguration.interface'


export class FBConfigurationService {
    private postResponse: any;
    private _http: Http;
    public headers: Headers; //*********
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
    fbconfigurationlistUser() {
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');
        return this._http.get('/api/FBConfiguration/', { headers: headers }).map(res => res.json()).catch(this.handleError);
    }   
  

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    deleteUser(id) {
        return this._http.delete('/api/FBConfiguration/' + id)
            .map(res => res.json());

    }
   

}