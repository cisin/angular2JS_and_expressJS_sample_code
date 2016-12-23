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
var CreateUser_1 = require('../CreateUser');
var auth_service_1 = require('../services/auth.service');
var router_2 = require('@angular/router');
var session_service_1 = require('../services/session.service');
var LoginComponent = (function () {
    function LoginComponent(_authService, router, _sessionService) {
        this._authService = _authService;
        this.router = router;
        this._sessionService = _sessionService;
        this.loginData = new CreateUser_1.Login();
        this.response = [];
    }
    LoginComponent.prototype.ngOnInit = function () {
        this._sessionService.getUserId();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (this.loginData.email != "") {
            this.loginResponse = "";
            if (this.loginData.password != "") {
                this.loginResponse = "";
                this._authService.doLogin(this.loginData).subscribe(function (data) {
                    _this.response = data;
                    if (!_this.response.result) {
                        _this.loginResponse = _this.response.message;
                    }
                    else {
                        if (_this.session_UserId == 123) {
                            _this.router.navigate(['/404']);
                        }
                        else {
                            _this._sessionService.saveUserId(_this.response.data);
                            _this.router.navigate(['/new-todo']);
                        }
                    }
                });
            }
            else {
                this.loginResponse = "password can't empty";
            }
        }
        else {
            this.loginResponse = "email can't empty";
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/views/login.form.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [auth_service_1.AuthService, session_service_1.SessionService]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_2.Router, session_service_1.SessionService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map