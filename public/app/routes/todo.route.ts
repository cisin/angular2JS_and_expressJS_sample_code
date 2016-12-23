import {RouterConfig, provideRouter} from '@angular/router';
import {TodoComponent} from '../components/todo.component';
import {SimpleTodo} from '../components/simpletodo.component';
import {CategoryTodo} from '../components/category-todo.component';

export const TodoRoutes: RouterConfig = [
	{
		path: 'new-todo', component: TodoComponent,
		children: [
			{ path: '', component: SimpleTodo },
			{ path: 'todo', component: SimpleTodo },
			{ path: 'category', component: CategoryTodo }
		]
	}
];