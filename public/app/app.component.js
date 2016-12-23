"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var login_component_1 = require('./components/login.component');
var register_component_1 = require('./components/register.component');
var todo_component_1 = require('./components/todo.component');
var logout_component_1 = require('./components/logout.component');
var error_page_component_1 = require('./components/error-page.component');
var simpletodo_component_1 = require('./components/simpletodo.component');
var category_todo_component_1 = require('./components/category-todo.component');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'todos',
            template: "\n\t\t<nav>\n\t\t    <a routerLink=\"/login\" routerLinkActive=\"active\"></a>\n  \t\t</nav>\n\t\t<router-outlet></router-outlet>\n\t",
            directives: [router_1.ROUTER_DIRECTIVES],
            precompile: [login_component_1.LoginComponent, register_component_1.RegisterComponent, todo_component_1.TodoComponent, logout_component_1.LogoutComponent, error_page_component_1.ErrorPageComponent, simpletodo_component_1.SimpleTodo, category_todo_component_1.CategoryTodo]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map