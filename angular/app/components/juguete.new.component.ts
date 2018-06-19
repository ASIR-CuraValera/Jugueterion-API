import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {LoginService} from '../services/login.service';
import {UploadService} from '../services/upload.service';
import {User} from '../model/user';
import {Juguete} from '../model/juguete';

@Component({
  selector: "video-new",
  templateUrl: "app/view/juguete.new.html",
  directives: [ROUTER_DIRECTIVES],
  providers: [LoginService, UploadService]
})

export class JugueteNewComponent implements OnInit
{
  public titulo: string = "Crear un nuevo juguete";

  constructor(
    private _loginService: LoginService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit()
  {
    console.log("Component juguete.new.component cargado");
  }
}
