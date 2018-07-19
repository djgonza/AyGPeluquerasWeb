import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {

    constructor(
        private http: HttpClient) { }

    //Peticiones get
    public get(url: string, httpOptions?: any): Observable<any> {
        return this.http.get(url, httpOptions);
    }

    //Peticiones post
    public post(url: string, body: Object, httpOptions?: any): Observable<any> {
        return this.http.post(url, body, httpOptions);
    }

    //Peticiones put
    public put(url: string, body: Object, httpOptions?: any): Observable<any> {
        return this.http.put(url, body, httpOptions);
    }

    //Peticiones delete
    public delete(url: string, httpOptions?: any): Observable<any> {
        return this.http.delete(url, httpOptions);
    }
}