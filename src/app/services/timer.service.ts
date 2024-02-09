import { Inject, Injectable } from "@angular/core";
import { BaseService } from "./base/base.service";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { Response } from "../models/response";
import { Timer } from "../models/timer";

@Injectable({
    providedIn: "root"
})
export class TimerService extends BaseService {
    constructor(private http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
        super();
        this._baseUrl = baseUrl;
    }

    public getTimers(): Observable<Response<Timer[]>> {
        return this.http.get<Response<Timer[]>>(this._baseUrl + "api/timer",
            { headers: this.headersAnonymous })
            .pipe(
                catchError(super.handleError)
            );
    }

    public addTimer(timer: Timer): Observable<Response<null>> {
        return this.http.post<Response<null>>(this._baseUrl + "api/timer", JSON.stringify(timer),
            { headers: this.headersAnonymous })
            .pipe(
                catchError(super.handleError)
            );
    }

    public editTimer(timer: Timer): Observable<Response<null>> {
        return this.http.put<Response<null>>(this._baseUrl + "api/timer/" + timer.timerId, JSON.stringify(timer),
            { headers: this.headersAnonymous })
            .pipe(
                catchError(super.handleError)
            );
    }

    public reorderTimers(timers: Timer[]): Observable<Response<null>> {
        return this.http.put<Response<null>>(this._baseUrl + "api/timer/reorder", JSON.stringify(timers),
            { headers: this.headersAnonymous })
            .pipe(
                catchError(super.handleError)
            );
    }

    public deleteTimer(id: string): Observable<Response<null>> {
        return this.http.delete<Response<null>>(this._baseUrl + "api/timer/" + id,
            { headers: this.headersAnonymous })
            .pipe(
                catchError(super.handleError)
            );
    }
}