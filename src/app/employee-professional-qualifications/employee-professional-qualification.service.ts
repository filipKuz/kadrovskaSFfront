import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

@Injectable()
export class EmployeeProfessionalQualificationService {

    private _baseUrl: string = 'http://localhost:8080/api/employeePQ';

    constructor(private http: Http) { }

    getByEmployee(employeeId: number) {
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

    getById(epqId: number) {
        return this.http.get(this._baseUrl + "/findById/" + epqId)
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

    postEPQ(epq) {
        return this.http.post(this._baseUrl, epq)
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

    putEPQ(epq, id) {
        return this.http.put(this._baseUrl + "/" + id, epq)
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

    deleteEPQ(id) {
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