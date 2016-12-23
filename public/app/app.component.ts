import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {LoginComponent} from './components/login.component';
import {RegisterComponent} from './components/register.component';
import {TodoComponent} from './components/todo.component';
import {LogoutComponent} from './components/logout.component';
import {ErrorPageComponent} from './components/error-page.component';
import {SimpleTodo} from './components/simpletodo.component';
import {CategoryTodo} from './components/category-todo.component';

@Component({
	selector: 'todos',
	template: `
		<nav>
		    <a routerLink="/login" routerLinkActive="active"></a> 
  		</nav>
		<router-outlet></router-outlet>
	`,
	directives: [ROUTER_DIRECTIVES],
	precompile: [LoginComponent, RegisterComponent, TodoComponent, LogoutComponent, ErrorPageComponent, SimpleTodo, CategoryTodo]
})

export class AppComponent {

}