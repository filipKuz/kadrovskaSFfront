import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EmployeeService } from './employee.service';
import { EmployeeProfessionalQualificationService } from '../employee-professional-qualifications/employee-professional-qualification.service';
import { MessageService } from '../shared/message.service';
import { NgForm } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel, NgxMyDatePickerDirective } from 'ngx-mydatepicker';
import { CityService } from '../city/city.service';
import { WorkPlaceService } from '../work-place/work-place.service';
import { AnnualHolidayRegulationService } from '../annual-holiday-regulation/annualHolidayRegulation.service';
import { fail } from 'assert';
import { element } from 'protractor';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  workPlaces: any;
  @ViewChild('f') addEmployeeForm: NgForm;
  @ViewChild('fE') editEmployeeForm: NgForm;
  @ViewChild('dp') ngxdp: NgxMyDatePickerDirective;
  @ViewChild('dpE') ngxdpEditModal: NgxMyDatePickerDirective;

  employees = [];
  cities = [];

  all = false;
  activeE = true;

  data = { 'Employee': {}, 'workPlaceId': 0 };
  Employee = {
    'lastName': '',
    'firstName': '',
    'parentName': '',
    'madenName': '',
    'birthDate': '',
    'sex': '',
    'address': '',
    'email': '',
    'phoneNumber': '',
    'cityId': 1,
    'companyId': 0
  };
  AHRclicked = false;
  EPQclicked = false;
  WorkHistoryClicked = false;
  CONTACTSclicked = false;
  ChildrenClicked = false;
  showDialog = false;
  showEditDialog = false;
  showContactInfo = false;
  transormedDate: any = {};

  responseSize = 0;
  pageNum = 0;
  sizeNum = 5;
  totalPages = 0;

  defaultSex = 'M';
  selectedEmployeeId = 0;
  actionForModal = '';
  selectedRow: number;
  setClickedRow: Function;
  searchTerm = '';
  sortTerm = '';
  sortDirection = '';
  sort = '';



  constructor(private employeeService: EmployeeService, private ahrService: AnnualHolidayRegulationService,
    private _messageService: MessageService, private _cityService: CityService,
    private _workPlaceService: WorkPlaceService) {
    this.setClickedRow = function (index) {
      this.selectedRow = index;
    };
  }

  onGetBySearch() {
    this.onSelect();
  }

  radioButton(action) {
    if (action === 'all') {
      this.all = !this.all;
      this.activeE = !this.activeE;
      this.onGetAll();
    } if (action === 'active') {
      this.activeE = !this.activeE;
      this.all = !this.all;
      this.onGet();
    }
  }

  onSelect() {
    if (this.all) {
      this.onGetAll();
    }
    if (this.activeE) {
      this.onGet();
    }
  }

  onSelectSort() {
    var splitSort = this.sort.split('-');
    this.sortTerm = splitSort[0];
    this.sortDirection = splitSort[1];
    console.log(this.sortTerm + ' ' + this.sortDirection);
    this.onSelect();
  }

  selectPageNum(pageNum) {
    this.pageNum = pageNum;
    this.onSelect();
  }

  onNext() {
    if (this.selectedRow == null || this.employees.length - 1 === this.selectedRow) {
      this.selectedRow = 0;
      return;
    }
    this.selectedRow += 1;
  }

  onLastorFirst(condition: string) {
    if (condition === 'last') {
      this.selectedRow = this.employees.length - 1;
      return;
    }
    if (condition === 'first') {
      this.selectedRow = 0;
      return;
    }
  }

  onBack() {
    if (this.selectedRow == null) {
      this.selectedRow = 0;
      return;
    }
    if (this.selectedRow === 0) {
      this.selectedRow = this.employees.length - 1;
      return;
    }
    this.selectedRow -= 1;
  }

  onCreateAHRs() {
    this.ahrService.createAHRs().subscribe(
      (response: any) => (
        this.responseSize = (response).length,
        alert('Kreirali ste ' + this.responseSize + ' resenja za godisnji odmor')
      ),
      (error) => console.log(error)
    );
  }

  ngOnInit() {
    this.onGetAll();
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
    this.actionForModal = 'edit';
    this.onGetById(this.selectedEmployeeId);
    this.showEditDialog = !this.showEditDialog;
  }

  transformFormattedDate(date: string) {
    var dateSpilt = date.split('-');
    this.transormedDate = { date: { year: Number(dateSpilt[0]), month: Number(dateSpilt[1]), day: Number(dateSpilt[2]) } };
  }

  onPopulateJsonEmployee(addressE: string,
    lastName: string,
    firstName: string,
    parentName: string,
    sex: string,
    madenName: string, email: string, phoneNumber: string, companyId: number, cityId: number, birthDate: string) {
    this.Employee.address = addressE;
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
    if (this.actionForModal === 'edit') {
      this.Employee.birthDate = this.transormedDate.date.year + '-' + this.transormedDate.date.month + '-' + this.transormedDate.date.day;
      this.onPut();
      this.resetEditForm();
      this.showEditDialog = !this.showEditDialog;
    }
    if (this.actionForModal === 'add') {
      var dateFromAddForm = this.addEmployeeForm.value.birthDate.date.year + '-' + this.addEmployeeForm.value.birthDate.date.month +
        '-' + this.addEmployeeForm.value.birthDate.date.day;
      this.onPopulateJsonEmployee(this.addEmployeeForm.value.address, this.addEmployeeForm.value.lastName, this.addEmployeeForm.value.name,
        this.addEmployeeForm.value.parentName, this.addEmployeeForm.value.sex, this.addEmployeeForm.value.madenName,
        this.addEmployeeForm.value.email, this.addEmployeeForm.value.phoneNumber, 0,
        this.addEmployeeForm.value.cityId, dateFromAddForm);
      this.data['Employee'] = this.Employee;
      this.data['workPlaceId'] = this.addEmployeeForm.value.workPlaceId;
      this.onPost();
      this.showDialog = !this.showDialog;
    }
    this.resetForm();
  }

  onGet() {
    this.employeeService.getActiveEmployees(this.pageNum, this.sizeNum, this.searchTerm,
      this.sortTerm, this.sortDirection)
      .subscribe(
      (response: any) => (this.employees = response.json(), this.totalPages = Number(response.headers.get('totalPages') * 10)),
      (error) => console.log(error)
      );
  }

  onGetAll() {
    this.employeeService.getAllEmployees(this.pageNum, this.sizeNum, this.searchTerm,
      this.sortTerm, this.sortDirection)
      .subscribe(
      (response: any) => (this.employees = response.json(), this.totalPages = Number(response.headers.get('totalPages') * 10)),
      (error) => console.log(error)
      );
  }

  onGetById(id: number) {
    this.employeeService.getEmployeeById(id)
      .subscribe(
      (response: any) => (this.transformFormattedDate(response.birthDate),
        this.onPopulateJsonEmployee(response.address,
          response.lastName,
          response.firstName,
          response.parentName, response.sex, response.madenName,
          response.email, response.phoneNumber, response.companyId,
          response.cityId, response.birthDate)),
      (error) => console.log(error)
      )
  }

  onPost() {
    this.employeeService.addEmployee(this.data)
      .subscribe(
      (response: any) => (
        this.onGet()
      ),
      (error) => console.log(error)
      );
  }

  onPut() {
    this.employeeService.editEmployee(this.Employee, this.selectedEmployeeId)
      .subscribe(
      (response: any) => (
        this.onGet()
      ),
      (error) => console.log(error)
      );
  }

  onFireEmployee(id) {
    this.selectedEmployeeId = id;
    this.employeeService.deleteEmployee(this.selectedEmployeeId)
      .subscribe(
      (response: any) => (
        this.onGet()
      ),
      (error) => console.log(error)
      );
  }

  setActive() {
    this.CONTACTSclicked = false;
    this.AHRclicked = false;
    this.WorkHistoryClicked = false;
    this.ChildrenClicked = false;
    this.EPQclicked = true;
  }

  setActiveAHR() {
    this.CONTACTSclicked = false;
    this.EPQclicked = false;
    this.WorkHistoryClicked = false;
    this.ChildrenClicked = false;
    this.AHRclicked = true;
  }

  setActiveCONTACTS(id) {
    this.EPQclicked = false;
    this.AHRclicked = false;
    this.WorkHistoryClicked = false;
    this.ChildrenClicked = false;
    this.CONTACTSclicked = true;
  }

  setActiveWorkHistory() {
    this.CONTACTSclicked = false;
    this.EPQclicked = false;
    this.AHRclicked = false;
    this.ChildrenClicked = false;
    this.WorkHistoryClicked = true;
  }

  setActiveChildren() {
    this.CONTACTSclicked = false;
    this.EPQclicked = false;
    this.AHRclicked = false;
    this.WorkHistoryClicked = false;
    this.ChildrenClicked = true;
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

  model: any = { date: { year: '2017', month: '1', day: '19' } };
  onDateChanged(event: IMyDateModel): void {
    // date selected
    console.log(event.date + '  ++++');

  }

  //model: any = { jsdate: new Date() };

  checkDateValidity(): void {
    let valid: boolean = this.ngxdp.isDateValid();
    console.log('Valid date in the input box: ', valid);
  }

  onPopulateDropDownCity() {
    this._cityService.getAllCities().
      subscribe(
      (response: any) => (this.cities = response),
      (error) => (console.log(error))
      );
  }
}