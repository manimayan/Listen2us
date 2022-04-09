import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import {MessageService,ConfirmationService} from 'primeng/api';
import {NavigationService} from './../../navigation.service'
import { City } from './City';
import * as moment from 'moment';

@Component({
  selector: 'app-reg-complaints',
  templateUrl: './reg-complaints.component.html',
  styleUrls: ['./reg-complaints.component.css'],
  providers: [NgxSpinnerService,MessageService,ConfirmationService]
}
)
export class RegComplaintsComponent implements OnInit {
  
  ComplaintForm:FormGroup;
  Categories: City[];
  Streets : City[];
  Wards : City[];
  selectedCategory: City;
  selectedStreet: City;
  selectedWard: City;
  problemDate : string;
  now = moment();
  

  constructor(private navigation : NavigationService,private formbuild: FormBuilder,private confirmationService: ConfirmationService,private messageService: MessageService, private spinner: NgxSpinnerService) { 
    this.Categories = [
      {name: 'Water', code: 'wa'},
      {name: 'Road', code: 'ro'},
      {name: 'Electricity', code: 'ele'},
      {name: 'Waste Management', code: 'wm'},
      {name: 'Others', code: 'others'}
  ];
    this.Streets = [
    {name: 'Big Street', code: 'bs'},
    {name: 'School Street', code: 'ss'},
    {name: 'Chavadi Street', code: 'cs'}, 
    {name: 'Madam Street', code: 'ms'},
  ];
    this.Wards = [
    {name: '17th Ward', code: '17'},

  ];
}
 
  ngOnInit() {
    this.navigation.show();
    this.ComplaintForm = this.formbuild.group({
      problemtitle : ['',Validators.required],
      problemcategory : ['',Validators.required],
      problemDates :['',Validators.required],
      activestreet: ['',Validators.required],
      activeward : ['',Validators.required],
      reasons : ['',Validators.required],
      comments : [''],
    });
  }
  
  onSubmit(value : string) {
  this.problemDate =  this.now.format('MMMM Do YYYY');
  this.spinner.show();
  setTimeout(() => {
    /** spinner ends after 3 seconds */
    this.spinner.hide();

    this.confirmationService.confirm({
      message: '',
      accept: () => {
      }
  });
  this.messageService.add({severity:'success', summary: 'Posted', detail:'Complaint Submitted'});
  }, 3000);
  
 }

}