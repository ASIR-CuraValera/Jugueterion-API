export class Juguete
{
  constructor(
    public id: number,
    public titulo: string,
    public descripcion: string,
    public estado: string,
    public imagen: string,
    public precio: number,
    public stock: number,
    public creadoEn,
    public actualizadoEn
  ) {}
}
