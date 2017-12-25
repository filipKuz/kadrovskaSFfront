import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EmployeeService } from './employee.service';
import { EmployeeProfessionalQualificationService } from '../employee-professional-qualifications/employee-professional-qualification.service';
import { MessageService } from '../shared/message.service';
import { NgForm } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel, NgxMyDatePickerDirective } from 'ngx-mydatepicker';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @ViewChild('f') addEmployeeForm: NgForm;
  @ViewChild('dp') ngxdp: NgxMyDatePickerDirective;

  employees = [];
  newEmployee = {
    "lastName": "",
    "firstName": "",
    "parentName": "",
    "madenName": "",
    "birthDate": "",
    "sex": "",
    "address": "",
    "email": "",
    "phoneNumber": "",
    "numberOfVacationDaysLeft": 0,
    "cityId": 1,
    "companyId": 1
};
  EPQclicked: boolean = false; 
  showDialog = false;

  defaultSex = "M";

  selectedRow: Number;
  setClickedRow: Function;

  constructor(private employeeService: EmployeeService, 
              private _messageService: MessageService) { 
    this.setClickedRow = function(index) {
      this.selectedRow = index;
    }
  }

  ngOnInit() {
    this.onGet();
  }
  
  resetForm() {
    this.addEmployeeForm.resetForm();
  }

  onSubmit() {
    this.newEmployee.address = this.addEmployeeForm.value.address;
    this.newEmployee.lastName = this.addEmployeeForm.value.lastName;
    this.newEmployee.firstName = this.addEmployeeForm.value.name;
    this.newEmployee.parentName = this.addEmployeeForm.value.parentName;
    this.newEmployee.sex = this.addEmployeeForm.value.sex;
    this.newEmployee.madenName = this.addEmployeeForm.value.madenName;
    this.newEmployee.email = this.addEmployeeForm.value.email;
    this.newEmployee.phoneNumber = this.addEmployeeForm.value.phoneNumber; 
    this.newEmployee.companyId = this.addEmployeeForm.value.companyId; 
    this.newEmployee.cityId = this.addEmployeeForm.value.cityId; 
    this.newEmployee.birthDate = this.addEmployeeForm.value.birthDate.date.year + "-" + this.addEmployeeForm.value.birthDate.date.month + "-" + this.addEmployeeForm.value.birthDate.date.day;
    //console.log(this.newEmployee.birthDate);
    this.onPost();
    this.resetForm();
    this.showDialog = !this.showDialog;
  }

  onGet() {
    this.employeeService.getEmployees()
      .subscribe(
      (response: any) => (this.employees = response),
      (error) => console.log(error)
      );
  }

  onPost() {
    this.employeeService.addEmployee(this.newEmployee)
      .subscribe(
        (response) => [this.employees.push(response.json()), console.log(this.employees)],
        (error) => console.log(error)
      );
  }

  setActive() {
    this.EPQclicked = true;
  }
  sendMessage(message:string): void {
    // send message to subscribers via observable subject
    this._messageService.sendMessage(message);
  }

  clearMessage(): void {
    // clear message
    this._messageService.clearMessage();
  }

  //for datepicker
  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
  };

  model: any = { date: { year: 2018, month: 10, day: 9 } };
  onDateChanged(event: IMyDateModel): void {
  // date selected
    console.log(event.date +  "  ++++");
  }

  checkDateValidity(): void {
    let valid: boolean = this.ngxdp.isDateValid();
    console.log('Valid date in the input box: ', valid);
}
}
