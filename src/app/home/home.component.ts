import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DishComponent } from './dish.component';
import { RestaurantComponent } from './restaurant.component';
import { ReviewComponent } from './review.component'
import { AuthenticationService, AlertService } from '../_services'

import { RestaurantService } from '../_services';

import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { pipe } from 'rxjs';


@Component({
  selector: 'app-home',
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
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:
    [
      RestaurantService,
      DishComponent,
      RestaurantComponent,
      ReviewComponent
    ]
})
export class HomeComponent implements OnInit {

  constructor(public api: RestaurantService,
    private formBuilder: FormBuilder,
    private router: Router, 
    private authService: AuthenticationService) {

}


  reviewForm: FormGroup;

  /* controls whether loading "spinner" is shown */
  loading: boolean = false;
  
  /* string used in angular pipe to filter restaurant list */
  searchKeyword: string = "";
  
  /* maps vars */
  latitude = 49.279030;
  longitude = -122.912738;
  mapType = 'roadmap';
  markers: any = []; // stores map markers
  
  /* booleans for handle overlay & overview display */
  overview: boolean = true; // overview = first screen with google maps & restaurant search bar
  overlay: boolean = false; // overlay = view dishes and/or reviews for specific dishes
  show: string; // determines what the overlay screen is showing. can be set to 3 values: "dishes", "restaurants", "reviews".
  
  
  /* data-bound strings to display to user */
  currentRestaurantName: string;
  currentDish: string;
  selectedRestaurant: any;
  
  /* arrays for storing data returned from API calls */
  restaurantList: any = [];
  dishList: any = [];
  reviewList: any = [];

  dishCount: number = 0; // count number of dishes returned from API call. Also used to detect empty restaurants to display a message to the user
  restaurantCount: number = 0;
  
  response: any = {
    "name": "",
    "lat": "",
    "lon": "",
    "address": "",
    "description": "",
    "rating": 0
  }

  toggleOverview() {
    if (this.overview) {
      // ENABLE OVERLAY
      this.overview = !this.overview;

      setTimeout(() => {
        this.overlay = !this.overlay;
      }, 250);
    } else {
      // DISABLE OVERLAY
      this.overlay = !this.overlay;
      this.getAllRestaurants(); // load restaurant list again?

      setTimeout(() => {
        this.overview = !this.overview;
      }, 250);
    }
  }

  setShow(query: string) {
    this.show = query;
  }

  getAllRestaurants() {
    this.loading = true;
    this.markers = [];

    this.api.getAllRestaurants().subscribe((data: {}) => {
      
      this.restaurantCount = Object.keys(data).length;

      /* parse all strings into floats from restaurants. god help you if your restaurants list is long */
      for (var i = 0; i < this.restaurantCount; i++) {
        data[i]["lat"] = parseFloat(data[i]["lat"]);
        data[i]["lon"] = parseFloat(data[i]["lon"]);
      }

      // console.log(count + " restaurants retrieved.");

      this.restaurantList = data;

      this.markers = data;
      this.loading = false;
    },
      (error: any) => {
        // TODO: display an error to user if restaurants are not retrieved.
        this.restaurantCount = 0;
        console.log("Error retrieving all restaurants!");
        this.loading = false;
      }
    );
  }

  showAllRestaurants() {
    this.loading = true;
    this.currentRestaurantName = "All Restaurants"; // used to display Navbar info

    this.api.getAllRestaurants().subscribe((data: {}) => {

      this.restaurantCount = Object.keys(data).length;
      this.restaurantList = data;
      this.setShow("restaurants");
      this.loading = false;
      

    },
      (error: any) => {
        // TODO: display an error to user if restaurants are not retrieved.
        this.restaurantCount = 0;
        console.log("Error retrieving all restaurants!");
        this.setShow("restaurants");
        this.loading = false;
      }
    );
  }

  getRestaurant(query: string) {
    this.loading = true;

    this.api.getRestaurant(query).subscribe(
      (data: {}) => {

        // parse floats from response
        data["lat"] = parseFloat(data["lat"]);
        data["lon"] = parseFloat(data["lon"]);

        this.show = "dishes";
        this.loading = false;
      },
      (error: any) => {
        console.log("Error retrieving " + query);
        this.show = "dishes";
        this.loading = false;
      }
      
    );
  }

  getDishes($event: any) {
    console.log("Loading restaurant " + $event);
    this.loading = true;
    this.currentRestaurantName = $event;

    this.dishCount = 0; // reset count of dishes

    /*    this.dishList = this.response;*/


    this.api.getDishes($event).subscribe((data: {}) => {
      //console.log(data);

      this.dishCount = Object.keys(data).length;

      console.log(this.dishCount + " dishes retrieved.");

      this.dishList = data;
      this.setShow("dishes");
      this.loading = false;
    },
      (error: any) => {
        console.log("Error retrieving dishes for " + $event + "!");
        this.dishCount = 0;
        this.setShow("dishes");
        this.loading = false;
      }
    );
  }

  getMarker(marker: any) {
    console.log(marker);
    this.selectedRestaurant = {
      name: marker.name,
      dishcount: marker.dishcount,
      lat: marker.lat,
      lon: marker.lon,
      alpha: marker.alpha
    }
  }

//--------------------- Review related functions------------------
  reloadReviews() {
    this.api.getReviewsByDish(this.currentDish["dish_id"]).subscribe(
      data => {
        this.reviewList = data;});
  }

  readReview(dish: any) {
    //set dish name
    this.currentDish = dish;
    //get dish by dish ID
    this.reloadReviews();
    //set overlay
    this.setShow("reviews");
  }

  submitReview(dish: any) {

    if (this.reviewForm.invalid) {
      return;
    }

    let f = this.reviewForm.controls; //for convienance
    let rating = f.rating.value
    let review = f.details.value
    this.api.createReview(this.currentDish["dish_id"], rating, review)
      .pipe().subscribe(
        data => {
          console.log("Review sucessfully made");
          this.reloadReviews();
          this.reviewForm.reset();
        },
        error => {
          console.log(error)
          this.router.navigate(['/login']);
        }
      )
  }

  ngOnInit() {
    this.getAllRestaurants(); // load restaurant data on navigate
    this.reviewForm = this.formBuilder.group({
      rating: ['', Validators.required],
      details: ['', Validators.required]
  });

  }
}
