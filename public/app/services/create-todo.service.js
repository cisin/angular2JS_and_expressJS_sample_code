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
var http_1 = require('@angular/http');
var CreateTodoService = (function () {
    function CreateTodoService(http) {
        this.http = http;
    }
    CreateTodoService.prototype.addTodo = function (email, todo, category) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = { email: email, todo: todo, status: true, createdOn: "", category: category };
        return this.http.post("/todos", body, headers).map(function (res) { return res.json(); });
    };
    CreateTodoService.prototype.removeTodo = function (id) {
        return this.http.delete("/todos/" + id);
    };
    CreateTodoService.prototype.getTodos = function (email) {
        return this.http.get("/todos/" + email).map(function (res) { return res.json(); });
    };
    CreateTodoService.prototype.todoDone = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = { id: id, status: true };
        return this.http.put("/todos", body, headers).map(function (res) { return res.json(); });
    };
    CreateTodoService.prototype.unDone = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = { id: id, status: false };
        return this.http.put("/todos", body, headers).map(function (res) { return res.json(); });
    };
    CreateTodoService.prototype.editTodo = function (id, todo) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = { id: id, todo: todo };
        return this.http.put("/editTodo", body, headers).map(function (res) { return res.json(); });
    };
    CreateTodoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CreateTodoService);
    return CreateTodoService;
}());
exports.CreateTodoService = CreateTodoService;
//# sourceMappingURL=create-todo.service.js.map