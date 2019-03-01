import { Injectable } from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AngformService {

  constructor(private http: HttpClient) { }

  postConfigDetails (data) {
    let serverUrl = environment.serverUrl+'/saveConfiguration';
    //console.log("server url:"+serverUrl);
    return this.http.post(serverUrl, data);
  }
}
