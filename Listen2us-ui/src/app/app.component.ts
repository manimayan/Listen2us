import { Component } from '@angular/core';
import { Subscription } from "rxjs";
import { NavigationService } from './navigation.service';
import { AuthenticationService } from './authentication/authentication.service';
import { Authentication } from './authentication/authentication';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[NavigationService]
})
export class AppComponent {
  title = 'app';
  show : boolean = true;
  sub : Subscription;
  loggedinUser : Authentication;
  constructor(private authentication : AuthenticationService) {
    this.sub = this.authentication.get_currentUser().subscribe(
       value => { 
                this.loggedinUser = value;
                this.show = true;
                });
   }
  
  
  ngOnInit(){
    this.show = true;
  }
 

}
