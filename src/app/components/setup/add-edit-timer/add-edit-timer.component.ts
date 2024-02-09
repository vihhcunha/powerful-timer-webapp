import { Component, Input } from '@angular/core';
import { AddEditTimer, Timer } from 'src/app/models/timer';
import { BaseFormComponent } from '../../base/base-form/base-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-add-edit-timer',
  templateUrl: './add-edit-timer.component.html'
})
export class AddEditTimerComponent extends BaseFormComponent<AddEditTimer> {
  @Input() timer: Timer;
  public isNewTimer: boolean = false;

  override validationMessages = {
    name: {
      required: "É necessário definir o nome do timer!"
    },
    hours: {
      required: "É necessário definir a quantidade de horas!",
      min: "Valor mínimo: 0"
    },
    minutes: {
      required: "É necessário definir a quantidade de minutos!",
      min: "Valor mínimo: 0",
      max: "Valor máximo: 60"
    },
    seconds: {
      required: "É necessário definir a quantidade de segundos!",
      min: "Valor mínimo: 0",
      max: "Valor máximo: 60"
    }
  };

  override formObject = this.fb.group({
    name: ['', [Validators.required]],
    hours: ['', [Validators.required, Validators.min(0)]],
    minutes: ['', [Validators.required, Validators.max(60), Validators.min(0)]],
    seconds: ['', [Validators.required, Validators.max(60), Validators.min(0)]]
  });

  constructor(public activeModal: NgbActiveModal, fb: FormBuilder, modalService: NgbModal, public timerService: TimerService) {
    super(fb, modalService);
  }

  ngOnInit(): void {
    if (this.timer == null){
      this.isNewTimer = true;
      return;
    }

    var hours = Math.floor(this.timer.seconds / 3600),
            minutes = Math.floor((this.timer.seconds % 3600) / 60),
            seconds = Math.floor(this.timer.seconds % 60);

    this.formObject.controls.name.setValue(this.timer.name);
    this.formObject.controls.hours.setValue((hours).toString());
    this.formObject.controls.minutes.setValue((minutes).toString());
    this.formObject.controls.seconds.setValue((seconds).toString());
  }

  public override save() {
    if (this.isNewTimer){
      this.timer = new Timer();
    }
    this.timer.name = this.formModel.name;
    this.timer.seconds = this.toSeconds(this.formModel.hours, this.formModel.minutes, this.formModel.seconds);

    if (this.isNewTimer) {
      this.addTimer();
      return;
    }
    this.editTimer();
  }

  public addTimer() {
    this.timerService.addTimer(this.timer)
      .subscribe({
        complete: () => {
          this.formObject.reset();
          this.activeModal.close('Close click');
        },
        error: (e) => this.abrirContentModal('Ops!', e)
      });
  }

  public editTimer() {
    this.timerService.editTimer(this.timer)
      .subscribe({
        complete: () => {
          this.formObject.reset();
          this.activeModal.close('Close click');
        },
        error: (e) => this.abrirContentModal('Ops!', e)
      });
  }

  public toSeconds(hours: number, minutes: number, seconds: number): number {
    return (hours * 3600) + (minutes * 60) + +seconds;
  }
}
