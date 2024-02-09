import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'content-modal',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title"> {{ title }} </h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
			<p>{{ message }}</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-success" (click)="activeModal.close('Close click')">Fechar</button>
		</div>
	`,
})
export class ContentModalComponent {
	@Input() title: string;
	@Input() message: string;

	constructor(public activeModal: NgbActiveModal) {}
}