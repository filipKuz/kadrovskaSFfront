import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ProfessionalQualificationService {

    private _baseUrl: string = 'http://localhost:8080/api/PQ';

    constructor(private http: Http) { }

    getProfessionalQualification() {
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

    postPQ(pq) {
        return this.http.post(this._baseUrl, pq)
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

    getPQById(id: number) {
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

    editPQ(pq: any, id: number) {
        return this.http.put(this._baseUrl + "/" + id, pq);
    }

    deletePQ(id) {
        return this.http.put(this._baseUrl + "/delete/" + id, null);
    }
}