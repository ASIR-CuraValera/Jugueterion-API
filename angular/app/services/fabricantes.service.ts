import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FabricantesService
{
  public url="http://localhost/iaw/jugueterion-fs/symfony/web/app_dev.php";

  constructor(private _http: Http){}

  get()
  {
    return this._http.get(this.url+"/fabricantes/get").map(res => res.json());
  }
}
