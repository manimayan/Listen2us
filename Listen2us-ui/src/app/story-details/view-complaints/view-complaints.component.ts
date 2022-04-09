import { Component, OnInit } from '@angular/core';
import {NavigationService} from './../../navigation.service'

@Component({
  selector: 'app-view-complaints',
  templateUrl: './view-complaints.component.html',
  styleUrls: ['./view-complaints.component.css']
})
export class ViewComplaintsComponent implements OnInit {

  constructor(private navigation : NavigationService,) { }

  ngOnInit() {
    this.navigation.show();
  }

}
