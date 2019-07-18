import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login';
import { UserComponent } from './user';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers'; //used to restrict access to pages for only logged in users. none exist yet

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { initialNavigation: 'enabled', useHash: true }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
