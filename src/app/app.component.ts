import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service'
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  
  currentUser: User;
  x:string = "hi"

  constructor(
    private router: Router,
    private authenticationService:AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  isActive(arg: string): boolean {
    if (this.router.url == arg) { // highlight if route matches
      return true;
    }
    return false;
  }

}
