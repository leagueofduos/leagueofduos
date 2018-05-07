import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Acesso } from './acesso.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Acesso>;

@Injectable()
export class AcessoService {

    private resourceUrl =  SERVER_API_URL + 'api/acessos';

    constructor(private http: HttpClient) { }

    create(acesso: Acesso): Observable<EntityResponseType> {
        const copy = this.convert(acesso);
        return this.http.post<Acesso>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(acesso: Acesso): Observable<EntityResponseType> {
        const copy = this.convert(acesso);
        return this.http.put<Acesso>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Acesso>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Acesso[]>> {
        const options = createRequestOption(req);
        return this.http.get<Acesso[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Acesso[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Acesso = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Acesso[]>): HttpResponse<Acesso[]> {
        const jsonResponse: Acesso[] = res.body;
        const body: Acesso[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Acesso.
     */
    private convertItemFromServer(acesso: Acesso): Acesso {
        const copy: Acesso = Object.assign({}, acesso);
        return copy;
    }

    /**
     * Convert a Acesso to a JSON which can be sent to the server.
     */
    private convert(acesso: Acesso): Acesso {
        const copy: Acesso = Object.assign({}, acesso);
        return copy;
    }
}
