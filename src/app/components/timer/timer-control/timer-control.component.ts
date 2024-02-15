import { Component, ViewChild } from '@angular/core';
import { Timer } from 'src/app/models/timer';
import { TimerService } from 'src/app/services/timer.service';
import { ContentModalComponent } from '../../modals/content-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimerWebSocketService } from 'src/app/services/timer-web-socket.service';
import { TimerWebSocketRequest, TimerWebSocketResponse } from 'src/app/models/timerWebSocket';

@Component({
  selector: 'app-timer-control',
  templateUrl: './timer-control.component.html',
  providers: [TimerWebSocketService]
})
export class TimerControlComponent {
  public chosedTimer: Timer = new Timer();
  public timers: Timer[] = [];
  public started: boolean;
  public isCountingUp: boolean = false;
  public hours: number;
  public minutes: number;
  public seconds: number;

  public math = Math;

  constructor(private timerService: TimerService, private modalService: NgbModal, private webSocketService: TimerWebSocketService) { }

  ngOnInit() {
    this.webSocketService.listenMessage()
      .subscribe({
        next: this.handleWebSocketMessage.bind(this)
      })
    this.getTimers();
  }

  ngOnDestroy() {
    this.webSocketService.disconnect();
  }

  public handleWebSocketMessage(timerWebSocket: TimerWebSocketResponse) {
    if (timerWebSocket.timerId != this.chosedTimer.timerId) {
      var timer = this.timers.find(x => x.timerId == timerWebSocket.timerId);
      this.selectTimer(timer!, false);
    }

    if (timerWebSocket.stop) {
      this.resetTimer(false);
    }

    if (timerWebSocket.play) {
      this.startTimer(false);
      console.log(`${timerWebSocket.hours}:${timerWebSocket.minutes}:${timerWebSocket.seconds}`)
    }

    if (timerWebSocket.pause) {
      this.pauseTimer(false);
    }

    this.hours = timerWebSocket.hours;
    this.minutes = timerWebSocket.minutes;
    this.seconds = timerWebSocket.seconds;

    this.setIfItIsCountingUp();
  }

  setIfItIsCountingUp() {
    if (this.hours >= 0 && this.minutes >= 0 && this.seconds >= 0){
      this.isCountingUp = false;
    }
    else{
      this.isCountingUp = true;
    }
  }

  public getTimers() {
    this.timerService.getTimers()
      .subscribe({
        next: (response) => {
          this.timers = response.object;

          if (this.timers.length > 0) {
            this.chosedTimer = this.timers[0];
            this.resetTimer(false);
            this.hours = Math.floor(this.chosedTimer.seconds / 3600);
            this.minutes = Math.floor((this.chosedTimer.seconds % 3600) / 60);
            this.seconds = Math.floor(this.chosedTimer.seconds % 60);
          }
        },
        error: (e) => this.abrirContentModal('Ops!', e)
      });
  }

  public resetTimer(sendWebSocket: boolean = true) {
    this.isCountingUp = false;
    this.started = false;

    if (sendWebSocket)
      this.webSocketService.sendMessage(this.createTimerWebSocket(false, true));
  }

  public startTimer(sendWebSocket: boolean = true) {
    this.started = true;

    if (sendWebSocket)
      this.webSocketService.sendMessage(this.createTimerWebSocket(true));
  }

  public pauseTimer(sendWebSocket: boolean = true) {
    this.started = false;

    if (sendWebSocket)
      this.webSocketService.sendMessage(this.createTimerWebSocket(false));
  }

  public abrirContentModal(title: string, message: string) {
    var modalRef = this.modalService.open(ContentModalComponent, { size: 'sm' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
  }

  public selectTimer(timer: Timer, sendWebSocketMessage: boolean = true) {
    this.chosedTimer = timer;
    this.resetTimer(sendWebSocketMessage);
  }

  public createTimerWebSocket(play: boolean, stop: boolean = false): TimerWebSocketRequest {
    var timerWebSocket = new TimerWebSocketRequest();
    timerWebSocket.timerId = this.chosedTimer.timerId;
    timerWebSocket.play = play;
    timerWebSocket.pause = !play;
    timerWebSocket.stop = stop;
    timerWebSocket.seconds = this.chosedTimer.seconds;

    return timerWebSocket;
  }
}
