import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable()

export class CommonService {

    constructor(private http: HttpClient) { }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error.error || 'server error');
    }

    requestHandler(methodType, apiLink, apiEndPoint, apiBody = {}, headerObj) {
        headerObj = headerObj ? headerObj : { 'Content-Type': 'application/json' };
        methodType = methodType ? methodType : 'post';
        const headers = new HttpHeaders(headerObj);

        if (methodType === 'get') {
            return this.http.get(apiLink + apiEndPoint, { headers: headers })
                .pipe(
                    catchError(this.errorHandler)
                );

        } else if (methodType === 'delete') {

            const options = {
                headers: headers,
                body: apiBody
            };

            return this.http.delete(apiLink + apiEndPoint, options)
                .pipe(
                    catchError(this.errorHandler)
                );

        } else {
            return this.http[methodType](apiLink + apiEndPoint, apiBody, { headers: headers })
                .pipe(
                    catchError(this.errorHandler)
                );
        }
    }
}
