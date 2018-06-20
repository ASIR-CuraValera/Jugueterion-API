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
var router_1 = require("@angular/router");
var login_service_1 = require('../services/login.service');
var juguete_service_1 = require('../services/juguete.service');
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
var DefaultComponent //implements OnInit
 = (function () {
    function DefaultComponent //implements OnInit
        (_loginService, _jugueteService, _route, _router) {
        this._loginService = _loginService;
        this._jugueteService = _jugueteService;
        this._route = _route;
        this._router = _router;
        this.titulo = "Portada";
    }
    DefaultComponent //implements OnInit
    .prototype.ngOnInit = function () {
        this.identity = this._loginService.getIdentity();
        this.getAllJuguetes();
    };
    DefaultComponent //implements OnInit
    .prototype.getAllJuguetes = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var page = +params["page"];
            if (!page)
                page = 1;
            _this._jugueteService.getJuguetes(page).subscribe(function (response) {
                if (response.status != "success") {
                    _this.status = "error";
                    console.log(response.msg);
                }
                else
                    _this.juguetes = response.data;
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage._body);
                    alert("Error en la petición!");
                }
            });
        });
    };
    DefaultComponent //implements OnInit
     = __decorate([
        core_1.Component({
            selector: 'default',
            templateUrl: 'app/view/default.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [login_service_1.LoginService, juguete_service_1.JugueteService]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, juguete_service_1.JugueteService, router_1.ActivatedRoute, router_1.Router])
    ], DefaultComponent //implements OnInit
    );
    return DefaultComponent //implements OnInit
    ;
}());
exports.DefaultComponent //implements OnInit
 = DefaultComponent //implements OnInit
;
//# sourceMappingURL=default.component.js.map