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
var login_service_1 = require('../services/login.service');
var juguete_service_1 = require('../services/juguete.service');
var fabricantes_service_1 = require('../services/fabricantes.service');
var generate_date_pipe_1 = require('../pipes/generate.date.pipe');
var JugueteDetailComponent = (function () {
    function JugueteDetailComponent(_loginService, _jugueteService, _fabricantesService, _route, _router) {
        this._loginService = _loginService;
        this._jugueteService = _jugueteService;
        this._fabricantesService = _fabricantesService;
        this._route = _route;
        this._router = _router;
        this.loading = 'show';
    }
    JugueteDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var id = +params["id"];
            _this._jugueteService.getJuguete(id).subscribe(function (response) {
                _this.juguete = response.data;
                _this.status = response.status;
                if (_this.status != "success")
                    _this._router.navigate(["/index"]);
                _this.loading = 'hide';
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage._body);
                    alert("Error en la petición!");
                }
            });
        });
    };
    JugueteDetailComponent = __decorate([
        core_1.Component({
            selector: "video-detail",
            templateUrl: "app/view/juguete.detail.html",
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [login_service_1.LoginService, juguete_service_1.JugueteService, fabricantes_service_1.FabricantesService],
            pipes: [generate_date_pipe_1.GenerateDatePipe]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, juguete_service_1.JugueteService, fabricantes_service_1.FabricantesService, router_1.ActivatedRoute, router_1.Router])
    ], JugueteDetailComponent);
    return JugueteDetailComponent;
}());
exports.JugueteDetailComponent = JugueteDetailComponent;
//# sourceMappingURL=juguete.detail.component.js.map