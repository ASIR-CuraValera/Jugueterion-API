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
var router_1 = require("@angular/router");
var login_service_1 = require('../services/login.service');
var juguete_service_1 = require('../services/juguete.service');
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
var SearchComponent //implements OnInit
 = (function () {
    function SearchComponent //implements OnInit
        (_loginService, _jugueteService, _route, _router) {
        this._loginService = _loginService;
        this._jugueteService = _jugueteService;
        this._route = _route;
        this._router = _router;
        this.titulo = "Busqueda: ";
        this.pagePrev = 1;
        this.pageNext = 1;
    }
    SearchComponent //implements OnInit
    .prototype.ngOnInit = function () {
        this.loading = "show";
        this.identity = this._loginService.getIdentity();
        this.getSearchJuguetes();
    };
    SearchComponent //implements OnInit
    .prototype.getSearchJuguetes = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var search = params["search"];
            var page = +params["page"];
            if (!search || search.trim().length == 0) {
                search = null;
                _this._router.navigate(["/index"]);
            }
            if (!page)
                page = 1;
            _this.searchString = search;
            _this.loading = "show";
            _this._jugueteService.search(page, search).subscribe(function (response) {
                if (response.status != "success") {
                    _this.status = "error";
                    console.log(response.msg);
                }
                else {
                    _this.juguetes = response.data;
                    _this.loading = "hide";
                    _this.pages = [];
                    for (var i = 0; i < response.total_pages; ++i) {
                        _this.pages.push(i);
                    }
                    if (page >= 2) {
                        _this.pagePrev = page - 1;
                    }
                    else {
                        _this.pagePrev = page;
                    }
                    if (page < response.total_pages || page == 1) {
                        _this.pageNext = page + 1;
                    }
                    else {
                        _this.pageNext = page;
                    }
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
    SearchComponent //implements OnInit
     = __decorate([
        core_1.Component({
            selector: 'search',
            templateUrl: 'app/view/search.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [login_service_1.LoginService, juguete_service_1.JugueteService]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, juguete_service_1.JugueteService, router_1.ActivatedRoute, router_1.Router])
    ], SearchComponent //implements OnInit
    );
    return SearchComponent //implements OnInit
    ;
}());
exports.SearchComponent //implements OnInit
 = SearchComponent //implements OnInit
;
//# sourceMappingURL=search.component.js.map