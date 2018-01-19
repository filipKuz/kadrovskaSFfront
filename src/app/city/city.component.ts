import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CityService } from './city.service';
import { MessageService } from '../shared/message.service';
import { NgForm } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel, NgxMyDatePickerDirective } from 'ngx-mydatepicker';
import { WorkPlaceService } from '../work-place/work-place.service';
import { AnnualHolidayRegulationService } from '../annual-holiday-regulation/annualHolidayRegulation.service';
import { fail } from 'assert';
import { element } from 'protractor';


@Component({
  selector: 'app-cities',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  @ViewChild('f') addCityForm: NgForm;
  @ViewChild('fE') editCityForm: NgForm;

  cities = [];

  data = { 'City': {} };
  City = {
    'cityId': 0,
    'zipCode': 0,
    'cityName': '',
  };
  employeesClicked = false;
  showDialog = false;
  showEditDialog = false;

  pageNum = 0;
  sizeNum = 5;
  totalPages = 0;

  selectedCityId = 0;
  actionForModal = '';
  selectedRow: number;
  setClickedRow: Function;
  searchTerm = '';
  sortTerm = '';
  sortDirection = '';
  sort = '';



  constructor(private _cityService: CityService, private _messageService: MessageService) {
    this.setClickedRow = function (index) {
      this.selectedRow = index;
    };
  }

  onSelectSort() {
    const splitSort = this.sort.split('-');
    this.sortTerm = splitSort[0];
    this.sortDirection = splitSort[1];
    console.log(this.sortTerm + ' ' + this.sortDirection);
    this.onGetAll();
  }

  selectPageNum(pageNum) {
    this.pageNum = pageNum;
    this.onGetAll();
  }

  onNext() {
    if (this.selectedRow == null || this.cities.length - 1 === this.selectedRow) {
      this.selectedRow = 0;
      return;
    }
    this.selectedRow += 1;
  }

  onLastorFirst(condition: string) {
    if (condition === 'last') {
      this.selectedRow = this.cities.length - 1;
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
      this.selectedRow = this.cities.length - 1;
      return;
    }
    this.selectedRow -= 1;
  }

  ngOnInit() {
    this.onGetAll();
  }

  resetForm() {
    this.addCityForm.resetForm();
  }

  resetEditForm() {
    this.editCityForm.resetForm();
  }

  onEditCity(id) {
    this.resetEditForm();
    this.selectedCityId = id;
    this.actionForModal = 'edit';
    this.onGetById(this.selectedCityId);
    this.showEditDialog = !this.showEditDialog;
  }

  onPopulateJsonCity(zipCode: number, cityName: string) {
    this.City.cityName = cityName;
    this.City.zipCode = zipCode;
  }

  onSubmit() {
    if (this.actionForModal === 'edit') {
      this.onPut();
      this.resetEditForm();
      this.showEditDialog = !this.showEditDialog;
    }
    if (this.actionForModal === 'add') {
      this.onPopulateJsonCity(this.addCityForm.value.zipCode, this.addCityForm.value.cityName);
      this.data['City'] = this.City;
      this.onPost();
      this.showDialog = !this.showDialog;
    }
    this.resetForm();
  }

  onGetAll() {
    this._cityService.getCities(this.pageNum, this.sizeNum, this.searchTerm,
      this.sortTerm, this.sortDirection)
      .subscribe(
      (response: any) => (this.cities = response.json(), this.totalPages = Number(response.headers.get('totalPages') * 10)),
      (error) => console.log(error)
      );
  }

  onGetById(id: number) {
    this._cityService.getCityById(id)
      .subscribe(
      (response: any) => (this.onPopulateJsonCity(response.zipCode, response.cityName)),
      (error) => console.log(error)
      );
  }

  onPost() {
    this._cityService.addCity(this.data)
      .subscribe(
      (response: any) => (
        this.onGetAll()
      ),
      (error) => console.log(error)
      );
  }

  onPut() {
    this._cityService.editCity(this.City, this.selectedCityId)
      .subscribe(
      (response: any) => (
        this.onGetAll()
      ),
      (error) => console.log(error)
      );
  }

  sendMessage(message: string): void {
    // send message to subscribers via observable subject
    this._messageService.sendMessage(message);
  }

  clearMessage(): void {
    // clear message
    this._messageService.clearMessage();
  }

  setActiveEmployees() {
    this.employeesClicked = true;
  }
}
