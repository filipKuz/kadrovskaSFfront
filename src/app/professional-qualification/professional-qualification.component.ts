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
  @ViewChild('fE') editPQForm: NgForm;
  professionalQs = [];

  selectedRow: number;
  setClickedRow: Function;
  addProfQualification = false;
  editProfQualification = false;

  clickedPQid;

  pqNameVar: string;
  pqDegreeVar: string;

  pq = {
    "name": "",
    "qualificationDegree": "",
    "active": ""
  }

  constructor(private _professionalQ: ProfessionalQualificationService) {
    this.setClickedRow = function (index) {
      this.selectedRow = index;
    }
  }

  onPopulatePq(name, degree) {
    this.pq.name = name;
    this.pq.qualificationDegree = degree;
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

  onPost() {
    this._professionalQ.postPQ(this.pq)
      .subscribe(
      (response: any) => this.professionalQs.push(response),
      (error) => console.log(error)
      )
  }

  resetForm() {
    this.addPQForm.resetForm();
  }

  resetEditForm() {
    this.editPQForm.resetForm();
  }

  onSubmit(action) {
    if (action === "add") {
      this.onPopulatePq(this.pqNameVar, this.pqDegreeVar);
      this.onPost();
      this.addProfQualification = !this.addProfQualification;
    }if (action === "edit") {
      this.onPopulatePq(this.editPQForm.value.nameEdit, this.editPQForm.value.degreeEdit);
      this.onPut();
      this.editProfQualification = !this.editProfQualification;
      this.resetEditForm();
    }
  }

  onEditPQ(id) {
    this.resetEditForm();
    this.clickedPQid=id;
    this.onGetByPQId(this.clickedPQid);
    this.editProfQualification = !this.editProfQualification;
  }

  onPut() {
    this._professionalQ.editPQ(this.pq, this.clickedPQid)
      .subscribe(
      (response: any) => (
          console.log(response),
          this.getAllProfessionalQualifications()
      ),
      (error) => console.log(error)
      );
  }

  onGetByPQId(id) {
    this._professionalQ.getPQById(id)
      .subscribe(
        (response: any) => (
          console.log(response),
          this.onPopulatePq(response.name, response.qualificationDegree)
        ),
        (error) => console.log(error)
      );
  }

  onDelete(id) {
    this._professionalQ.deletePQ(id).subscribe(
      (response: any) => (
          this.getAllProfessionalQualifications()
      ),
      (error) => console.log(error)
      );
  }
}
