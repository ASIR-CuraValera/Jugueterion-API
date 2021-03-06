import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import {LoginService} from '../services/login.service';
import {JugueteService} from '../services/juguete.service'

// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'search',
    templateUrl: 'app/view/search.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService, JugueteService]
})

// Clase del componente donde irán los datos y funcionalidades
export class SearchComponent implements OnInit
{
  public titulo = "Busqueda: ";
  public searchString;
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
    this.getSearchJuguetes();
  }

  getSearchJuguetes()
  {
    this._route.params.subscribe(params => {
      let search: any = params["search"];
      let page: any = +params["page"];

      if(!search || search.trim().length == 0) {
        search = null;
        this._router.navigate(["/index"]);
      }

      if(!page)
        page = 1;

      this.searchString = search;
      this.loading = "show";

      this._jugueteService.search(page, search).subscribe(
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
