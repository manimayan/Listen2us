import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import {PanelModule} from 'primeng/panel';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { NavigationService } from './../navigation.service';


import { HomeComponent } from './home/home.component';
import { RegComplaintsComponent } from './reg-complaints/reg-complaints.component';
import { ViewComplaintsComponent } from './view-complaints/view-complaints.component';
import { WardDetailsComponent } from './ward-details/ward-details.component';

const routes: Routes = [{path:'',
children:[
   { path: '', component: HomeComponent },
  { path: 'reg-comp', component: RegComplaintsComponent},
  { path: 'view-comp', component: ViewComplaintsComponent},
  { path: 'ward-det', component: WardDetailsComponent},
]}];

@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(routes),
    FormsModule,
    ButtonModule,
    PanelModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ToastModule,
    TooltipModule,
    NgxSpinnerModule,
    ConfirmDialogModule
  ],
  providers: [NavigationService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],

  declarations: [ 
    HomeComponent,
    RegComplaintsComponent,
    ViewComplaintsComponent,
    WardDetailsComponent
  ]
})
export class StoryDetailsModule { }
