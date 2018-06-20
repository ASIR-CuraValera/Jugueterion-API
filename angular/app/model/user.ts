export class User
{
  constructor(
    public id:number,
    public rol:number,
    public nick:string,
    public nombre:string,
    public apellidos:string,
    public email:string,
    public password:string,
    public image:string
  ) {}
}
