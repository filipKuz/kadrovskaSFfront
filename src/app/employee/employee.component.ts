import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EmployeeService } from './employee.service';
import { EmployeeProfessionalQualificationService } from '../employee-professional-qualifications/employee-professional-qualification.service';
import { MessageService } from '../shared/message.service';
import { NgForm } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel, NgxMyDatePickerDirective } from 'ngx-mydatepicker';
import { CityService } from '../city/city.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @ViewChild('f') addEmployeeForm: NgForm;
  @ViewChild('fE') editEmployeeForm: NgForm;
  @ViewChild('dp') ngxdp: NgxMyDatePickerDirective;
  @ViewChild('dpE') ngxdpEditModal: NgxMyDatePickerDirective;

  employees = [];
  cities = [];

  Employee = {
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
  showEditDialog = false;

  transormedDate: any = {};

  defaultSex = "M";
  selectedEmployeeId = 0;
  actionForModal = "";
  selectedRow: Number;
  setClickedRow: Function;

  constructor(private employeeService: EmployeeService,
    private _messageService: MessageService, private _cityService: CityService) {
    this.setClickedRow = function (index) {
      this.selectedRow = index;
    }
  }

  ngOnInit() {
    this.onGet();
    this.onPopulateDropDownCity();
  }

  resetForm() {
    this.addEmployeeForm.resetForm();
  }

  resetEditForm() {
    this.editEmployeeForm.resetForm();
  }

  onEditEmployee(id) {
    this.resetEditForm();
    this.selectedEmployeeId = id;
    this.actionForModal = "edit";
    this.onGetById(this.selectedEmployeeId);
    this.showEditDialog = !this.showEditDialog;
  }

  transformFormattedDate(date:string) {
    var dateSpilt = date.split("-");
  
    this.transormedDate = {date : {year : Number(dateSpilt[0]), month: Number(dateSpilt[1]), day: Number(dateSpilt[2]) } };
    console.log(this.transormedDate);
    
  }


  onPopulateJsonEmployee(addressE: string,
    lastName: string,
    firstName: string,
    parentName: string,
    sex: string,
    madenName: string, email: string, phoneNumber: string, companyId: number, cityId: number, birthDate: string) {
    this.Employee.address = addressE
    this.Employee.lastName = lastName;
    this.Employee.firstName = firstName;
    this.Employee.parentName = parentName;
    this.Employee.sex = sex;
    this.Employee.madenName = madenName;
    this.Employee.email = email;
    this.Employee.phoneNumber = phoneNumber;
    this.Employee.companyId = companyId;
    this.Employee.cityId = cityId;
    this.Employee.birthDate = birthDate;
  }

  onSubmit() {

    if (this.actionForModal === "edit") {
      this.Employee.birthDate = this.editEmployeeForm.value.birthDateEdit.formatted;
      this.onPut();
      this.resetEditForm();
      this.showEditDialog = !this.showEditDialog;
    }
    if (this.actionForModal === "add") {
      var dateFromAddForm = this.addEmployeeForm.value.birthDate.formatted;
      this.onPopulateJsonEmployee(this.addEmployeeForm.value.address, this.addEmployeeForm.value.lastName, this.addEmployeeForm.value.name,
        this.addEmployeeForm.value.parentName, this.addEmployeeForm.value.sex, this.addEmployeeForm.value.madenName,
        this.addEmployeeForm.value.email, this.addEmployeeForm.value.phoneNumber, this.addEmployeeForm.value.companyId,
        this.addEmployeeForm.value.cityId, dateFromAddForm);
      //console.log(this.newEmployee.birthDate);
      this.onPost();
      this.showDialog = !this.showDialog;
    }

    this.resetForm();
  }

  onGet() {
    this.employeeService.getActiveEmployees()
      .subscribe(
      (response: any) => (this.employees = response),
      (error) => console.log(error)
      );
  }

  onGetById(id: number) {
    this.employeeService.getEmployeeById(id)
      .subscribe(
      (response: any) => (this.onPopulateJsonEmployee(response.address,
        response.lastName,
        response.firstName,
        response.parentName, response.sex, response.madenName,
        response.email, response.phoneNumber, response.companyId,
        response.cityId, response.birthDate), this.transformFormattedDate(response.birthDate)),
      (error) => console.log(error)
      )
  }

  onPost() {
    this.employeeService.addEmployee(this.Employee)
      .subscribe(
      (response) => [this.employees.push(response.json())],
      (error) => console.log(error)
      );
  }

  onPut() {
    this.employeeService.editEmployee(this.Employee, this.selectedEmployeeId)
      .subscribe(
      (response) => this.employees.push(response.json()),
      (error) => console.log(error)
      );
  }

  setActive() {
    this.EPQclicked = true;
  }
  sendMessage(message: string): void {
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
    dateFormat: 'yyyy-m-d',
    maxYear: new Date().getFullYear()
  };

  //model: any = { date: { year: "2017", month: "1", day: "19" } };
  onDateChanged(event: IMyDateModel): void {
    // date selected
    console.log(event.date + "  ++++");
   
  }

  model: any = { jsdate: new Date() };

  checkDateValidity(): void {
    let valid: boolean = this.ngxdp.isDateValid();
    console.log('Valid date in the input box: ', valid);
  }

  onPopulateDropDownCity() {
    this._cityService.getCities().
      subscribe(
        (response: any) => (this.cities = response),
        (error) => (console.log(error))
      );
  }
}
