import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddmissionRoutingModule } from './addmission-routing.module';
import { AddTicketComponent } from './components/add-ticket/add-ticket.component';
import { SearchPatientComponent } from './components/search-patient/search-patient.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {CheckboxModule} from 'primeng/checkbox';
import {TableModule} from 'primeng/table';


@NgModule({
  declarations: [
    AddTicketComponent,
    SearchPatientComponent,
    AddPatientComponent
  ],
  imports: [
    CommonModule,
    AddmissionRoutingModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    DropdownModule,
    InputNumberModule,
    CheckboxModule,
    TableModule
  ]
})
export class AddmissionModule { }
