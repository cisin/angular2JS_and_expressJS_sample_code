import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Login} from '../CreateUser';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {SessionService} from '../services/session.service';

@Component({
	templateUrl: '/app/views/login.form.html',
	directives: [ROUTER_DIRECTIVES],
	providers: [AuthService, SessionService]
})

export class LoginComponent implements OnInit{
	public loginData = new Login();
	public response: any = [];
	public loginResponse;
	public session_UserId;

	constructor(private _authService: AuthService,
		private router: Router,
		private _sessionService: SessionService
	) { }

	ngOnInit() {
		this._sessionService.getUserId();
	}

	login() {
		if (this.loginData.email != "") {
			this.loginResponse = "";
			if (this.loginData.password != "") {
				this.loginResponse = "";
				this._authService.doLogin(this.loginData).subscribe(
					data => {
						this.response = data;
						if (!this.response.result) {
							this.loginResponse = this.response.message;
						} else {
							if (this.session_UserId == 123) { // Checking if user id is set
								this.router.navigate(['/404']);
							} else {
								this._sessionService.saveUserId(this.response.data);
								this.router.navigate(['/new-todo']);
							}
						}
					}
				);
			} else {
				this.loginResponse = "password can't empty";
			}
		} else {
			this.loginResponse = "email can't empty";
		}
	}
}