import {RouterConfig, provideRouter} from '@angular/router';
import {LogoutComponent} from '../components/logout.component';

export const LogoutRoutes: RouterConfig = [
	{ path: 'logout', component: LogoutComponent }
];