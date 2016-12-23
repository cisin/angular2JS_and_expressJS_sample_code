import {Injectable} from '@angular/core';
import sessionVar = require('../session');

@Injectable()
export class SessionService {
	public userId;
	constructor() { }

	saveUserId(id) {
		sessionVar.userId = id;
	}
	getUserId() {
		return sessionVar.userId;
	}
	logout() {
		sessionVar.userId = 123;
	}
}