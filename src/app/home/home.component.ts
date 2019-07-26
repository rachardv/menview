import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { DishComponent } from './dish.component';
import { RestaurantComponent } from './restaurant.component';
import { ReviewComponent } from './review.component'

import { RestaurantService } from '../_services';

import { restaurants, menus } from './sampleData';
import { reviews } from './sampleReviews';


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
  showDishes: boolean = true; // if true, overlay displays list of dishes for restaurants (must always be opposite of showReviews)
  showReviews: boolean = false; // if true, overlay display list of reviews for a dish (must always be opposite of showDishes)
  menuActive: boolean = false; // TODO: refactor this. do we need this?
  
  
  /* data-bound strings to display to user */
  currentRestaurantName: string;
  currentDishName: string;
  selectedRestaurant: any;
  
  /* arrays for storing data returned from API calls */
  restaurantList: any = [];
  dishList: any = [];
  reviewList: any = [];

  dishCount: number = 0; // count number of dishes returned from API call. Also used to detect empty restaurants to display a message to the user
  
  
  response: any = {
    "name": "",
    "lat": "",
    "lon": "",
    "address": "",
    "description": "",
    "rating": 0
  }

  constructor(public api: RestaurantService) {

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

  toggleReviewList() {
    if (this.showDishes) {
      // ENABLE reviews
      this.showDishes = !this.showDishes;

      setTimeout(() => {
        this.showReviews = !this.showReviews;
      }, 250);
    } else {
      this.showReviews = !this.showReviews;

      setTimeout(() => {
        this.showDishes = !this.showDishes;
      }, 250);
    }
  }


  getAllRestaurants() {
    this.loading = true;
    this.markers = [];


    this.api.getAllRestaurants().subscribe((data: {}) => {

      /* parse all strings into floats from restaurants. god help you if your restaurants list is long */
      var count = Object.keys(data).length;
      for (var i = 0; i < count; i++) {
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
        console.log("Error retrieving all restaurants!");
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

        this.loading = false;
      },
      (error: any) => {
        console.log("Error retrieving " + query);
        this.loading = false;
      }
    );
  }


  getReviews(query: string) {
    /* TODO: API CALL FOR REVIEWS FROM THIS DISH */
    console.log("Getting reviews for " + query);
    this.reviewList = reviews;
  }

  getDishes($event: any) {
    console.log("Loading restaurant " + $event);
    this.loading = true;
    this.currentRestaurantName = $event;

    this.dishCount = 0; // reset count of dishes

    if (!this.menuActive) {
      this.toggleMenuActive();
    }
    /*    this.dishList = this.response;*/


    this.api.getDishes($event).subscribe((data: {}) => {
      //console.log(data);

      this.dishCount = Object.keys(data).length;

      console.log(this.dishCount + " dishes retrieved.");

      this.dishList = data;

      this.loading = false;
    },
      (error: any) => {
        console.log("Error retrieving dishes for " + $event + "!");
        this.dishCount = 0;
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

  toggleMenuActive() {
    this.menuActive = !this.menuActive;
  }

  readReview($event: any) {
    console.log("Read review called");
    console.log($event);

    this.currentDishName = $event;

    /* TODO: FETCH REVIEW FOR THIS DISH */
    this.getReviews($event); //placeholder

    /* TOGGLE REVIEW LIST VIEW */
    this.toggleReviewList();
  }

  writeReview($event: any) {
    console.log("Write review called");
    console.log($event);

    this.currentDishName = $event;

    /* TODO: WRITE A REVIEW FOR THIS DISH */
    this.getReviews($event); //placeholder


    /* TOGGLE REVIEW LIST VIEW */
    this.toggleReviewList();
  }

  ngOnInit() {
    this.getAllRestaurants(); // load restaurant data on navigate

  }

}
