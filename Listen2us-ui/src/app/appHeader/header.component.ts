import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[]
})
export class HeaderComponent implements OnInit {

  constructor(private nav: NavigationService) { }

  ngOnInit() {
  }

}
