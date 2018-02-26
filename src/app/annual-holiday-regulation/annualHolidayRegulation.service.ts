import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";


@Injectable()
export class AnnualHolidayRegulationService {

    private _baseUrl: string = 'http://localhost:8080/api/annualHolidayRegulations';

    constructor(private http: Http) { }

    getAHRByEmployee(employeeId: number, businessYear : number) {

        return this.http.get(this._baseUrl + "/findByEmployee/" + employeeId + "/" + businessYear)
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

    createAHRs(){
        return this.http.post(this._baseUrl + "/createAnnualHolidayRegulations",null)
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

    getById(aHR: number) {
        return this.http.get(this._baseUrl + "/findById/" + aHR)
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