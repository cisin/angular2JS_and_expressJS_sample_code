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
var router_2 = require('@angular/router');
var CategoryTodo = (function () {
    function CategoryTodo(_createTodoService, _sessionService, _authService, router) {
        this._createTodoService = _createTodoService;
        this._sessionService = _sessionService;
        this._authService = _authService;
        this.router = router;
        this.inCompleteTodos = [];
        this.completedTodos = [];
        this.loggedUser = [];
        this.selectedValue = "";
        this.update = true;
    }
    CategoryTodo.prototype.ngOnInit = function () {
        this.session_UserId = this._sessionService.getUserId();
        if (this.session_UserId == 123) {
            this.router.navigate(['/404']);
        }
        else {
            var session_UserId = this._sessionService.getUserId();
            this.getUser(session_UserId);
        }
    };
    CategoryTodo.prototype.getUser = function (session_UserId) {
        var _this = this;
        this._authService.getUserDetails(session_UserId).subscribe(function (data) {
            _this.loggedUser = data.data;
            _this.email = _this.loggedUser.email;
            _this.getTodo(_this.email);
        });
    };
    CategoryTodo.prototype.getTodo = function (email) {
        var _this = this;
        this._createTodoService.getTodos(email).subscribe(function (data) {
            var i = 0;
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var singleTodo = data_1[_i];
                if (singleTodo.status == true) {
                    if (singleTodo.category !== "none") {
                        _this.inCompleteTodos[i] = singleTodo;
                        var objDate = new Date(_this.inCompleteTodos[i].createdOn);
                        var month = objDate.getMonth();
                        _this.createdDate = objDate.getDate() + "-" + (month + 1) + "-" + objDate.getFullYear();
                        i++;
                    }
                }
                else if (singleTodo.status == false) {
                    if (singleTodo.category !== "none") {
                        _this.completedTodos[i] = singleTodo;
                        i++;
                    }
                }
            }
        });
    };
    CategoryTodo.prototype.remove = function (id) {
        var _this = this;
        this._createTodoService.removeTodo(id).subscribe(function (data) {
            _this.inCompleteTodos = [];
            _this.completedTodos = [];
            _this.getTodo(_this.email);
        });
    };
    CategoryTodo.prototype.changeBtn = function (id, todo) {
        this.catTodo = todo;
        this.todoId = id;
        this.update = false;
    };
    CategoryTodo.prototype.editTodo = function () {
        var _this = this;
        this._createTodoService.editTodo(this.todoId, this.catTodo).subscribe(function (data) {
            _this.inCompleteTodos = [];
            _this.completedTodos = [];
            _this.getTodo(_this.email);
        });
        this.update = true;
        this.catTodo = "";
    };
    CategoryTodo.prototype.onChange = function (newValue) {
        console.log(newValue);
        this.selectedValue = newValue;
    };
    CategoryTodo.prototype.addNewTodo = function () {
        var _this = this;
        if (this.selectedValue == "") {
            this.noneSelected = "Category is not selected.";
        }
        else {
            this.noneSelected = "";
            if (this.catTodo == undefined) {
                this.emptyTodo = "Todo can't be blank";
                this.catTodo = "";
            }
            else {
                if (this.catTodo.trim() == "") {
                    this.emptyTodo = "Todo can't be white spaces";
                    this.catTodo = "";
                }
                else {
                    this.emptyTodo = "";
                    this.catTodo = this.catTodo.trim();
                    this._createTodoService.addTodo(this.email, this.catTodo, this.selectedValue).subscribe(function (data) {
                        _this.catTodo = "";
                        if (data.result) {
                            _this.inCompleteTodos = [];
                            _this.completedTodos = [];
                            _this.getTodo(_this.email);
                        }
                    });
                }
            }
        }
    };
    CategoryTodo.prototype.todoDone = function (id) {
        var _this = this;
        this._createTodoService.todoDone(id).subscribe(function (data) {
            _this.inCompleteTodos = [];
            _this.completedTodos = [];
            _this.getTodo(_this.email);
        });
    };
    CategoryTodo.prototype.unDone = function (id) {
        var _this = this;
        this._createTodoService.unDone(id).subscribe(function (data) {
            _this.inCompleteTodos = [];
            _this.completedTodos = [];
            _this.getTodo(_this.email);
        });
    };
    CategoryTodo = __decorate([
        core_1.Component({
            templateUrl: "/app/views/cat-todo.html",
            providers: [create_todo_service_1.CreateTodoService, auth_service_1.AuthService, session_service_1.SessionService],
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [create_todo_service_1.CreateTodoService, session_service_1.SessionService, auth_service_1.AuthService, router_2.Router])
    ], CategoryTodo);
    return CategoryTodo;
}());
exports.CategoryTodo = CategoryTodo;
//# sourceMappingURL=category-todo.component.js.map