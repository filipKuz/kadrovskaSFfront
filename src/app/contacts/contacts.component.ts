import { Component, OnInit, OnDestroy } from '@angular/core';

import { MessageService } from '../shared/message.service';
import { Subscription } from 'rxjs/Subscription';
import { EmployeeService } from '../employee/employee.service';
import { CityService } from '../city/city.service';
import { error } from 'selenium-webdriver';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  employee = {
    "lastName": "",
    "firstName": "",
    "parentName": "",
    "madenName": "",
    "birthDate": "",
    "sex": "",
    "address": "",
    "email": "",
    "phoneNumber": "",
    "cityId": 1,
    "companyId": 0
  };

  mess: string = "22";
  cityName:string = "";
  
  constructor(private EmployeeService: EmployeeService,
              private _messageService: MessageService,
              private _cityService: CityService) {
    this.subscription = this._messageService.getMessage()
                                            .subscribe(message => 
                                                { this.mess = message.text, this.onGetEmployeeByID(message.text); }
                                              );
                                              
  }

  ngOnInit() {
  }

  onGetEmployeeByID(employeeId) {
    this.EmployeeService.getEmployeeById(employeeId)
      .subscribe(
      (response: any) => [(this.employee = response), this.ngOngetCity(response.cityId)],
      (error) => console.log(error)
      );
  }

  ngOngetCity(id) {
    this._cityService.getCityById(id)
      .subscribe(
        (response: any) => this.cityName = response.cityName,
        (error) => console.log(error)
      )
  }
  
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
