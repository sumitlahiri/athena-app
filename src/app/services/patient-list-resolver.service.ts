import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ResolvedPatientList } from '../models/resolved-patientlist.model';

import { PatientService } from './patient.service';


@Injectable({
  providedIn: 'root'
})

export class PatientListResolverService {

  constructor(private patientService: PatientService) { }

  resolve(practiceId: string, startDate: string, endDate: string): Observable<ResolvedPatientList> {
    return this.patientService.getPatients(practiceId, startDate, endDate)
      .pipe(
        map((patients) => new ResolvedPatientList(patients)),
        catchError((err: any) => of(new ResolvedPatientList(null, err)))
      );
  }
}
