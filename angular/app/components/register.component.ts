// Importar el núcleo de Angular
import {Component} from '@angular/core';
import {LoginService} from '../services/login.service';
import {User} from '../model/user';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";

// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'register',
    templateUrl: 'app/view/register.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService]
})

// Clase del componente donde irán los datos y funcionalidades
export class RegisterComponent implements OnInit
{
  public titulo: string = "Registro";
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
    this.user = new User(1, 0, "usuario", "", "", "", "", null);
  }

  onSubmit() {
    console.log(this.user);
    this._loginService.register(this.user).subscribe(
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
