import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { Patient } from '../../models/patient';
import { ResolvedPatientList } from '../../models/resolved-patientlist.model';

import { PatientListResolverService } from '../../services/patient-list-resolver.service';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})


export class PatientsComponent implements OnInit {
  startDate: any;
  endDate: any;
  btnDisable: boolean = true;
  btnDisbaledStyles = {};
  hideTable: boolean = false;
  practiceId: string = '';
  error: string = '';
  isErrorPresent: boolean = false;

  patients: Patient[];

  constructor(private spinner: NgxSpinnerService, private patientListService: PatientListResolverService) {
  }

  ngOnInit() {
    this.setBtnDisbaledStyles();
  }

  getPatients() {
    this.hideTable = false;
    this.spinner.show();

    this.patientListService.resolve(this.practiceId, this.startDate, this.endDate).subscribe((data: ResolvedPatientList) => {
      if (data.error == null) {
        console.log("In Patients Component, in Subscribe :" + data.patients);
        this.patients = data.patients;
        this.isErrorPresent = false;
        this.spinner.hide();
      }
      else {
        this.error = data.error;
        this.isErrorPresent = true;
        this.hideTable = true;
        this.spinner.hide();
      }
    })

  }

  resetPatients() {
    this.hideTable = true;
  }

  setBtnDisbaledStyles() {
    this.btnDisbaledStyles = {
      'btn-secondary': this.btnDisable
    }
  }
}
