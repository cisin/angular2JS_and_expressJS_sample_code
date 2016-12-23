"use strict";
var Login = (function () {
    function Login(email, password) {
        if (email === void 0) { email = ""; }
        if (password === void 0) { password = ""; }
        this.email = email;
        this.password = password;
    }
    return Login;
}());
exports.Login = Login;
var Register = (function () {
    function Register(name, email, password) {
        if (name === void 0) { name = ""; }
        if (email === void 0) { email = ""; }
        if (password === void 0) { password = ""; }
        this.name = name;
        this.email = email;
        this.password = password;
    }
    return Register;
}());
exports.Register = Register;
//# sourceMappingURL=CreateUser.js.map