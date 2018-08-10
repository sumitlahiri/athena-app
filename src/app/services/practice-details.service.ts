import { Injectable } from '@angular/core';
import { PracticeDetails } from './../models/practice-details';

@Injectable({
  providedIn: 'root'
})
export class PracticeDetailsService {
  practiceDetails: PracticeDetails[];

  constructor() {
    this.practiceDetails = [
      {
        practiceGroup: 'Dr. Smith & Associates',
        location: 'Orlando, FL',
        healthSystemName: 'Athena',
        practiceId: '195900',
        isActive: true
      },
      {
        practiceGroup: 'Northbrook Family Practice',
        location: 'Chicago, IL',
        healthSystemName: 'Athena',
        practiceId: '1959215',
        isActive: true
      },
      {
        practiceGroup: 'Doctors 24/7',
        location: 'New York, NY',
        healthSystemName: 'Allscripts, TW',
        practiceId: '23212',
        isActive: true
      },
      {
        practiceGroup: 'Capital Area Physicians',
        location: 'Raleigh, NC',
        healthSystemName: 'Allscripts, PRO',
        practiceId: '--------',
        isActive: false
      }
    ]
  }

  getPopulatePracticeDetails() {
    return this.practiceDetails;
  }

  getPracticeDetails(practiceId: string): PracticeDetails {
    for (var ind = 0; ind < this.practiceDetails.length; ind++) {
      if (this.practiceDetails[ind].practiceId == practiceId) {
        return this.practiceDetails[ind];
      }
    }
  }
}
