import {Component} from '@angular/core';
import {CreateTodoService} from '../services/create-todo.service';
import {SessionService} from '../services/session.service';
import {AuthService} from '../services/auth.service';
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from '@angular/router';

@Component({
	templateUrl: '/app/views/todos.html',
	providers: [CreateTodoService, AuthService, SessionService],
	directives: [ROUTER_DIRECTIVES]
})

export class TodoComponent {
	public session_UserId;
	public loggedUser: any = [];

	constructor(private _sessionService: SessionService,
		private router: Router,
		private _authService: AuthService
	) { }

	ngOnInit() {
		this.session_UserId = this._sessionService.getUserId();
		if (this.session_UserId == 123) {
			this.router.navigate(['/404']);
		} else {
			let session_UserId = this._sessionService.getUserId();
			this.getUser(session_UserId);
		}
	}

	getUser(session_UserId) {

		this._authService.getUserDetails(session_UserId).subscribe(
			data => {
			this.loggedUser = data.data;
			}
		);
	}
}