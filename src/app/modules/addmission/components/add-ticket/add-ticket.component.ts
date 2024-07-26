import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddPatientService } from '../../services/add-patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {
  // value1: string | undefined;
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private patientService: AddPatientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      nationalId: [null, [Validators.required, Validators.pattern(/^(2|3)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{2}\d{4}\d$/)]]
    })
  }

  numberOnly(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  submit() {
    const NationalId = this.form.get('nationalId')?.value as number;
    this.patientService.searchForPt(NationalId).subscribe({
      next: (res) => {
        console.log("sssssssssssssssssssssss" + res);
      },
      error: (err) => {
        this.router.navigate([`addmission/addPatient/${NationalId}`]);
      }
    });
  }

}
