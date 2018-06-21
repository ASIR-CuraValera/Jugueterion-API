import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {Juguete} from '../model/juguete';
import {LoginService} from '../services/login.service';
import {UploadService} from '../services/upload.service';
import {JugueteService} from '../services/juguete.service';
import {FabricantesService} from '../services/fabricantes.service'
import {User} from '../model/user';

@Component({
  selector: "juguete-edit",
  templateUrl: "app/view/juguete.edit.html",
  directives: [ROUTER_DIRECTIVES],
  providers: [LoginService, UploadService, JugueteService, FabricantesService]
})

export class JugueteEditComponent implements OnInit
{
  //public titulo: string = "Editar juguete";
  public juguete: Juguete;
  public fabricantes;
  public status;
  public status_get_juguete;
  public errorMessage;
  public uploadedImage;
  public identity;
  public juguete_precio;
  public juguete_stock;
  public changeUpload;

  constructor(
    private _loginService: LoginService,
    private _uploadService: UploadService,
    private _jugueteService: JugueteService,
    private _fabricantesService: FabricantesService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.uploadedImage = false;
  }

  ngOnInit()
  {
    //this.juguete = new Juguete(1, 1, "", "", "nuevo", "", 0, 0, "", "");
    this.getFabricantes();
    this.getJuguete();
  }

  callJugueteStatus(value)
  {
    if(this.juguete != null && value != null)
      this.juguete.estado = value;
  }

  onSubmit()
  {
    this._route.params.subscribe(
        params => {
          let id = +params["id"];

          let token = this._loginService.getToken();
          this._jugueteService.update(token, this.juguete, id).subscribe(
            response => {
                this.status = response.status;

                if(this.status != 'success')
                {
                  this.status = 'error';
                  console.log(response.msg);
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
    );
  }

  getJuguete() {
    this.identity = this._loginService.getIdentity();

    this._route.params.subscribe(
      params => {
        let id = +params["id"];

        this._jugueteService.getJuguete(id).subscribe(
          response => {
            this.juguete = response.data;
            this.status_get_juguete = response.status;
            this.juguete_precio = this.juguete.precio;
            this.juguete_stock = this.juguete.stock;

            if(this.status_get_juguete != "success")
              this._router.navigate(["/index"]);

            //console.log(this.juguete);
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
  }

  getFabricantes() {
    this._fabricantesService.get().subscribe(
      response => {
        this.fabricantes = response.data;
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

  setChangeUpload(value) {
    this.changeUpload = value;
  }

  public filesToUpload: Array<File>;
  public resultUpload;

  fileChangeEvent(fileInput: any)
  {
    this.filesToUpload = <Array<File>>fileInput.target.files;

    let token = this._loginService.getToken();
    let url = "http://localhost/iaw/jugueterion-fs/symfony/web/app_dev.php/juguete/upload-image/"+this.juguete.id;
    this._uploadService.makeFileRequest(token, url, ['image'], this.filesToUpload).then(
      (result) => {
        this.resultUpload = result;
        this.juguete.imagen = this.resultUpload.filename;
        console.log(this.juguete);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
