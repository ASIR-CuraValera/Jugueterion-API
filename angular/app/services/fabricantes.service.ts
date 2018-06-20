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
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    return this._http.get(this.url+"/fabricantes/get", {headers: headers})
                    .map(res => res.json());
  }
}
