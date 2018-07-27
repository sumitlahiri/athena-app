import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/Patient'

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  //Properties
  patient: Patient;
  
  constructor() { }

  ngOnInit() {
  }

}
