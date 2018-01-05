import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { error } from "selenium-webdriver";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';


@Injectable()
export class CityService {

    private _baseUrl:string =  'http://localhost:8080/api/cities';

    constructor(private _http: Http) {    }

    getCities() {
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

    getCityById(id) {
        return this._http.get(this._baseUrl + "/" + id)
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

}