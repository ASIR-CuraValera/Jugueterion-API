import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { Juguete } from '../model/juguete';

@Injectable()
export class JugueteService
{
  public url="http://localhost/iaw/jugueterion-fs/symfony/web/app_dev.php";
  public identity;
  public token;

  constructor(private _http: Http){}

  create(token, juguete: Juguete)
  {
    let json = JSON.stringify(juguete);
    let params = "json="+json+"&authorization="+token;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    return this._http.post(this.url+"/juguete/new", params, {headers: headers})
                    .map(res => res.json());
  }

  update(token, juguete: Juguete, id)
  {
    let json = JSON.stringify(juguete);
    let params = "json="+json+"&authorization="+token;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    return this._http.post(this.url+"/juguete/edit/"+id, params, {headers: headers})
                    .map(res => res.json());
  }

  getJuguete(id)
  {
    return this._http.get(this.url+"/juguete/detail/"+id).map(res => res.json());
  }

  getLastJuguetes()
  {
    return this._http.get(this.url+"/juguete/last").map(res => res.json());
  }

  getJuguetes(page) {
    if(page == null)
      page = 1;

      return this._http.get(this.url+"/juguete/list?page="+page).map(res => res.json());
  }

  search(search = null, page = null) {
    if(page == null)
      page = 1;

      let http: any;
      if(search == null)
        http = this._http.get(this.url+"/juguete/search").map(res => res.json());
      else
        http = this._http.get(this.url+"/juguete/search/"+search+"?page="+page).map(res => res.json());

      return http;
  }

  getProfile(user, page = null) {
    if(page == null)
      page = 1;

    return this._http.get(this.url+"/user/profile/"+user+"?page="+page).map(res => res.json());
  }
}
