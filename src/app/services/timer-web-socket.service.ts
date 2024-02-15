import { Inject, Injectable } from '@angular/core';
import { TimerWebSocketRequest, TimerWebSocketResponse } from '../models/timerWebSocket';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TimerWebSocketService {
    private socket: WebSocket;

    constructor(@Inject("BASE_URL_WEB_SOCKET") baseUrl: string) {
        const namespace = "ws/timer";
        this.socket = new WebSocket(baseUrl + namespace);

        this.socket.onopen = (event) => {
            console.log('WebSocket connection opened:', event);
        };

        this.socket.onmessage = (event) => {
            console.log('WebSocket message received:', event.data);
        };

        this.socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
        };

        setInterval(() => {
            if(this.socket.OPEN) this.socket.send("");
        }, 60000);
    }

    public sendMessage(timerWebSocket: TimerWebSocketRequest) {
        if(this.socket.OPEN)
            this.socket.send(JSON.stringify(timerWebSocket));
    }

    public disconnect() {
        this.socket.close();
    }

    public listenMessage(): Observable<TimerWebSocketResponse> {
        var observer = new Observable<TimerWebSocketResponse>((observer) => {
            this.socket.onmessage = (event) => {
                observer.next(JSON.parse(event.data));
            }
        })
        return observer;
    }
}