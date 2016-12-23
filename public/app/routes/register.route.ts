import {RouterConfig, provideRouter} from '@angular/router';
import {RegisterComponent} from '../components/register.component';

export const RegisterRoutes: RouterConfig = [
	{ path: 'register', component: RegisterComponent }
];