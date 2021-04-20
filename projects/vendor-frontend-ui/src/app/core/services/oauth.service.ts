import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs-compat/Observable";

@Injectable()
export class OAuthService {

  oAuthApi: string;
  apiMethod: string;
  payload : any;

  constructor(private _http : HttpClient){
    this.oAuthApi = 'https://dev-auth-api.azurewebsites.net/auth/login';
    this.apiMethod = 'POST';
    this.payload = {
      "user": {
          "email": "camill.reid@serrala.com",
          "password": "Serrala1!"
      }
    };
  }

  public getToken() : Observable<{token:string}> {
     return this._http.post<{token:string}>(this.oAuthApi, this.payload);
  }
}
