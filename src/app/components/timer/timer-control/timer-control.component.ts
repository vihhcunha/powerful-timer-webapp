import { Component, ViewChild } from '@angular/core';
import { Timer } from 'src/app/models/timer';
import { TimerService } from 'src/app/services/timer.service';
import { ContentModalComponent } from '../../modals/content-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CdTimerComponent } from 'angular-cd-timer';
import { TimerWebSocketService } from 'src/app/services/timer-web-socket.service';
import { TimerWebSocket } from 'src/app/models/timerWebSocket';

@Component({
  selector: 'app-timer-control',
  templateUrl: './timer-control.component.html'
})
export class TimerControlComponent {
  public chosedTimer: Timer = new Timer();
  public timers: Timer[];
  public started: boolean;

  @ViewChild(CdTimerComponent)
  public timer: CdTimerComponent;

  constructor(private timerService: TimerService, private modalService: NgbModal, private webSocketService: TimerWebSocketService) {

  }

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

  public handleWebSocketMessage(timerWebSocket: TimerWebSocket) {
    if (timerWebSocket.timerId != this.chosedTimer.timerId) {
      var timer = this.timers.find(x => x.timerId == timerWebSocket.timerId);

      if (timer != null)
        this.selectTimer(timer, false);

      return;
    }

    if (timerWebSocket.stop){
      this.resetTimer(false);
      return;
    }

    if (timerWebSocket.play && this.started == false){
      this.startTimer(false);
    }
    else if (timerWebSocket.play == false && this.started){
      this.pauseTimer(false);
    }
  }

  public getTimers() {
    this.timerService.getTimers()
      .subscribe({
        next: (response) => {
          this.timers = response.object;

          if (this.timers && this.timers.length > 0){
            this.chosedTimer = this.timers[0];
            this.resetTimer();
          }
        },
        error: (e) => this.abrirContentModal('Ops!', e)
      });
  }

  public resetTimer(sendWebSocket: boolean = true) {
    this.timer.reset();
    this.timer.countdown = true;
    this.timer.startTime = this.chosedTimer.seconds;
    this.timer.start();
    this.timer.stop();
    this.started = false;

    if (sendWebSocket)
      this.webSocketService.sendMessage(this.createTimerWebSocket(false, true));
  }

  public startTimer(sendWebSocket: boolean = true) {
    this.timer.resume();
    this.started = true;

    if (sendWebSocket)
      this.webSocketService.sendMessage(this.createTimerWebSocket(true));
  }

  public pauseTimer(sendWebSocket: boolean = true) {
    this.timer.stop();
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

  public createTimerWebSocket(play: boolean, stop: boolean = false): TimerWebSocket {
    var timerWebSocket = new TimerWebSocket();
    timerWebSocket.timerId = this.chosedTimer.timerId;
    timerWebSocket.play = play;
    timerWebSocket.stop = stop;

    return timerWebSocket;
  }
}
