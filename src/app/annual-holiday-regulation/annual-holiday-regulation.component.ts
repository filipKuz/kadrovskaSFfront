import { Component, OnInit } from '@angular/core';
import { AnnualHolidayRegulationService } from './annualHolidayRegulation.service';

@Component({
  selector: 'app-annual-holiday-regulation',
  templateUrl: './annual-holiday-regulation.component.html',
  styleUrls: ['./annual-holiday-regulation.component.css']
})
export class AnnualHolidayRegulationComponent implements OnInit {

  annualHolidayRegulations=[];

  constructor(private annualHolidayRegulationService: AnnualHolidayRegulationService ) { }

  ngOnInit() {
    this.onGet();
  }

  onGet() {
    this.annualHolidayRegulationService.getAnnualHolidayRegulations()
      .subscribe(
        (response:any) => (this.annualHolidayRegulations = response,
          console.log(this.annualHolidayRegulations)),
        (error) => console.log(error)
      );
  }

}

