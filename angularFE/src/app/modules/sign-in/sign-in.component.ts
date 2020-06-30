import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../modules.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  hide = true;
  serverErrorMessages: string;

  model = {
    email: '',
    password: ''
  }

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
    this.modulesService.login(form.value).subscribe(
      res => {
        this.modulesService.setToken(res['loginToken']);
        this.modulesService.userProfileData = this.modulesService.loginUserData();
        this.router.navigateByUrl('/eventDetails')
        console.log(this.modulesService.userProfileData)
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    )
  }

}
