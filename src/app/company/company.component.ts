import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../shared/message.service';
import { CompanyService } from './company.service';
import { CityService } from '../city/city.service';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
    @ViewChild('editForm') editCompanyForm: NgForm;

    company = {
        'companyId': 0,
        'name': '',
        'vat': '',
        'address': '',
        'phoneNumber': '',
        'email': '',
        'cityId': 0
    };
    cities = [];
    city = new Object();

    showEditDialog = false;

    constructor(private _companyService: CompanyService, private _cityService: CityService) {
    }

    ngOnInit() {
        this.getOurCompany();
        this.onPopulateDropDownCity();
    }

    getOurCompany() {
        this._companyService.getOurCompany()
            .subscribe(
            (response: any) => [(this.company = response, this.getCityById(response.cityId))],
            (error) => console.log(error)
            );
    }

    onPopulateDropDownCity() {
        this._cityService.getAllCities().
            subscribe(
            (response: any) => (this.cities = response),
            (error) => (console.log(error))
            );
    }

    getCityById(id) {
        this._cityService.getCityById(id).
            subscribe(
            (response: any) => (this.city = response),
            (error) => (console.log(error))
            );
    }

    onEditCompany() {
        this.showEditDialog = !this.showEditDialog;
    }

    onSubmit() {
        this.onPut();
        this.showEditDialog = !this.showEditDialog;
    }

    onPut() {
        this._companyService.editCompany(this.company, this.company.companyId)
            .subscribe(
            (response: any) => (this.getOurCompany()),
            (error) => console.log(error)
            );
    }
}
