"use strict";
var Juguete = (function () {
    function Juguete(id, fab_id, titulo, descripcion, estado, imagen, precio, stock, creadoEn, actualizadoEn) {
        this.id = id;
        this.fab_id = fab_id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
        this.imagen = imagen;
        this.precio = precio;
        this.stock = stock;
        this.creadoEn = creadoEn;
        this.actualizadoEn = actualizadoEn;
    }
    return Juguete;
}());
exports.Juguete = Juguete;
//# sourceMappingURL=juguete.js.map