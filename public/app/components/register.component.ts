import {Component} from '@angular/core';
import {Register} from '../CreateUser';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
	templateUrl: '/app/views/register.form.html',
	directives: [ROUTER_DIRECTIVES],
	providers: [AuthService]
})

export class RegisterComponent{
	public registerData = new Register();
	public response: any = [];
	public message;

	constructor( private _authService: AuthService){}

	register(){
		if(this.registerData.name != ""){
			if(this.registerData.email != ""){
				if(this.registerData.password != ""){
						this._authService.doRegister(this.registerData).subscribe(
						data => {this.response = data;
						if(!this.response.result){
							this.message = this.response.message;
						}else{
							this.message = "Welcome to todo App, please login to experience awesomeness !";
						}
					}
				);
				}else{
					this.message = "password can't be empty";
				}
			}else{
				this.message = "email can't be empty";
			}	
		}else{
			this.message = "name can't be empty";
		}
	}
}