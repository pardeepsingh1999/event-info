import { Component, OnInit } from '@angular/core';
import { ModulesService } from 'src/app/modules/modules.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public modulesService: ModulesService) { }

  ngOnInit(): void {
  }

  logout() {
    this.modulesService.onLogout();
  };
}
