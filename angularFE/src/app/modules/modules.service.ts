import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './user.model';
import { EventDetail } from './event.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  userProfileData = null;

  selectedUser: User = {
    name: '',
    email: '',
    password: '',
    age: null
  };

  selectedEvent: EventDetail = {
    event_name: '',
    event_category: '',
    event_description: '',
    event_location: '',
    event_date_and_time: ''
  }

  constructor(
    private http: HttpClient,
    private router: Router

    ) { }

  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/user/register', user);
  };

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/auth', authCredentials);
  };

  // getUserProfile() {
  //   return this.http.get(environment.apiBaseUrl + '/userProfile');
  // };

  getEventDetails() {
    return this.http.get(environment.apiBaseUrl + '/eventDetails');
  };

  addEventDetails(eventDetail: EventDetail) {
    return this.http.post(environment.apiBaseUrl + '/admin/add-event', eventDetail);
  };

  //helper methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  };

  getToken() {
    return localStorage.getItem('token');
  };

  deleteToken() {
    localStorage.removeItem('token');
  };

  getUserPayload() {
    let token = this.getToken();
    if(token) {
        let userPayload = atob(token.split('.')[1]);
        return JSON.parse(userPayload);
    } else {
        return null;
    }
  };

  isLoggedIn() {
    let userPayload = this.getUserPayload();
    if(userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  };

  loginUserData() {
    let userPayload = this.getUserPayload();
    if(userPayload) {
        if(userPayload.exp > Date.now() / 1000) {
            return userPayload;
        } else {
            this.deleteToken();
            return false;
        }
    } else {
        return false;
    }
  };

  onLogout() {
    this.deleteToken();
    this.userProfileData = null;
    this.router.navigate(['/sign-in']);
  }
}
