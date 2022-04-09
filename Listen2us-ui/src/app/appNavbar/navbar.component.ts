import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { NavigationService } from './../navigation.service';
import { AuthenticationService } from './../authentication/authentication.service';


import * as $ from 'jquery';
import { Authentication } from '../authentication/authentication';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[]
})
export class NavbarComponent implements OnInit {
sub : Subscription;
loggedinUser : Authentication;
currentUser : Authentication;
firstName : string;
lastName : string;
  constructor(private nav: NavigationService,private authentication : AuthenticationService) {
   this.sub = this.authentication.get_currentUser().subscribe(
      value => { 
                this.loggedinUser = value;
               });//behaviour subject
               this.currentUser = JSON.parse(localStorage.getItem('currentUser'));//local storage
  }

  ngOnInit()
  {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
  });
  this.getNavbarName(); 
}

onLogout(){
  this.nav.logout();                   
}

getNavbarName()
{
  this.firstName = this.currentUser.firstName;
  this.lastName = this.currentUser.lastName;
}



} 
 

