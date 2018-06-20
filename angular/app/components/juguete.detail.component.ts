import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {Juguete} from '../model/juguete';
import {LoginService} from '../services/login.service';
import {JugueteService} from '../services/juguete.service';
import {FabricantesService} from '../services/fabricantes.service'
import {User} from '../model/user';
import {GenerateDatePipe} from '../pipes/generate.date.pipe';
import {CommentsComponent} from './comments.component';

@Component({
  selector: "video-detail",
  templateUrl: "app/view/juguete.detail.html",
  directives: [ROUTER_DIRECTIVES, CommentsComponent],
  providers: [LoginService, JugueteService, FabricantesService],
  pipes: [GenerateDatePipe]
})

export class JugueteDetailComponent implements OnInit
{
  public errorMessage;
  public juguete;
  public status;
  public loading = 'show';
  public lastJuguetes;
  public statusLastJuguetes;
  public identity;

  constructor(
    private _loginService: LoginService,
    private _jugueteService: JugueteService,
    private _fabricantesService: FabricantesService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit()
  {
    this.identity = this._loginService.getIdentity();
    this._route.params.subscribe(
      params => {
        this.loading = 'show';
        let id = +params["id"];

        this._jugueteService.getJuguete(id).subscribe(
          response => {
            this.juguete = response.data;
            this.status = response.status;

            if(this.status != "success")
              this._router.navigate(["/index"]);

              this.loading = 'hide';
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
    );

    this._jugueteService.getLastJuguetes().subscribe(
      response => {
        this.lastJuguetes = response.data;
        this.statusLastJuguetes = response.status;

        if(this.statusLastJuguetes != 'success')
          this._router.navigate(["/index"]);
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
