"use strict";
var User = (function () {
    function User(id, rol, nick, nombre, apellidos, email, password, image) {
        this.id = id;
        this.rol = rol;
        this.nick = nick;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.password = password;
        this.image = image;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map