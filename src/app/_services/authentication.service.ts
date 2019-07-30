import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

import { User } from '../_models/user'

import { Globals } from '../_helpers/globals';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private globals: Globals,
    private authService: AuthService
  ) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.apiUrl = globals.apiUrl;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username, password) {
    localStorage.removeItem('currentUser');
    return this.http.post<any>(this.apiUrl + `/login`, { username, password })
      .pipe(
        map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
        })
      );

  }

  oAuthLogin(idToken){
    return this.http.post<any>(this.apiUrl+'/OauthLogin', {idToken})
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  
  register(username, password, email) {
    return this.http.post<any>(this.apiUrl+'/registration', {username, password, email})
  }

  googleLogin(){
    let idToken:string
    localStorage.removeItem('currentUser');
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe(
      user => {
        idToken = user["idToken"]
      })

    return this.http.post<any>(this.apiUrl+'/OauthLogin', {idToken})
      .pipe(
        map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
        })
      );
  }

  

}
