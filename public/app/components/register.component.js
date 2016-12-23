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
var CreateUser_1 = require('../CreateUser');
var router_1 = require('@angular/router');
var auth_service_1 = require('../services/auth.service');
var RegisterComponent = (function () {
    function RegisterComponent(_authService) {
        this._authService = _authService;
        this.registerData = new CreateUser_1.Register();
        this.response = [];
    }
    RegisterComponent.prototype.register = function () {
        var _this = this;
        if (this.registerData.name != "") {
            if (this.registerData.email != "") {
                if (this.registerData.password != "") {
                    this._authService.doRegister(this.registerData).subscribe(function (data) {
                        _this.response = data;
                        if (!_this.response.result) {
                            _this.message = _this.response.message;
                        }
                        else {
                            _this.message = "Welcome to Any todo App, please login to experience awesomeness !";
                        }
                    });
                }
                else {
                    this.message = "password can't be empty";
                }
            }
            else {
                this.message = "email can't be empty";
            }
        }
        else {
            this.message = "name can't be empty";
        }
    };
    RegisterComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/views/register.form.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [auth_service_1.AuthService]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map