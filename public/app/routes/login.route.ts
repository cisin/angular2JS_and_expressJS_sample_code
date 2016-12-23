import {RouterConfig, provideRouter} from '@angular/router';
import {LoginComponent} from '../components/login.component';

export const LoginRoutes: RouterConfig = [
	{ path: 'login', component: LoginComponent }
];