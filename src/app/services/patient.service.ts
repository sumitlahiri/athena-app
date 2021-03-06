import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Patient } from '../models/patient';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const httpOptionsCCDA = {
  headers: new HttpHeaders({
    'Content-Type': 'text/xml'
  })
};

@Injectable({
  providedIn: 'root'
})

export class PatientService {
  private serverUrl: string = 'http://10.87.182.125:8080/athena-service/api/clinicalservice';
  //private serverUrl: string = 'http://localhost:8080/ehr-fhir-demo/api/clinicalservice';

  constructor(private httpClient: HttpClient) {
  }

  getPatients(practiceId: string, startDate: string, endDate: string): Observable<Patient[]> {
    console.log("PracticeId :" + practiceId);
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    httpOptions.headers.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");

    const url = `${this.serverUrl}/${practiceId}/getScheduledPatients/${startDate}/${endDate}`;
    console.log("getPatient URL " + url)

    return this.httpClient.get<Patient[]>(url, httpOptions).pipe(catchError(this.handleError));
  }

  getCCDAForPatient(practiceId: string, memberId: string, encounterId: string, startDate: string, endDate: string): Observable<string> {
    //http://10.87.182.125:8080/athena-service/api/clinicalservice/{{practiceId}}/getCCDA/{{patient.memberId}}/{{patient.encounterId}}/{{startDate}}/{{endDate}}

    httpOptionsCCDA.headers.append('Access-Control-Allow-Origin', '*');
    httpOptionsCCDA.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptionsCCDA.headers.append('Access-Control-Allow-Credentials', 'true');
    httpOptionsCCDA.headers.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");

    const url = `${this.serverUrl}/${practiceId}/getCCDA/${memberId}/${encounterId}/${startDate}/${endDate}`;
    console.log("getCCDAForPatient URL " + url)

    return this.httpClient.get<string>(url, httpOptionsCCDA).pipe(map((data) => JSON.stringify(data)), catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }

    return throwError(new Error('There is a problem with the application. Please contact the support team !!'));
  }

}
