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

    // Uses http.get() to load a single JSON file
    //validateUser(loginModel: LoginModel): Observable<string[]> {
    //    return this._http.post('http://localhost:10079/api/Login/LoginUser', loginModel).map((res: Response) => res.json());
    //}
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || ' error');
    }

    fbconfigurationUser(body: FBConfigurationModel) {
        var headers = new Headers();
        //this.createAuthorizationHeader(headers);
        headers.append('Content-Type', 'application/json');
        var content = JSON.stringify(body);

        var reqOpt = new RequestOptions({ headers: headers });
        return this._http.post('/api/FBConfiguration', content, { headers: headers }).map(res => res.json()).catch(this.handleError);
    }

    getFbConfigCustomerName() {
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');
        return this._http.get('/api/Connector/GetCustomerName', { headers: headers }).map(res => res.json()).catch(this.handleError);
    }

    private extractData(res: Response) {
        debugger;
        let body = res.json();
        return body.data || {};
    }
    // Uses Observable.forkJoin() to run multiple concurrent http.get() requests.
    // The entire operation will result in an error state if any single request fails.
    getBooksAndMovies() {
        //   return Observable.forkJoin(
        //this.http.get('/app/books.json').map((res: Response) => res.json()),
        //this.http.get('/app/movies.json').map((res: Response) => res.json())

    }
}