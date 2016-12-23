import {RouterConfig, provideRouter} from '@angular/router';
import {ErrorPageComponent} from '../components/error-page.component';

export const ErrorPageRoutes: RouterConfig = [
    { path: '404', component: ErrorPageComponent }
];