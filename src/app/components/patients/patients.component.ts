import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
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
  practiceId: string = '195900';
  error: string = '';
  isErrorPresent: boolean = false;
  pipe: any;

  patients: Patient[];

  constructor(private spinner: NgxSpinnerService, private patientListService: PatientListResolverService) {
  }

  ngOnInit() {
    this.pipe = new DatePipe('en-US');
    this.setBtnDisbaledStyles();
    this.startDate = new Date();
    this.startDate.setDate(this.startDate.getDate() - 1);
    this.endDate = new Date();
  }

  getPatients() {
    this.hideTable = false;
    this.spinner.show();

    this.patientListService.resolve(this.practiceId, this.pipe.transform(this.startDate, 'yyyy-MM-dd'), this.pipe.transform(this.endDate, 'yyyy-MM-dd')).subscribe((data: ResolvedPatientList) => {
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
