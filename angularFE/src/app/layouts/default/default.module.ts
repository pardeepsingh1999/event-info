import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';

import { DefaultComponent } from './default.component';
import { SignInComponent } from 'src/app/modules/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/modules/sign-up/sign-up.component';
import { AddEventComponent } from 'src/app/modules/add-event/add-event.component';
import { EventDetailsComponent } from 'src/app/modules/event-details/event-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModulesService } from 'src/app/modules/modules.service';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    DefaultComponent,
    SignInComponent,
    SignUpComponent,
    EventDetailsComponent,
    AddEventComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatDividerModule,

  ],
  providers: [
    ModulesService
  ]
})
export class DefaultModule { }
