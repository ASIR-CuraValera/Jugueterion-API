// Importar el núcleo de Angular
import {Component} from '@angular/core';
import {LoginService} from '../services/login.service';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";

// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'login',
    templateUrl: 'app/view/login.html',
    providers: [LoginService]
})

// Clase del componente donde irán los datos y funcionalidades
export class LoginComponent implements OnInit
{
  public titulo: string = "Identificate";
  public user;
  public errorMessage;
  public identity;
  public token;

  constructor(
    private _loginService: LoginService,
    private  _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit()
  {
    this._route.params.subscribe(params => {
      let logout = +params["id"];
      if(logout == 1)
      {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        //this._router.navigate(["/index"]);
        window.location.href = "/login";
      }
    });

    //alert(this._loginService.singup());
    this.user =
    {
      "email": "",
      "password": "",
      "getHash": false
    }

    let identity = this._loginService.getIdentity();
    /*let tk = this._loginService.getToken();

    console.log(ide);
    console.log(tk);*/

    if(identity != null && identity.sub != null)
      this._router.navigate(["/index"]);
  }

  onSubmit()
  {
    console.log(this.user);
    this._loginService.singup(this.user).subscribe(
      response => {
        let identity = response;
        this.identity = identity;

        console.log(response);

        if(this.identity.length <= 1)
        {
          alert("[Identity] Error en el servidor al loguear!");
        }
        else
        {
          if(!this.identity.status)
          {
            localStorage.setItem('identity', JSON.stringify(identity));

            this.user.getHash = true;

            this._loginService.singup(this.user).subscribe(
              response => {
                let token = response;
                this.token = token;

                if(this.token.length <= 1)
                {
                  alert("[Token] Error en el servidor al loguear!");
                }
                else
                {
                  if(!this.token.status)
                  {
                    localStorage.setItem('token', token);

                    window.location.href = "/";
                  }
                }
              },
              error => {
                this.errorMessage = <any>error;

                if(this.errorMessage != null) {
                  console.log(this.errorMessage._body);
                  alert("Error en la petición!");
                }
              });
            }
          }
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null) {
          console.log(this.errorMessage._body);
          alert("Error en la petición!");
        }
      }
    );
  }
}
