// Importar el núcleo de Angular
import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import {LoginService} from '../services/login.service';
import {JugueteService} from '../services/juguete.service'

// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'default',
    templateUrl: 'app/view/default.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService, JugueteService]
})

// Clase del componente donde irán los datos y funcionalidades
export class DefaultComponent //implements OnInit
{
  public titulo = "Portada";
  public identity;
  public errorMessage;
  public status;
  public juguetes;
  public loading;
  public pages;
  public pagePrev = 1;
  public pageNext = 1;

  constructor(
    private _loginService: LoginService,
    private _jugueteService: JugueteService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.loading = "show";
    this.identity = this._loginService.getIdentity();
    this.getAllJuguetes();
  }

  getAllJuguetes()
  {
    this._route.params.subscribe(params => {
      let page = +params["page"];

      if(!page)
        page = 1;

      this.loading = "show";

      this._jugueteService.getJuguetes(page).subscribe(
        response => {
          if(response.status != "success") {
            this.status = "error";
            console.log(response.msg);
          }
          else {
            this.juguetes = response.data;
            this.loading = "hide";

            this.pages = [];
            for(let i = 0; i < response.total_pages; ++i) {
              this.pages.push(i);
            }

            if(page >=2) {
              this.pagePrev = page - 1;
            }
            else {
              this.pagePrev = page;
            }

            if(page < response.total_pages || page == 1) {
              this.pageNext = page + 1;
            }
            else {
              this.pageNext = page;
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
    });
  }
}
