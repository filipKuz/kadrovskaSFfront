
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EmployeeProfessionalQualificationService } from './employee-professional-qualification.service';
import { MessageService } from '../shared/message.service';
import { Subscription } from 'rxjs/Subscription';
import { INgxMyDpOptions, IMyDateModel, NgxMyDatePickerDirective } from 'ngx-mydatepicker';
import { ProfessionalQualificationService } from '../professional-qualification/professional-qualification.service';
import { NgForm } from '@angular/forms';
import { error } from 'selenium-webdriver';


@Component({
  selector: 'app-employee-professional-qualifications',
  templateUrl: './employee-professional-qualifications.component.html',
  styleUrls: ['./employee-professional-qualifications.component.css']
})
export class EmployeeProfessionalQualificationsComponent implements OnInit, OnDestroy {


  @ViewChild('dp') ngxdp: NgxMyDatePickerDirective;
  @ViewChild('dpE') ngxdpE: NgxMyDatePickerDirective;
  @ViewChild('f') addEpqForm: NgForm;
  @ViewChild('fE') editEpqForm: NgForm;
  subscription: Subscription;
  employeesEPQCs = [];
  mess = '22';
  model: any = { date: { year: "2017", month: "1", day: "19" } };

  clickedEPQid;

  addEmployeeProfQ = false;
  editEmployeeProfQ = false;

  epq = {
        "dateOfGraduation": this.model.date.year + "-" + this.model.date.month + "-" + this.model.date.day,
        "educationalInstitution": "",
        "profession": "",
        "professionalQId": {
            "professionalQualificationId": 1,
        },
        "employeeId": ""
      };

  profQ = []

 
  constructor(private _employeePQC: EmployeeProfessionalQualificationService,
              private _messageService: MessageService,
              private _pqService: ProfessionalQualificationService) {
    this.subscription = this._messageService.getMessage()
                                            .subscribe(message => { this.mess = message.text, this.onGetEPQbyEmployeeId(message.text); this.epq.employeeId = message.text}
                                              );
  }

  onEditButton(id) {
    this.clickedEPQid = id;
    this.editEmployeeProfQ = !this.editEmployeeProfQ;
    this.onGetEPQbyId(id);
  }
  
  ngOnInit() {
    this.onPopulatePQDropDown();
  }

  onGetEPQbyEmployeeId(employeeId) {
    this._employeePQC.getByEmployee(employeeId)
      .subscribe(
      (response: any) => [(this.employeesEPQCs = response)],
      (error) => console.log(error)
      );
  }

  
  transformFormattedDate(date:string) {
    var dateSpilt = date.split("-");
    this.model = {date : {year : Number(dateSpilt[0]), month: Number(dateSpilt[1]), day: Number(dateSpilt[2]) } };
  }

  onPopulateEq(educationalInstitution: string, profession: string, professionalQualificationId: number) {
    this.epq.educationalInstitution = educationalInstitution;
    this.epq.profession = profession;
    this.epq.professionalQId.professionalQualificationId = professionalQualificationId;
  }

  onGetEPQbyId(id) {
    this._employeePQC.getById(id)
      .subscribe(
      (response: any) => [this.onPopulateEq(response.educationalInstitution, response.profession, response.professionalQId.professionalQualificationId),
                         this.transformFormattedDate(response.dateOfGraduation)], 
      (error) => console.log(error)
      );
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  onPopulatePQDropDown() {
    this._pqService.getProfessionalQualification()
      .subscribe(
        (response:any) => (this.profQ = response),
        (error) => console.log(error)
      )
  }

  resetForm() {
    this.addEpqForm.resetForm();
  }

  resetEditForm() {
    this.editEpqForm.resetForm();
  }

  onSubmit(action: string) {
    if (action=="add") {
      this.onCreateEPQ();
      this.addEmployeeProfQ = !this.addEmployeeProfQ;
    }
    if (action=="edit") {
      this.onEditButton(this.clickedEPQid);
      this.onPutEPQ();
    }
  }

  onAddButton() {
    this.resetForm();
    this.addEmployeeProfQ = !this.addEmployeeProfQ; 
  }
  
  onDateChanged(event: IMyDateModel): void {
    this.epq.dateOfGraduation = event.date.year + "-" + event.date.month + "-" + event.date.day;
  }


  onCreateEPQ() {
    console.log(this.epq);
    this._employeePQC.postEPQ(this.epq)
      .subscribe(
        (response:any) => (this.employeesEPQCs.push(response)),
        (error) => console.log(error)
      )
  }

  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-m-d',
    maxYear: new Date().getFullYear()
  };

  onDeleteEPQ(id) {
    this._employeePQC.deleteEPQ(id)
      .subscribe(
        (response: any) => (this.onGetEPQbyEmployeeId(id)),
        (error) => console.log(error)
      )
  }

  onPutEPQ() {
    this._employeePQC.putEPQ(this.epq, this.clickedEPQid)
      .subscribe(
        (response) => (this.onGetEPQbyEmployeeId(this.mess)),
        (error) => console.log(error)
      )
  }
}