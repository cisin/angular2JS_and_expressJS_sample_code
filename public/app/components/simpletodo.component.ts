import {Component} from '@angular/core';
import {CreateTodoService} from '../services/create-todo.service';
import {SessionService} from '../services/session.service';
import {AuthService} from '../services/auth.service';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Router} from '@angular/router';

@Component({
	templateUrl: '/app/views/simple-todo.html',
	providers: [CreateTodoService, AuthService, SessionService],
	directives: [ROUTER_DIRECTIVES]
})

export class SimpleTodo{
	public inCompleteTodos: any = [];
	public completedTodos: any = [];
	public loggedUser: any = [];
	public email;
	public newTodo;
	public emptyTodo;
	public session_UserId;
	public createdDate;
	update = true;
	todoId;

	constructor(private _createTodoService : CreateTodoService,
		private _sessionService: SessionService,
		private _authService: AuthService,
		private router: Router
	){}

	ngOnInit(){
		this.session_UserId = this._sessionService.getUserId();
		if(this.session_UserId == 123){
			this.router.navigate(['/404']);
		}else{
			let session_UserId = this._sessionService.getUserId();
			this.getUser(session_UserId);
		}
	}

	getUser(session_UserId){
		
		this._authService.getUserDetails(session_UserId).subscribe(
			data => {this.loggedUser = data.data;
				this.email = this.loggedUser.email;
				this.getTodo(this.email);
		}
	);
	}

	getTodo(email){
		this._createTodoService.getTodos(email).subscribe(
			data => {
				let i = 0;
				for (let singleTodo of data){
					if(singleTodo.status ==  true){
						if(singleTodo.category === "none"){ // Displaying the todos without the categories
							this.inCompleteTodos[i] = singleTodo;
							var objDate = new Date (this.inCompleteTodos[i].createdOn);
							this.createdDate = objDate.getDate()+"-"+(objDate.getMonth() + 1)+"-"+objDate.getFullYear();
							i++;
						}
					}else if(singleTodo.status == false){
						if(singleTodo.category === "none"){
							this.completedTodos[i] = singleTodo;
							i++;
						}
					}
				}
			}
		);
	}

	remove(id){
		this._createTodoService.removeTodo(id).subscribe(
			data => {
				this.inCompleteTodos = [];
				this.completedTodos = [];
				this.getTodo(this.email);
			}
		);
	}

	changeBtn(id, todo){
		this.newTodo = todo;
		this.todoId = id;
		this.update = false;
	}

	editTodo(){
		this._createTodoService.editTodo(this.todoId, this.newTodo).subscribe(
			data => {
				this.inCompleteTodos = [];
				this.completedTodos = [];
				this.getTodo(this.email);
			}
		);
		this.update = true;
		this.newTodo = "";
	}

	addNewTodo(){
		if(this.newTodo == undefined){
			this.emptyTodo = "Todo can't be blank";
			this.newTodo = "";
		}else{
			if(this.newTodo.trim() == ""){
				this.emptyTodo = "Todo can't be white spaces";
				this.newTodo = "";
			}else{
				this.emptyTodo = "";
				this._createTodoService.addTodo(this.email, this.newTodo, "none").subscribe(
				data => {
					this.newTodo = "";
					if(data.result){
						this.inCompleteTodos = [];
						this.completedTodos = [];
						this.getTodo(this.email);
					}
				}
			);
			}
		}
	}

	todoDone(id){
		this._createTodoService.todoDone(id).subscribe(
			data => {
				this.inCompleteTodos = [];
				this.completedTodos = [];
				this.getTodo(this.email);
			}
		);
	}
	
	unDone(id){
		this._createTodoService.unDone(id).subscribe(
			data => {
				this.inCompleteTodos = [];
				this.completedTodos = [];
				this.getTodo(this.email);
			}
		);
	}
}