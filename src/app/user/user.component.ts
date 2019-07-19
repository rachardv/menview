import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../_services/'
import { User } from '../_models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  showUserInfo: boolean = false;

  currentUser: User;

  constructor(
    private authenticationService:AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  ngOnInit() {
  }

}
