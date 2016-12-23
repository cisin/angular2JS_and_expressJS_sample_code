"use strict";
var router_1 = require('@angular/router');
var login_route_1 = require('./routes/login.route');
var register_route_1 = require('./routes/register.route');
var todo_route_1 = require('./routes/todo.route');
var logout_route_1 = require('./routes/logout.route');
var error_page_route_1 = require('./routes/error-page.route');
exports.routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
].concat(login_route_1.LoginRoutes, register_route_1.RegisterRoutes, todo_route_1.TodoRoutes, logout_route_1.LogoutRoutes, error_page_route_1.ErrorPageRoutes);
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map