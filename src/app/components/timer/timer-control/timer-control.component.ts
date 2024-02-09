import { Component, ViewChild } from '@angular/core';
import { Timer } from 'src/app/models/timer';
import { TimerService } from 'src/app/services/timer.service';
import { ContentModalComponent } from '../../modals/content-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CdTimerComponent } from 'angular-cd-timer';

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

  constructor(private timerService: TimerService, private modalService: NgbModal){}

  ngOnInit() {
    this.getTimers();
  }

  public getTimers() {
    this.timerService.getTimers()
      .subscribe({
        next: (response) => {
          this.timers = response.object;
          this.chosedTimer = this.timers[0];
          this.resetTimer();
        },
        error: (e) => this.abrirContentModal('Ops!', e)
      });
  }

  public resetTimer() {
    this.timer.reset();
    this.timer.countdown = true;
    this.timer.startTime = this.chosedTimer.seconds;
    this.timer.start();
    this.pauseTimer();
    this.started = false;
  }
  
  public startTimer() {
    this.timer.resume();
    this.started = true;
  }

  public pauseTimer() {
    this.timer.stop();
    this.started = false;
  }

  public abrirContentModal(title: string, message: string) {
    var modalRef = this.modalService.open(ContentModalComponent, { size: 'sm' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
  }

  public selectTimer(timer: Timer) {
    this.chosedTimer = timer;
    this.resetTimer();
  }
}
