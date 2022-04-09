import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Authentication } from '../authentication/authentication';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {}

  checkuser(user : Authentication) {
  return this.http.post<any>(`/users/registerCheck`, user)
      .pipe(map(user => {
        return user;
      }));
}

registeruser(user : Authentication) {
  return this.http.post<any>(`/users/register`, user)
      .pipe(map(user => {
        return status;
      }));
}


}
