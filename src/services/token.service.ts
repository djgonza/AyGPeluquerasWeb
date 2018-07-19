import { Injectable } from "@angular/core";
import { HttpService } from './http.service';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class TokenService {

	private apiPath = "http://localhost:3000/token";
	private _token = new BehaviorSubject<string>(null);

	constructor (
		private http: HttpService
	) {}

	public get token (): string {
		return this._token.getValue();
	}

	public getToken (user: string, pass: string): void {
		this.http.post(this.apiPath, {
			user: user,
			pass: pass
		}).subscribe((token) => {
			this._token.next(token);
		}, err => {
			console.log(err);
		});
	}

	public getTokenHeader (): HttpHeaders {
		return new HttpHeaders({"Authorization": this.token});
	}

}