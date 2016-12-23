import {RouterConfig, provideRouter} from '@angular/router';
import {LoginRoutes} from './routes/login.route';
import {RegisterRoutes} from './routes/register.route';
import {TodoRoutes} from './routes/todo.route';
import {LogoutRoutes} from './routes/logout.route';
import {ErrorPageRoutes} from './routes/error-page.route';

export const routes: RouterConfig = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{ 
		path: 'login', 
		component: LoginComponent
	 },
	...RegisterRoutes,
	...TodoRoutes,
	...LogoutRoutes,
    ...ErrorPageRoutes
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];