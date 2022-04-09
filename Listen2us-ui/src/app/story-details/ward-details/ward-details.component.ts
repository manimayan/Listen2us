import { Component, OnInit } from '@angular/core';
import {NavigationService} from './../../navigation.service'

@Component({
  selector: 'app-ward-details',
  templateUrl: './ward-details.component.html',
  styleUrls: ['./ward-details.component.css']
})
export class WardDetailsComponent implements OnInit {

  constructor(private navigation : NavigationService,) { }

  ngOnInit() {
    this.navigation.show();
  }

}
