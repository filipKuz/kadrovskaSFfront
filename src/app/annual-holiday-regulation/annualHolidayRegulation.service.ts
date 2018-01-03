import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";


@Injectable()
export class AnnualHolidayRegulationService {

    private _baseUrl: string = 'http://localhost:8080/api/annualHolidayRegulations';

    constructor(private http: Http) { }

    getAHRByEmployee(employeeId: number) {

        return this.http.get(this._baseUrl + "/findByEmployee/" + employeeId)
            .map(
                (response: Response) => {
                    const data = response.json();
                    return data;
                }
            ).catch(
                (error: Response) => {
                    return Observable.throw("Something went wrong");
                }
            );
    }
}