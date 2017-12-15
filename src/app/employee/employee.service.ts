import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";


@Injectable()
export class EmployeeService {

    private _baseUrl: string = 'http://localhost:8080/api/employees';

    constructor(private http: Http) { }

    getEmployees() {
        return this.http.get(this._baseUrl)
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
}