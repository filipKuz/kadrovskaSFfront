import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

@Injectable()
export class WorkHistoryService{


    private _baseUrl: string = 'http://localhost:8080/api/workHistory';

    constructor(private _http: Http) {}


    getAllWorkHistories() {
        return this._http.get(this._baseUrl)
            .map(
                (response: Response) => {
                    const data = response.json();
                    return data;
                }
            ).catch(
                (error: Error) => {
                    return Observable.throw("Something went wrong");
                }
            );
    }

    getByEmployee(employeeId: number) {
        return this._http.get(this._baseUrl + "/findByEmployeeId/" + employeeId)
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

    getWorkHistoryById(id) {
        return this._http.get(this._baseUrl + '/' + id)
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

    newWorkHistory(workHistory) {
        return this._http.post(this._baseUrl, workHistory)
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

    editWorkHistory(workHistory, id) {
        return this._http.put(this._baseUrl + "/" + id, workHistory)
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


    addWorkHistory(workHistory: any){
        return this._http.post(this._baseUrl, workHistory);
    }

    

    deleteWorkHistory(id) {
        return this._http.delete(this._baseUrl + "/" + id);
    }



}