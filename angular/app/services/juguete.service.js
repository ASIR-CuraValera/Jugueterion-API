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
require("rxjs/add/operator/map");
var JugueteService = (function () {
    function JugueteService(_http) {
        this._http = _http;
        this.url = "http://localhost/iaw/jugueterion-fs/symfony/web/app_dev.php";
    }
    JugueteService.prototype.create = function (token, juguete) {
        var json = JSON.stringify(juguete);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/juguete/new", params, { headers: headers })
            .map(function (res) {
            //console.log(res.json());
            return res.json();
        });
    };
    JugueteService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], JugueteService);
    return JugueteService;
}());
exports.JugueteService = JugueteService;
//# sourceMappingURL=juguete.service.js.map