import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {Juguete} from '../model/juguete';
import {LoginService} from '../services/login.service';
import {UploadService} from '../services/upload.service';
import {JugueteService} from '../services/juguete.service';
import {FabricantesService} from '../services/fabricantes.service'
import {User} from '../model/user';

@Component({
  selector: "video-new",
  templateUrl: "app/view/juguete.new.html",
  directives: [ROUTER_DIRECTIVES],
  providers: [LoginService, UploadService, JugueteService, FabricantesService]
})

export class JugueteNewComponent implements OnInit
{
  public titulo: string = "Crear un nuevo juguete";
  public juguete: Juguete;
  public fabricantes;
  public status;
  public errorMessage;
  public uploadedImage;

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
    this.juguete = new Juguete(1, 1, "", "", "nuevo", "", 0, 0, "", "");
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

  callJugueteStatus(value)
  {
    if(this.juguete != null && value != null)
      this.juguete.estado = value;
  }

  onSubmit()
  {
      let token = this._loginService.getToken();
      this._jugueteService.create(token, this.juguete).subscribe(
        response => {
            this.status = response.status;
            if(this.status != 'success')
            {
              this.status = 'error';
              console.log(response.msg);
            }
            else
            {
              this.juguete = response.data;
            }

            //console.log("data: "+response.data);
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
