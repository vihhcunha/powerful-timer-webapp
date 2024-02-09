import { Component, ElementRef, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, fromEvent, merge } from 'rxjs';
import { ValidationMessages, GenericFormValidator, DisplayMessage } from 'src/app/utils/generic-form-validator';
import { ContentModalComponent } from '../../modals/content-modal.component';

@Component({
  selector: 'app-base-form',
  template: ''
})
export class BaseFormComponent<T> {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  formObject: FormGroup;
  validationMessages: ValidationMessages;
  genericValidator: GenericFormValidator;
  displayMessage: DisplayMessage = {};
  formModel: T;

  constructor(
    protected fb: FormBuilder,
    protected modalService: NgbModal) {
  }

  ngAfterViewInit(): void {
    this.definirValidacoes();
    this.defineControlBlurEvents();
  }

  public defineControlBlurEvents() {
    let controlBlurs: Observable<any>[] = this.formInputElements
     .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.buildValidationMessages();
    });
  }

  public buildValidationMessages() {
    this.displayMessage = this.genericValidator.buildMessages(this.formObject);
  }

  public definirValidacoes() {
    this.genericValidator = new GenericFormValidator(this.validationMessages);
  }

  public submit() {
    if (this.formObject.valid) {
      this.formModel = Object.assign({}, this.formModel, this.formObject.value);
      this.save();
      return;
    }

    Object.keys(this.formObject.controls).forEach(key => {
      this.formObject.controls[key].markAsTouched();
    });
    this.buildValidationMessages();
  }

  public save() { }

  public abrirContentModal(title: string, message: string) {
    var modalRef = this.modalService.open(ContentModalComponent, { size: 'sm' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
  }
}