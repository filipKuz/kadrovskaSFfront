import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { error } from 'selenium-webdriver';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class CompanyService {

    private _baseUrl = 'http://localhost:8080/api/companies';

    constructor(private _http: Http) { }

    getAllCompanies() {
        return this._http.get(this._baseUrl + '/all')
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(
            (e: Error) => {
                return Observable.throw('Something went wrong');
            }
            );
    }


    getOurCompany() {
        return this._http.get(this._baseUrl + '/ours')
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(
            (e: Error) => {
                return Observable.throw('Something went wrong');
            }
            );
    }

    editCompany(company: any, id: number) {
        return this._http.put(this._baseUrl + '/' + id, company);
    }
}
