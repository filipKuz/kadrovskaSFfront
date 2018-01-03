import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfessionalQualificationService } from './professional-qualification.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-professional-qualification',
  templateUrl: './professional-qualification.component.html',
  styleUrls: ['./professional-qualification.component.css']
})
export class ProfessionalQualificationComponent implements OnInit {

  @ViewChild('f') addPQForm: NgForm;
  professionalQs = [];

  selectedRow: number;
  setClickedRow: Function;
  addProfQualification = false;

  constructor(private _professionalQ: ProfessionalQualificationService) {
    this.setClickedRow = function (index) {
      this.selectedRow = index;
    }
  }

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

  onNext() {
    if (this.selectedRow == null || this.professionalQs.length - 1 == this.selectedRow) {
      this.selectedRow = 0;
      return;
    }
    this.selectedRow += 1;
  }

  onLastorFirst(condition: string) {
    if (condition == "last") {
      this.selectedRow = this.professionalQs.length - 1;
      return;
    }
    if (condition == "first") {
      this.selectedRow = 0;
      return;
    }
  }

  onBack() {
    if (this.selectedRow == null) {
      this.selectedRow = 0;
      return;
    }
    if (this.selectedRow == 0) {
      this.selectedRow = this.professionalQs.length - 1;
      return;
    }
    this.selectedRow -= 1;
  }
  resetForm() {
    this.addPQForm.resetForm();
  }

  onEditPQ(id) {

  }

  onDelete(id) {

  }
}
