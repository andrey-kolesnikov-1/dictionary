import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-toggle-turn',
  templateUrl: './toggle-turn.component.html',
  styleUrls: ['./toggle-turn.component.scss']
})
export class ToggleTurnComponent {
  reverse: boolean = false;
  @Output() onReverse: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  toReverse() {
    this.reverse = !this.reverse;
    this.onReverse.emit(this.reverse);
  }
}
