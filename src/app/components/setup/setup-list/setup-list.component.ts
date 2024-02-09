import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Timer } from 'src/app/models/timer';
import { TimerService } from 'src/app/services/timer.service';
import { AddEditTimerComponent } from '../add-edit-timer/add-edit-timer.component';
import { ContentModalComponent } from '../../modals/content-modal.component';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-setup-list',
  templateUrl: './setup-list.component.html'
})
export class SetupListComponent {
  timers: Timer[];

  constructor(private timerService: TimerService, private modalService: NgbModal, private title: Title) { }

  ngOnInit() {
    this.getTimers();
    this.title.setTitle("Timer - Setup");
  }

  public getTimers() {
    this.timerService.getTimers()
      .subscribe({
        next: (response) => {
          this.timers = response.object;
        },
        error: (e) => this.abrirContentModal('Ops!', e)
      });
  }

  public addTimer() {
    var modalRef = this.modalService.open(AddEditTimerComponent);
    modalRef.closed.subscribe({
      next: () => {
        this.getTimers();
      }
    })
  }

  public edit(timer: Timer) {
    var modalRef = this.modalService.open(AddEditTimerComponent);
    modalRef.componentInstance.timer = timer;
    modalRef.closed.subscribe({
      next: () => {
        this.getTimers();
      }
    })
  }

  public delete(id: string) {
    this.timerService.deleteTimer(id)
      .subscribe({
        next: () => {
          this.getTimers();
        },
        error: (e) => this.abrirContentModal('Ops!', e)
      });
  }

  public abrirContentModal(title: string, message: string) {
    var modalRef = this.modalService.open(ContentModalComponent, { size: 'sm' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
  }

  public drop(event: any){
    moveItemInArray(this.timers, event.previousIndex, event.currentIndex);
    this.timers.forEach((timer, index) => timer.order = index);
    this.changeOrder();
  }

  public changeOrder() {
    this.timerService.reorderTimers(this.timers)
      .subscribe({
        next: () => {},
        error: (e) => this.abrirContentModal('Ops!', e)
      });
  }
}
