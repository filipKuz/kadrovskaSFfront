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

    companyNameVar: string = "";
    companyAddressVar: string = "";
    companyPgoneNumberVar: string="";
    companyEmailVar: string = "";
    companyVatVar: string = "";
    companyCityIdVar: number = 0;

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

    onEditJsonCompany(companyName:string, companyAddress: string, companyPhone:string, companyEmail:string, companyVat: string, companyCityId:number ){
        this.company.name = companyName;
        this.company.address = companyAddress;
        this.company.phoneNumber = companyPhone;
        this.company.email = companyEmail;
        this.company.vat = companyVat;
        this.company.cityId = companyCityId;
    }

    onPopulateCompanyVar(){
        this.companyNameVar = this.company.name;
        this.companyAddressVar = this.company.address;
        this.companyPgoneNumberVar = this.company.phoneNumber;
        this.companyEmailVar = this.company.email;
        this.companyVatVar = this.company.vat;
        this.companyCityIdVar = this.company.cityId;
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
        this.onPopulateCompanyVar();
        this.showEditDialog = !this.showEditDialog;
    }

    onSubmit() {
        this.onEditJsonCompany(this.companyNameVar,this.companyAddressVar,this.companyPgoneNumberVar,this.companyEmailVar,this.companyVatVar, this.companyCityIdVar);
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
