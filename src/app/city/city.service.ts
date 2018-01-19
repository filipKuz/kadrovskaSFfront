import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { error } from "selenium-webdriver";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';


@Injectable()
export class CityService {

    private _baseUrl = 'http://localhost:8080/api/cities';

    constructor(private _http: Http) { }

    getAllCities() {
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

    getCities(pageNum, sizeNum, searchTerm, sortTerm, sortDirection) {
        return this._http.get(this._baseUrl + '?page=' +
            pageNum + '&size=' + sizeNum + '&searchTerm=' + searchTerm + '&sortTerm=' + sortTerm + '&sortDirection=' + sortDirection)
            .map(
            (response: Response) => {
                const data = response;
                return data;
            }
            ).catch(
            (e: Error) => {
                return Observable.throw('Something went wrong');
            }
            );
    }

    getCityById(id) {
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

    addCity(city: any) {
        return this._http.post(this._baseUrl, city);
    }

    editCity(city: any, id: number) {
        return this._http.put(this._baseUrl + '/' + id, city);
    }
}
