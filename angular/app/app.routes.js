"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./components/login.component');
var register_component_1 = require('./components/register.component');
var user_edit_component_1 = require('./components/user.edit.component');
var juguete_new_component_1 = require('./components/juguete.new.component');
var juguete_edit_component_1 = require('./components/juguete.edit.component');
var juguete_detail_component_1 = require('./components/juguete.detail.component');
var default_component_1 = require('./components/default.component');
exports.routes = [
    {
        path: '',
        redirectTo: '/index',
        terminal: true
    },
    { path: 'index', component: default_component_1.DefaultComponent },
    { path: 'index/:page', component: default_component_1.DefaultComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'login/:id', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'user-edit', component: user_edit_component_1.UserEditComponent },
    { path: 'create-juguete', component: juguete_new_component_1.JugueteNewComponent },
    { path: 'edit-juguete/:id', component: juguete_edit_component_1.JugueteEditComponent },
    { path: 'juguete/:id', component: juguete_detail_component_1.JugueteDetailComponent }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map