import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationService } from './../navigation.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from "rxjs";
import { Router } from '@angular/router';
import { Authentication } from './authentication';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,private navigation : NavigationService, private router : Router) { }

    login(user : Authentication) {
        return this.http.post<any>(`/users/authenticate`, { username: user.userName, password: user.password, usertype: user.userType })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                   localStorage.setItem('currentUser', JSON.stringify(user));
                    alert("Current user  " + localStorage.getItem('currentUser'));
                }
                return user;
            }));
    }

    public currentUser = new BehaviorSubject<Authentication>(null);

    set_currentUser(value : Authentication){
        this.currentUser.next(value);
    }
    
    get_currentUser(){
      return  this.currentUser.asObservable();
    }
}