import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { error } from "selenium-webdriver";

@Injectable()
export class EmployeeService {

    private _baseUrl: string = 'http://localhost:8080/api/employees';

    constructor(private http: Http) { }

    getActiveEmployees() {
        return this.http.get(this._baseUrl + "/activeEmployees")
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(
            (error: Response) => {
                return Observable.throw('Something went wrong');
            }
            );
    }

    getEmployeeById(id: number) {
        return this.http.get(this._baseUrl + "/" + id)
            .map(
                (response: Response) => {
                    const data = response.json();
                    return data;
                }
            ).catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong');
                }
            );
    }

    addEmployee(employee: any) {
        return this.http.post(this._baseUrl, employee);
    }

    editEmployee(employee: any, id: number) {
        return this.http.put(this._baseUrl + "/" + id, employee);
    }

    deleteEmployee(id: number) {
        return this.http.put(this._baseUrl + "/delete" + id, null);
    }
}