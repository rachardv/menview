import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core'; /* google maps for Angular */

/* Home/Main Component */
import {
  HomeComponent,
  DishComponent,
  RestaurantComponent
} from './home/';

/* Helpers */
import {
  Globals,
  JwtInterceptor,
  ErrorInterceptor
} from './_helpers/';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DishComponent,
    RestaurantComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDfpSDY2JRmlLiTUI5tKUw1wiGyEGR1qys' /* registered to mikhelvin@hotmail.com -> please don't share this API key!! */
    })
  ],
  providers: [
    Globals,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
