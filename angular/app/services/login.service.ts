import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService
{
  public url="http://localhost/iaw/jugueterion-fs/symfony/web/app_dev.php";
  public identity;
  public token;

  constructor(private _http: Http){}

  // Este nombre deberia llamarse singin
  singup(user_logged)
  {
    let json = JSON.stringify(user_logged);
    let params = "json="+json;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    return this._http.post(this.url+"/login", params, {headers: headers})
            .map(res => res.json());
  }

  getIdentity()
  {
    let identity = JSON.parse(localStorage.getItem('identity'));

    if(identity != "undefined")
      this.identity = identity;
    else
      this.identity = null;

    return this.identity;
  }

  getToken()
  {
    let token = localStorage.getItem('token');

    if(token != "undefined")
      this.token = token;
    else
      this.token = null;

    return this.token;
  }

  register(user_register)
  {
    let json = JSON.stringify(user_register);
    let params = "json="+json;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    return this._http.post(this.url+"/user/new", params, {headers: headers})
            .map(res => res.json());
  }

  updateUser(user_update)
  {
    let json = JSON.stringify(user_update);
    let params = "json="+json+"&authorization="+this.getToken();
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    return this._http.post(this.url+"/user/edit", params, {headers: headers})
            .map(res => res.json());
  }
}
