import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { error } from 'selenium-webdriver';

@Injectable()
export class ChildrenService {

    private _baseUrl = 'http://localhost:8080/api/children';

    constructor(private http: Http) { }

    getChildren() {
        return this.http.get(this._baseUrl + '/all')
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

    getChildById(id: number) {
        return this.http.get(this._baseUrl + '/' + id)
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

    getChildrenByEmployee(employeeId: number) {
        return this.http.get(this._baseUrl + '/byEmployee/' + employeeId)
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

    addChild(employee: any) {
        return this.http.post(this._baseUrl, employee);
    }

    editChild(employee: any, id: number) {
        return this.http.put(this._baseUrl + '/' + id, employee);
    }

    deleteChild(id: number) {
        return this.http.put(this._baseUrl + '/delete/' + id, null);
    }
}