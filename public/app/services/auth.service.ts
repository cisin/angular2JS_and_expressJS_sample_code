import {Injectable} from '@angular/core';
import {HTTP_PROVIDERS, Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AuthService {
	constructor(private http: Http) { }

	doLogin(data) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		let body = data;
		return this.http.post("/login", body, headers).map((res: Response) => res.json());
	}
	doRegister(data) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		let body = data;
		return this.http.post("/register", body, headers).map((res: Response) => res.json());
	}

	getUserDetails(data) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		let body = { id: data };
		return this.http.post("/getUser", body, headers).map((res: Response) => res.json());
	}
}