import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core'; /* google maps for Angular */

/* Home/Main Component */
import {
  HomeComponent,
  DishComponent,
  RestaurantComponent
} from './home/';

/* Login/Register */
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert/alert.component';



/* Helpers */
import {
  Globals,
  JwtInterceptor,
  ErrorInterceptor,
  fakeBackendProvider // will remove later
} from './_helpers/';


/* Services*/
import { AuthenticationService } from './_services';
import { RestaurantService } from './_services';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DishComponent,
    RestaurantComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDfpSDY2JRmlLiTUI5tKUw1wiGyEGR1qys' /* registered to mikhelvin@hotmail.com -> please don't share this API key!! */
    })
  ],
  providers: [
    fakeBackendProvider, //will remove later
    Globals,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
  //for now adding the currentUser (for login) properties in app component. Lmk if you think it should be somewhere else
  currentUser: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}

logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}





}
