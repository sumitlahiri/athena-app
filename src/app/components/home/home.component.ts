import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Healthsystem } from '../../models/healthsystem';
import { PracticeDetails } from '../../models/practice-details';
import { PracticeDetailsService } from '../../services/practice-details.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  healthsystems: Healthsystem[];
  practiceDetails: PracticeDetails[];

  constructor(private router: Router, private practiceDetailsService: PracticeDetailsService) {
    this.populateHealthSystem();
    this.practiceDetails = this.practiceDetailsService.getPopulatePracticeDetails();
  }

  populateHealthSystem() {
    this.healthsystems = [
      {
        id: '1',
        name: 'Athena'
      },
      {
        id: '2',
        name: 'Allscripts'
      }
    ]
  }


  onSelect(practiceDetail: PracticeDetails) {
    this.router.navigate(['/schedule', practiceDetail.practiceId]);
  }

  ngOnInit() {
  }

}
