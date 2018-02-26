import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

@Injectable()
export class VacationReqService {

    private _baseUrl: string = 'http://localhost:8080/api/vacationReq';

    constructor(private http: Http) { }

    getByAHR(annualHolidayRegulationId: number) {
        return this.http.get(this._baseUrl + "/findByAHRId/" + annualHolidayRegulationId)
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

    getById(vReq: number) {
        return this.http.get(this._baseUrl + "/findById/" + vReq)
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

    postVReq(vReq) {
        return this.http.post(this._baseUrl, vReq)
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


    deleteVReq(id) {
        return this.http.delete(this._baseUrl + "/" + id)
            .map(
            (response: Response) => {
                const data = response;
                return data;
            }
            ).catch(
            (error: Response) => {
                return Observable.throw("Something went wrong");
            }
            );
    }
}