import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';

import { Patient } from '../../models/patient';
import { ResolvedPatientList } from '../../models/resolved-patientlist.model';

import { PatientListResolverService } from '../../services/patient-list-resolver.service';
import { PracticeDetailsService } from '../../services/practice-details.service';
import { PracticeDetails } from '../../models/practice-details';


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
  hideTable: boolean = true;
  practiceId: string = '';
  error: string = '';
  isErrorPresent: boolean = false;
  pipe: any;
  healthSystemName: string = '';
  practiceGroup: string = '';
  color: string = 'white';

  patients: Patient[];
  practiceDetails: PracticeDetails[];

  constructor(private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService, private patientListService: PatientListResolverService, private practiceDetailsService: PracticeDetailsService) {
    this.practiceDetails = this.practiceDetailsService.getPopulatePracticeDetails();
  }

  ngOnInit() {
    this.pipe = new DatePipe('en-US');
    this.setBtnDisbaledStyles();
    this.startDate = new Date();
    this.startDate.setDate(this.startDate.getDate() - 1);
    this.endDate = new Date();
    this.practiceId = this.route.snapshot.paramMap.get('id');
    this.getPracticeDetails(this.practiceId);
  }

  getPracticeDetails(practiceId: string) {
    for (var ind = 0; ind < this.practiceDetails.length; ind++) {
      if (this.practiceDetails[ind].practiceId == practiceId) {
        this.healthSystemName = this.practiceDetails[ind].healthSystemName;
        this.practiceGroup = this.practiceDetails[ind].practiceGroup;
      }
    }
  }

  getPatients() {
    this.spinner.show();

    this.startDate = this.pipe.transform(this.startDate, 'yyyy-MM-dd');
    this.endDate = this.pipe.transform(this.endDate, 'yyyy-MM-dd');
    this.patientListService.resolve(this.practiceId, this.startDate, this.endDate).subscribe((data: ResolvedPatientList) => {
      if (data.error == null) {
        console.log("In Patients Component, in Subscribe :" + data.patients);
        this.patients = data.patients;
        this.isErrorPresent = false;
        this.spinner.hide();
        if (this.patients.length > 0) {
          this.hideTable = false;
        }
      }
      else {
        this.error = data.error;
        this.isErrorPresent = true;
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

  goBack() {
    this.router.navigate(['/'])
  }
}
