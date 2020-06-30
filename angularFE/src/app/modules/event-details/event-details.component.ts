import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../modules.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  panelOpenState = false;
  eventDetails = [];

  constructor(
    public modulesService: ModulesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.modulesService.userProfileData = this.modulesService.loginUserData();

    this.modulesService.getEventDetails().subscribe(
        res => {
          console.log(res)
          this.eventDetails = res['eventDetail'];
        },
        err => {

        }
      )
  }

}
