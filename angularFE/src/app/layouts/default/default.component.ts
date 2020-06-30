import { Component, OnInit } from '@angular/core';
import { ModulesService } from 'src/app/modules/modules.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen: boolean = true;

  constructor(private modulesService: ModulesService) { }

  ngOnInit(): void {
  }

  sideBarToggler(event) {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
