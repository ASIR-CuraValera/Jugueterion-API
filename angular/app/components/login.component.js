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
// Importar el núcleo de Angular
var core_1 = require('@angular/core');
var login_service_1 = require('../services/login.service');
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
var LoginComponent = (function () {
    function LoginComponent(_loginService) {
        this._loginService = _loginService;
        this.titulo = "Identificate";
    }
    LoginComponent.prototype.ngOnInit = function () {
        //alert(this._loginService.singup());
        this.user =
            {
                "email": "",
                "password": "",
                "getHash": false
            };
        var ide = localStorage.getItem('identity');
        var tk = localStorage.getItem('token');
        console.log(ide);
        console.log(tk);
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.user);
        this._loginService.singup(this.user).subscribe(function (response) {
            var identity = response;
            _this.identity = identity;
            console.log(response);
            if (_this.identity.length <= 1) {
                alert("[Identity] Error en el servidor al loguear!");
            }
            else {
                if (!_this.identity.status) {
                    localStorage.setItem('identity', JSON.stringify(identity));
                    _this.user.getHash = true;
                    _this._loginService.singup(_this.user).subscribe(function (response) {
                        var token = response;
                        _this.token = token;
                        if (_this.token.length <= 1) {
                            alert("[Token] Error en el servidor al loguear!");
                        }
                        else {
                            if (!_this.token.status) {
                                localStorage.setItem('token', token);
                            }
                        }
                    }, function (error) {
                        _this.errorMessage = error;
                        if (_this.errorMessage != null) {
                            console.log(_this.errorMessage._body);
                            alert("Error en la petición!");
                        }
                    });
                }
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage._body);
                alert("Error en la petición!");
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'app/view/login.html',
            providers: [login_service_1.LoginService]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map