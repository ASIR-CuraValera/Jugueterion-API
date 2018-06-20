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
var juguete_1 = require('../model/juguete');
var login_service_1 = require('../services/login.service');
var upload_service_1 = require('../services/upload.service');
var juguete_service_1 = require('../services/juguete.service');
var fabricantes_service_1 = require('../services/fabricantes.service');
var JugueteNewComponent = (function () {
    function JugueteNewComponent(_loginService, _uploadService, _jugueteService, _fabricantesService, _route, _router) {
        this._loginService = _loginService;
        this._uploadService = _uploadService;
        this._jugueteService = _jugueteService;
        this._fabricantesService = _fabricantesService;
        this._route = _route;
        this._router = _router;
        this.titulo = "Crear un nuevo juguete";
    }
    JugueteNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.juguete = new juguete_1.Juguete(1, 1, "", "", "nuevo", "", 0, 0, "", "");
        this._fabricantesService.get().subscribe(function (response) {
            _this.fabricantes = response.data;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage._body);
                alert("Error en la petición!");
            }
        });
    };
    JugueteNewComponent.prototype.callJugueteStatus = function (value) {
        if (this.juguete != null && value != null)
            this.juguete.estado = value;
    };
    JugueteNewComponent.prototype.onSubmit = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._jugueteService.create(token, this.juguete).subscribe(function (response) {
            _this.status = response.status;
            if (_this.status != 'success') {
                _this.status = 'error';
                console.log(response.msg);
            }
            else {
                _this.juguete = response.data;
            }
            //console.log("data: "+response.data);
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage._body);
                alert("Error en la petición!");
            }
        });
    };
    JugueteNewComponent = __decorate([
        core_1.Component({
            selector: "video-new",
            templateUrl: "app/view/juguete.new.html",
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [login_service_1.LoginService, upload_service_1.UploadService, juguete_service_1.JugueteService, fabricantes_service_1.FabricantesService]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, upload_service_1.UploadService, juguete_service_1.JugueteService, fabricantes_service_1.FabricantesService, router_1.ActivatedRoute, router_1.Router])
    ], JugueteNewComponent);
    return JugueteNewComponent;
}());
exports.JugueteNewComponent = JugueteNewComponent;
//# sourceMappingURL=juguete.new.component.js.map