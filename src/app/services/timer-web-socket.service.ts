import { Inject, Injectable } from '@angular/core';
import { TimerWebSocket } from '../models/timerWebSocket';
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
    }

    public sendMessage(timerWebSocket: TimerWebSocket) {
        this.socket.send(JSON.stringify(timerWebSocket));
    }

    public disconnect() {
        this.socket.close();
    }

    public listenMessage(): Observable<TimerWebSocket> {
        var observer = new Observable<TimerWebSocket>((observer) => {
            this.socket.onmessage = (event) => {
                observer.next(JSON.parse(event.data));
            }
        })
        return observer;
    }
}