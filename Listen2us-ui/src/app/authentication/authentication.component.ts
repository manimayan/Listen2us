import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup} from '@angular/forms';
import {MessageService} from 'primeng/api';

import { NavigationService } from '../navigation.service';
import {AuthenticationService} from './authentication.service';
import { first } from 'rxjs/operators';
import * as $ from 'jquery';
import { Router,ActivatedRoute } from '@angular/router';
import { Authentication } from './authentication';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  providers:[NavigationService,MessageService]
})
export class AuthenticationComponent implements OnInit {
  property1 : any;
  property :any;
  display: boolean = false;
  returnUrl: string;
  loginuserForm : FormGroup;
  loginconForm : FormGroup;
  loggedinUser : Authentication;

  constructor(private formbuild: FormBuilder, private navigation : NavigationService,private router: Router,
              private authenticationservice : AuthenticationService,private route: ActivatedRoute, private messageservice :MessageService) {}
   
  ngOnInit() {
    this.navigation.hide();
    this.loginuserForm = this.formbuild.group({ 
      userName :['',Validators.required],
      password : ['',Validators.required],
      userType : ['']
    });

    this.loginconForm = this.formbuild.group({
      userName : ['',Validators.required],
      password :['',Validators.required],
      userType : ['']
    });
   
    // reset login status
    this.navigation.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    var header = document.getElementById("tabs");
    var btns = header.getElementsByClassName("nav-style");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
    document.getElementById('login-nav-user').onclick = function() {
    var x = document.getElementById('login-user');
    x.style.display = 'block';
    var x = document.getElementById('login-councillor');
    x.style.display = 'none';
    };

    document.getElementById('login-nav-councillor').onclick = function() {
    var x = document.getElementById('login-user');
    x.style.display = 'none';
    var x = document.getElementById('login-councillor');
    x.style.display = 'block';
    };

    $(document).ready(function () {
    document.getElementById("login-nav-user").click();
    });

}

onSubmit() {
  if (this.loginuserForm.valid) {
    this.loginuserForm.controls['userType'].setValue('user');
    this.authenticationservice.login(this.loginuserForm.value).subscribe(
        data => {
          this.loggedinUser = data;
          this.authenticationservice.set_currentUser(this.loggedinUser);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.messageservice.add({severity:'warn', summary: '', detail:'Provide the correct details'});
        });
  }  

  if (this.loginconForm.valid) {
    this.loginconForm.controls['userType'].setValue('councillor');
    this.authenticationservice.login(this.loginconForm.value)
    .pipe(first())
    .subscribe(
        data => {
          this.loggedinUser = data;
          this.authenticationservice.set_currentUser(this.loggedinUser);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.messageservice.add({severity:'warn', summary: '', detail:'Provide the correct details'});
        });
  }   
}

showDialog() {
  this.display = true;
}

}
