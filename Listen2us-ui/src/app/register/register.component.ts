import { Component, OnInit } from '@angular/core';
import {MessageService,MenuItem} from 'primeng/api';
import { City } from './City';
import { FormBuilder,Validators,FormGroup} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import {RegisterService} from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService,NgxSpinnerService]
})
export class RegisterComponent implements OnInit {
  items: MenuItem[];
  submittedReg : boolean = false;
  submittedUsrdet : boolean = false;
  newUser : string;
  activeIndex: number = 0;
  primary : boolean = true;
  secondary :  boolean;
  spinnerFlag : boolean;
  dob : string;
  gender: City[];
  streets : City[];
  wardNos : City[];
  selectedGender : City;
  selectedStreet : City;
  selectedWard : City;
  primarydetailsForm : FormGroup;
  secondarydetailsForm : FormGroup;

  constructor(private formbuild: FormBuilder,private messageService: MessageService,private service : RegisterService, private spinner: NgxSpinnerService,private router: Router) { 
    this.gender = [
      {name: 'Male', code: 'ma'},
      {name: 'Female', code: 'fe'},
      {name: 'Transgender', code: 'tr'},
  ];
    this.streets = [
    {name: 'Big Street', code: 'bs'},
    {name: 'School Street', code: 'ss'},
    {name: 'Chavadi Street', code: 'cs'}, 
    {name: 'Madam Street', code: 'ms'},
  ];
    this.wardNos = [
    {name: '17th Ward', code: '17'},
  ];
  }

  ngOnInit()  { 

    this.primarydetailsForm = this.formbuild.group({ 
      userName :['',[Validators.required,Validators.minLength(4),Validators.pattern('^[a-zA-Z0-9]*')]],
      password : ['',[Validators.required,Validators.minLength(6)]],
      confirmPassword : ['',[Validators.required]]
    });

    this.secondarydetailsForm = this.formbuild.group({ 
      userName : [''],
      password : [''],
      firstName :['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      lastName : ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      email : ['',[Validators.required,Validators.email]],
      dob : ['',Validators.required],
      gender : ['',Validators.required],
      street : ['',Validators.required],
      wardNo : ['',Validators.required],
      userType : ['']
    });

    this.items = [{
                label: 'Primary Details',
                command: (event: any) => {
                    this.activeIndex = 0;
                    this.primary = true; this.secondary = false;
                    this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label});
                }
            },
            {
                label: 'Secondary Details',
                command: (event: any) => {
                    this.activeIndex = 1;
                    this.messageService.add({severity:'info', summary:'Seat Selection', detail: event.item.label});
                }
            },

        ];
    }
    get getreg() { return this.primarydetailsForm.controls; }
    get getusrdet() { return this.secondarydetailsForm.controls;}
    onSubmitReg() {
      this.submittedReg = true;
      if (this.primarydetailsForm.valid) {
        if(this.primarydetailsForm.value.password === this.primarydetailsForm.value.confirmPassword)
        {
          this.service.checkuser(this.primarydetailsForm.value).subscribe(
            data => {
              this.spinnerFlag = true;
              this.spinner.show();
              setTimeout(() => {
                /** spinner ends after 3 seconds */
                this.spinner.hide();
                this.activeIndex = 1;
                this.primary = false; this.secondary = true;
                this.newUser = data;
              }, 3000);
            },
            error => {              
              this.spinner.show();
              setTimeout(() => {
                /** spinner ends after 3 seconds */
                this.spinner.hide();
                this.messageService.add({severity:'warn', summary: '', detail:'Username already taken'});
              }, 3000);

            });
        }
        else {
          this.messageService.add({severity:'warn', summary: '', detail:'Passwords do not match'});
        }

      } 
    }

    onSubmitUsrdet() {
      this.submittedUsrdet = true;
      this.getusrdet.userName.setValue(this.primarydetailsForm.get('userName').value);
      this.getusrdet.password.setValue(this.primarydetailsForm.get('password').value);
      this.getusrdet.userType.setValue('user');
      this.secondarydetailsForm.controls['gender'].setValue(this.selectedGender.name);
      this.getusrdet.street.setValue(this.selectedStreet.name);
      this.getusrdet.wardNo.setValue(this.selectedWard.name);
      if (this.secondarydetailsForm.valid) {
          this.service.registeruser(this.secondarydetailsForm.value).subscribe(
            data => {
              this.spinnerFlag = false;
              this.spinner.show();
              setTimeout(() => {
                /** spinner ends after 3 seconds */
                this.spinner.hide();
                this.messageService.add({severity:'warn', summary: '', detail:'Account Sucessfully created'});
                this.router.navigate(['/login']);
                this.spinnerFlag = true;
              }, 3000);

            },
            error => {
              this.messageService.add({severity:'warn', summary: '', detail:'Account cannot be created, please check with admin'});
            });
      } 
    }

    reset() {
      this.secondarydetailsForm.reset;
    }
    


}
