import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, AlertService } from '../_services'

@Component({
    templateUrl: 'login.component.html',
    animations: [
        trigger('fadeInOut', [
          transition(':enter', [
            style({ opacity: 0 }),
            animate(225, style({ opacity: 1 }))
          ]),
          transition(':leave', [
            animate(225, style({ opacity: 0 }))
          ])
        ])
      ],
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false; //this is used to display spinner and disable login button
    submitted = false; //used to display validation errors after first submission is attempted
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error.Reason)
                    this.loading = false;
                });

    }

    googleSignIn(){
        this.submitted=this.loading=true;
        this.authenticationService.googleLogin()
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error(error.Reason)
                this.loading = false;
            });   
    }
}