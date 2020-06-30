import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../modules.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  minDate;
  userDate;
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(
      public modulesService: ModulesService,
      private router: Router
      ) { }

  ngOnInit(): void {
    this.userDate = this.modulesService.loginUserData()
    if(!this.userDate.admin) {
      this.router.navigateByUrl('/userDetails')
    }
    this.minDate = new Date().toISOString().split("T")[0] + "T00:00";
    // console.log(this.minDate)
    this.modulesService.userProfileData = this.modulesService.loginUserData();
    console.log(this.modulesService.userProfileData)
    if(this.modulesService.userProfileData) {
      if(!this.modulesService.userProfileData.admin) {
        this.router.navigateByUrl('/eventDetails')
      }
    }
  }

  onSubmit(form: NgForm) {
    // console.log(form.value)

    // console.log(form.value)
    this.modulesService.addEventDetails(form.value).subscribe(
      res => {
        this.router.navigateByUrl('/eventDetails')
        this.resetForm(form);
      },
      err => {
        if(err.status == 501) {
          this.serverErrorMessages = err.error;
        } else {
          this.serverErrorMessages = 'Something went wrong. Please contact admin.'
        }
      }
    )
  };

  resetForm(form: NgForm) {
    this.modulesService.selectedEvent = {
      event_name: '',
      event_category: '',
      event_description: '',
      event_location: '',
      event_date_and_time: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
    this.showSuccessMessage = false;

  }

}
