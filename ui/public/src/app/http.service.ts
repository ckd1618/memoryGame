import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }
  register(userObj){
    return this._http.post('http://localhost:8000/api/users', userObj);
  }
  loginUser(userObj){
    return this._http.post('http://localhost:8000/api/login', userObj);
  }
  getCurrentUser() {
    return this._http.get('http://localhost:8000/api/current_user');
  }
  sendLoadout(data){
    return this._http.post('http://localhost:8000/api/sendLoadout', data);
  }
  sendProjectData(mydata){
    return this._http.post('http://localhost:8000/api/sendProjectData', mydata);
  }
  mongoUserNotesi(){
    return this._http.get('http://localhost:8000/api/mongoUserNotesi');
  }
}
