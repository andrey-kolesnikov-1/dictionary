import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  @Input() dialog: string = '';
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAgree: EventEmitter<any> = new EventEmitter<any>();
  @Input() danger: boolean = false;
  @Input() textButtonAgree: string = '';
  @Input() textButtonClose: string = '';
  active: boolean = false;

  constructor() {
  }

  closeDialog() {
    this.onClose.emit();
  }

  agree() {
    this.onAgree.emit();
    this.closeDialog();
  }
}
