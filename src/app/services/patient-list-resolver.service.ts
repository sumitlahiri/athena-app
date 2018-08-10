import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ResolvedPatientList } from '../models/resolved-patientlist.model';
import { ResolvedCcda } from '../models/resolved-ccda.model';

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

  resolveGetCCDA(practiceId: string, memberId: string, encounterId: string, startDate: string, endDate: string): Observable<ResolvedCcda> {
    return this.patientService.getCCDAForPatient(practiceId, memberId, encounterId, startDate, endDate)
      .pipe(
      map((ccda) => new ResolvedCcda(ccda)),
      catchError((err: any) => of(new ResolvedCcda(null, err)))
      );
  }
}
