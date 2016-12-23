import {Component} from '@angular/core';
import {CreateTodoService} from '../services/create-todo.service';
import {SessionService} from '../services/session.service';
import {AuthService} from '../services/auth.service';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Router} from '@angular/router';

@Component({
    templateUrl: "/app/views/cat-todo.html",
	providers: [CreateTodoService, AuthService, SessionService],
    directives: [ROUTER_DIRECTIVES]
})

export class CategoryTodo {
    public inCompleteTodos: any = [];
	public completedTodos: any = [];
	public loggedUser: any = [];
	public email;
	public catTodo;
	public emptyTodo;
	public session_UserId;
	public createdDate;
    selectedValue = "";
    noneSelected;
	public newTodo;
	update = true;
	todoId;

	constructor(private _createTodoService: CreateTodoService,
		private _sessionService: SessionService,
		private _authService: AuthService,
		private router: Router
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
				this.email = this.loggedUser.email;
				this.getTodo(this.email);
			}
		);
	}

	getTodo(email) {
		this._createTodoService.getTodos(email).subscribe(
			data => {
				let i = 0;

				for (let singleTodo of data) {
					if (singleTodo.status == true) {
                        if (singleTodo.category !== "none") { // Checking the todos with the category
                            this.inCompleteTodos[i] = singleTodo;
                            var objDate = new Date(this.inCompleteTodos[i].createdOn); // Changing the typeof the date
							let month = objDate.getMonth(); 
                            this.createdDate = objDate.getDate() + "-" + (month + 1) + "-" + objDate.getFullYear();
                            i++;
                        }
					} else if (singleTodo.status == false) {
                        if (singleTodo.category !== "none") {
                            this.completedTodos[i] = singleTodo;
                            i++;
                        }
					}
				}
			}
		);
	}

	remove(id) {
		this._createTodoService.removeTodo(id).subscribe(
			data => {
				this.inCompleteTodos = [];
				this.completedTodos = [];
				this.getTodo(this.email);
			}
		);
	}

	changeBtn(id, todo) { // Changing the add todo button on clicking the edit link
		this.catTodo = todo;
		this.todoId = id;
		this.update = false;
	}

	editTodo() {
		this._createTodoService.editTodo(this.todoId, this.catTodo).subscribe(
			data => {
				this.inCompleteTodos = [];
				this.completedTodos = [];
				this.getTodo(this.email);
			}
		);
		this.update = true;
		this.catTodo = "";
	}

    onChange(newValue) { // Getting the select option value
        this.selectedValue = newValue;
    }

	addNewTodo() {
        if (this.selectedValue == "") {
            this.noneSelected = "Category is not selected.";
        } else {
            this.noneSelected = "";
            if (this.catTodo == undefined) {
				this.emptyTodo = "Todo can't be blank";
				this.catTodo = "";
			} else {
				if (this.catTodo.trim() == "") {
					this.emptyTodo = "Todo can't be white spaces";
					this.catTodo = "";
				} else {
					this.emptyTodo = "";
					this.catTodo = this.catTodo.trim();
					this._createTodoService.addTodo(this.email, this.catTodo, this.selectedValue).subscribe(
						data => {
							this.catTodo = "";
							if (data.result) {
								this.inCompleteTodos = [];
								this.completedTodos = [];
								this.getTodo(this.email);
							}
						}
					);
				}
			}
        }
	}

	todoDone(id) {
		this._createTodoService.todoDone(id).subscribe(
			data => {
				this.inCompleteTodos = [];
				this.completedTodos = [];
				this.getTodo(this.email);
			}
		);
	}
	
	unDone(id) {
		this._createTodoService.unDone(id).subscribe(
			data => {
				this.inCompleteTodos = [];
				this.completedTodos = [];
				this.getTodo(this.email);
			}
		);
	}

}