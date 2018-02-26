import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  businessYear: number = 2018;

  AHRLink: string = "http://localhost:8080/api/reports/AHR/2018"
  thisYear: Date = new Date;
  yearNum:number;
  
  constructor() { }

  ngOnInit() {
    this.yearNum = this.thisYear.getFullYear();
  }



  onBYChange(){
   this.AHRLink = "http://localhost:8080/api/reports/AHR/"+ this.businessYear
  }

}
