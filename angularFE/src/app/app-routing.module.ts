import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { SignInComponent } from './modules/sign-in/sign-in.component';
import { SignUpComponent } from './modules/sign-up/sign-up.component';
import { EventDetailsComponent } from './modules/event-details/event-details.component';
import { AddEventComponent } from './modules/add-event/add-event.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: '', redirectTo: '/sign-in', pathMatch: 'full'
  },
  {
    path: '', component: DefaultComponent,
    children:[
      { path: 'sign-in', component: SignInComponent},
      { path: 'sign-up', component: SignUpComponent},
      { path: 'eventDetails', component: EventDetailsComponent, canActivate:[AuthGuard]},
      { path: 'add-event', component: AddEventComponent, canActivate:[AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
