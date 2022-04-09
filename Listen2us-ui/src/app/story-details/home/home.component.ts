import { Component, OnInit } from '@angular/core';
import {NavigationService} from './../../navigation.service'
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Authentication } from '../../authentication/authentication';
import { Subscription } from 'rxjs';
import { HomeService } from './home.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ HomeService]
})
export class HomeComponent implements OnInit {
  sub : Subscription;
  loggedinUser : Authentication;
  currentUser : Authentication;
  homeUser : any;
  name : string;
  age : string;
  dob : string;
  ward : string;
  street : string;
  email: string;
  gender : string;


  constructor(private navigation : NavigationService,private authentication : AuthenticationService,private homeservice : HomeService) {
              this.sub = this.authentication.get_currentUser().subscribe(
                data=> {
                  this.loggedinUser = data;
                }
              )      
              this.currentUser = JSON.parse(localStorage.getItem('currentUser'));            
  }

  ngOnInit() {
  this.navigation.show();
  this.getUserdetails();
  }

  getUserdetails() {
    this.homeservice.getById(this.currentUser.userName).pipe(first())
    .subscribe(res => { 
      this.homeUser = res;
      this.name = this.homeUser.firstName +" " + this.homeUser.lastName;
      this.age = this.homeUser.age;
      this.dob = this.homeUser.dob;
      this.ward = this.homeUser.wardNo;
      this.street = this.homeUser.street;
      this.email = this.homeUser.email;
      this.gender = this.homeUser.gender;
    });
}

}
