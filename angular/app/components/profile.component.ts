import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import {LoginService} from '../services/login.service';
import {JugueteService} from '../services/juguete.service'

// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'profile',
    templateUrl: 'app/view/profile.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService, JugueteService]
})

// Clase del componente donde irán los datos y funcionalidades
export class ProfileComponent implements OnInit
{
  public titulo = "Perfil";
  public identity;
  public errorMessage;
  public status;
  public juguetes;
  public loading;
  public pages;
  public pagePrev = 1;
  public pageNext = 1;
  public userProfile;

  constructor(
    private _loginService: LoginService,
    private _jugueteService: JugueteService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.loading = "show";
    this.identity = this._loginService.getIdentity();
    this.getProfile();
  }

  getProfile()
  {
    this._route.params.subscribe(params => {
      let user: any = params["user"];
      let page: any = +params["page"];

      if(!user) {
        user = this.identity.sub;
      }

      if(!page)
        page = 1;

      this.loading = "show";

      this._jugueteService.getProfile(user, page).subscribe(
        response => {
          if(response.status != "success") {
            this.status = "error";
            console.log(response.msg);
          }
          else {
            this.juguetes = response.data.juguete;
            this.userProfile.response.data.usuario;
            this.loading = "hide";

            console.log(response.data);

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
