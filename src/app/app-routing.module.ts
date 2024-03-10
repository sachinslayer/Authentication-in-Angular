import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { TaskComponent } from './task/task.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ContestComponent } from './contest/contest.component';
import { CreativityComponent } from './creativity/creativity.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'task',component:TaskComponent, canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'forgot',component:ForgotPasswordComponent},
  {path:'reset-password/:token',component:ResetPasswordComponent},
  {path:'contest',component:ContestComponent,canActivate:[AuthGuard]},
  {path:'creativity',component:CreativityComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
