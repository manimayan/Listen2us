import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {TabViewModule} from 'primeng/tabview';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {StepsModule} from 'primeng/steps';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import { NgxSpinnerModule } from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthenticationGuard} from './appGaurds/authentication.guard';
import {BackendProvider} from './appHelpers/backend-interceptor';
import {ErrorInterceptor} from  './appHelpers/error-interceptor';
import {TokenInterceptor} from './appHelpers/token-interceptor';
import {AuthenticationService} from './authentication/authentication.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { NavbarComponent } from './appNavbar/navbar.component';
import { HeaderComponent } from './appHeader/header.component';
import { NavigationService } from './navigation.service';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    StoryDetailsComponent,
    AuthenticationComponent,
    RegisterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TabViewModule,
    CardModule,
    ToastModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DialogModule,
    StepsModule,
    DropdownModule,
    CalendarModule,
    NgxSpinnerModule
  ],
  providers: [NavigationService,        
    AuthenticationGuard,
    AuthenticationService,
    
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    BackendProvider],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
{
  
}
