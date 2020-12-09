import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AudioService} from '../../shared/audio.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() dialog: string = '';
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAgree: EventEmitter<any> = new EventEmitter<any>();
  @Input() danger: boolean = false;
  @Input() textButtonAgree: string = '';
  @Input() textButtonClose: string = '';
  active: boolean = false

  constructor(private audio: AudioService) {
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.audio.play('button 1');
    this.onClose.emit();
  }

  agree() {
    this.onAgree.emit();
    this.closeDialog();
  }
}
