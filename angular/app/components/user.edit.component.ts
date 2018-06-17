// Importar el núcleo de Angular
import {Component, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';
import {User} from '../model/user';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";

// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'user-edit',
    templateUrl: 'app/view/user.edit.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService]
})

// Clase del componente donde irán los datos y funcionalidades
export class UserEditComponent implements OnInit
{
  public titulo: string = "Actualizar mis datos";
  public user: User;
  public errorMessage;
  public status;
  public data;

  constructor(
    private _loginService: LoginService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit()
  {
    let identity = this._loginService.getIdentity();

    //console.log(identity == null);

    if(identity == null)
      this._router.navigate(["/index"]);
    else
      this.user = new User(identity.sub, identity.rol, identity.nombre, identity.apellidos, identity.nick, identity.email, identity.password, null);
  }

  onSubmit() {
    console.log(this.user);
    this._loginService.updateUser(this.user).subscribe(
      response =>
      {
        this.status = response.status;

        if(this.status != "success")
        {
          this.status = "error";
          this.data = response.msg;
        }

        //console.log(response);
      },
      error =>
      {
        this.errorMessage = <any>error;
        //console.log(this.errorMessage);

        if(this.errorMessage != null) {
          alert("Error en la petición!");
        }
      }
    );
  }
}
