import {Component} from '@angular/core';
import {SessionService} from '../services/session.service';
import {Router} from "@angular/router";

@Component({
	template: '',
	providers: [SessionService]
})

export class LogoutComponent{
	public session_UserId;
	constructor(private _sessionService: SessionService,
		private router: Router
	){}

	ngOnInit(){
		this.session_UserId = this._sessionService.getUserId();
					this._sessionService.logout();
			this.router.navigate(['/login']);
		
		
	}
}