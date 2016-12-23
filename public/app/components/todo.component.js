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
var create_todo_service_1 = require('../services/create-todo.service');
var session_service_1 = require('../services/session.service');
var auth_service_1 = require('../services/auth.service');
var router_1 = require('@angular/router');
var TodoComponent = (function () {
    function TodoComponent(_sessionService, router, _authService) {
        this._sessionService = _sessionService;
        this.router = router;
        this._authService = _authService;
        this.loggedUser = [];
    }
    TodoComponent.prototype.ngOnInit = function () {
        this.session_UserId = this._sessionService.getUserId();
        if (this.session_UserId == 123) {
            this.router.navigate(['/404']);
        }
        else {
            var session_UserId = this._sessionService.getUserId();
            this.getUser(session_UserId);
        }
    };
    TodoComponent.prototype.getUser = function (session_UserId) {
        var _this = this;
        this._authService.getUserDetails(session_UserId).subscribe(function (data) {
            _this.loggedUser = data.data;
        });
    };
    TodoComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/views/todos.html',
            providers: [create_todo_service_1.CreateTodoService, auth_service_1.AuthService, session_service_1.SessionService],
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [session_service_1.SessionService, router_1.Router, auth_service_1.AuthService])
    ], TodoComponent);
    return TodoComponent;
}());
exports.TodoComponent = TodoComponent;
//# sourceMappingURL=todo.component.js.map