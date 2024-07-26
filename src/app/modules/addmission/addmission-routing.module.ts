import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTicketComponent } from './components/add-ticket/add-ticket.component';
import { SearchPatientComponent } from './components/search-patient/search-patient.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';

const routes: Routes = [
  { path: 'addTicket', component: AddTicketComponent },
  { path: 'searchForPatient', component: SearchPatientComponent },
  { path: 'addPatient/:id', component: AddPatientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddmissionRoutingModule { }
