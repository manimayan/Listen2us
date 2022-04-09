import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AuthenticationGuard } from './appGaurds/authentication.guard';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
{ path: '', loadChildren: './story-details/story-details.module#StoryDetailsModule' , canActivate: [AuthenticationGuard] },
{ path: 'login', component: AuthenticationComponent },
{ path: 'register', component : RegisterComponent },
// otherwise redirect to home
{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
