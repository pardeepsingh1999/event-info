import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModulesService } from 'src/app/modules/modules.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(public modulesService: ModulesService) { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }

  logout() {
    this.modulesService.onLogout();
  }

}
