import {Component, EventEmitter, Input, Output} from '@angular/core';
import {WordsForGroup} from '../../../shared/interfaces';

@Component({
  selector: 'app-super-lite-word',
  templateUrl: './super-lite-word.component.html',
  styleUrls: ['./super-lite-word.component.scss']
})
export class SuperLiteWordComponent {

  @Input() word: WordsForGroup;
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  selectWord() {
    this.word.selected = !this.word.selected;
    this.onClick.emit();
  }
}
