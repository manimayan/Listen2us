import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  visible: boolean;
  headertitle : boolean;

  constructor(private router: Router) { 
     this.visible = false; 
     this.headertitle = true; 
    }
    hide() { this.visible = false;this.headertitle = true;  }
    show() { this.visible = true; this.headertitle = false; }

    logout() {
      this.visible = false; 
      this.headertitle = true;                
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']); 
  }

  }
  


