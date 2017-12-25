import { Component, OnInit } from '@angular/core';
import { ProfessionalQualificationService } from './professional-qualification.service';

@Component({
  selector: 'app-professional-qualification',
  templateUrl: './professional-qualification.component.html',
  styleUrls: ['./professional-qualification.component.css']
})
export class ProfessionalQualificationComponent implements OnInit {

  professionalQs = [];

  constructor(private _professionalQ: ProfessionalQualificationService) { }

  ngOnInit() {
    this.getAllProfessionalQualifications();
  }

  getAllProfessionalQualifications() {

    this._professionalQ.getProfessionalQualification()
      .subscribe(
          (response: any) => [(this.professionalQs = response)],
          (error) => console.log(error)
          );


  }
}
