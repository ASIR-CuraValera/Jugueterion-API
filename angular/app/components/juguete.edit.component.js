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
var upload_service_1 = require('../services/upload.service');
var juguete_service_1 = require('../services/juguete.service');
var fabricantes_service_1 = require('../services/fabricantes.service');
var JugueteEditComponent = (function () {
    function JugueteEditComponent(_loginService, _uploadService, _jugueteService, _fabricantesService, _route, _router) {
        this._loginService = _loginService;
        this._uploadService = _uploadService;
        this._jugueteService = _jugueteService;
        this._fabricantesService = _fabricantesService;
        this._route = _route;
        this._router = _router;
        this.uploadedImage = false;
    }
    JugueteEditComponent.prototype.ngOnInit = function () {
        this.identity = this._loginService.getIdentity();
        if (this.identity == null) {
            this._router.navigate(["/index"]);
            return;
        }
        this.loading = 'show';
        this.getFabricantes();
        this.getJuguete();
        this.uploadedImage = "false";
    };
    JugueteEditComponent.prototype.callJugueteStatus = function (value) {
        if (this.juguete != null && value != null)
            this.juguete.estado = value;
    };
    JugueteEditComponent.prototype.onSubmit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var id = +params["id"];
            var token = _this._loginService.getToken();
            _this._jugueteService.update(token, _this.juguete, id).subscribe(function (response) {
                _this.status = response.status;
                if (_this.status != 'success') {
                    _this.status = 'error';
                    console.log(response.msg);
                }
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage._body);
                    alert("Error en la petición!");
                }
            });
        });
    };
    JugueteEditComponent.prototype.getJuguete = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var id = +params["id"];
            _this.loading = 'show';
            _this._jugueteService.getJuguete(id).subscribe(function (response) {
                _this.juguete = response.data;
                // Este arreglo no funciona
                //if(this.juguete != null)
                //  if(!(this.identity && this.identity != null && this.identity.sub == this.juguete.usuario.id))
                //    this._router.navigate(["/index"]);
                _this.status_get_juguete = response.status;
                _this.juguete_precio = _this.juguete.precio;
                _this.juguete_stock = _this.juguete.stock;
                if (_this.status_get_juguete != "success")
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
    JugueteEditComponent.prototype.getFabricantes = function () {
        var _this = this;
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
    JugueteEditComponent.prototype.setChangeUpload = function (value) {
        this.changeUpload = value;
    };
    JugueteEditComponent.prototype.fileChangeEvent = function (fileInput) {
        var _this = this;
        this.filesToUpload = fileInput.target.files;
        var token = this._loginService.getToken();
        var url = "http://localhost/iaw/jugueterion-fs/symfony/web/app_dev.php/juguete/upload-image/" + this.juguete.id;
        this._uploadService.makeFileRequest(token, url, ['image'], this.filesToUpload).then(function (result) {
            _this.resultUpload = result;
            _this.juguete.imagen = _this.resultUpload.filename;
            console.log(_this.juguete);
            _this.uploadedImage = "true";
        }, function (error) {
            console.log(error);
        });
    };
    JugueteEditComponent.prototype.returnIndex = function () {
        this._router.navigate(["/index"]);
    };
    JugueteEditComponent = __decorate([
        core_1.Component({
            selector: "juguete-edit",
            templateUrl: "app/view/juguete.edit.html",
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [login_service_1.LoginService, upload_service_1.UploadService, juguete_service_1.JugueteService, fabricantes_service_1.FabricantesService]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, upload_service_1.UploadService, juguete_service_1.JugueteService, fabricantes_service_1.FabricantesService, router_1.ActivatedRoute, router_1.Router])
    ], JugueteEditComponent);
    return JugueteEditComponent;
}());
exports.JugueteEditComponent = JugueteEditComponent;
//# sourceMappingURL=juguete.edit.component.js.map