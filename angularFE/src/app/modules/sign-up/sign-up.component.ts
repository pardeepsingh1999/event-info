import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ModulesService } from '../modules.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  hide = true;
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(
    public modulesService: ModulesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.modulesService.userProfileData = this.modulesService.loginUserData();
    if(this.modulesService.isLoggedIn()){
      this.router.navigateByUrl('/eventDetails')
    }
  }

  onSubmit(form: NgForm) {
    // console.log(form.value)
    this.modulesService.postUser(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigateByUrl('/sign-in')
        }, 1000);
        this.resetForm(form);
      },
      err => {
        if(err.status == 400) {
          this.serverErrorMessages = err.error.join('<br/>');
      } else if(err.status == 501) {
          this.serverErrorMessages = err.error;
      } else {
          this.serverErrorMessages = 'Something went wrong. Please contact admin.'
      }
      }
    )
  };

  resetForm(form: NgForm) {
    this.modulesService.selectedUser = {
      name: '',
      email: '',
      password: '',
      age: null
    };
    form.resetForm();
    this.serverErrorMessages = '';
    this.showSuccessMessage = false;

  }

}
