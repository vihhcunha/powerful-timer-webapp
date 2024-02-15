export class TimerWebSocketRequest {
    public timerId: string;
    public play: boolean;
    public stop: boolean;
    public pause: boolean;
    public seconds: number;
}

export class TimerWebSocketResponse {
    public timerId: string;
    public play: boolean;
    public stop: boolean;
    public pause: boolean;
    public hours: number;
    public minutes: number;
    public seconds: number;
}