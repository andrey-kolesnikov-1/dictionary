import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WordsForGroup} from '../../../shared/interfaces';
import {AudioService} from '../../../shared/audio.service';

@Component({
  selector: 'app-super-lite-word',
  templateUrl: './super-lite-word.component.html',
  styleUrls: ['./super-lite-word.component.scss']
})
export class SuperLiteWordComponent implements OnInit {

  @Input() word: WordsForGroup;
  @Output() onClick: EventEmitter<void> = new  EventEmitter<void>();

  constructor(private audio: AudioService) { }

  ngOnInit(): void {
  }

  selectWord() {
    this.audio.play('click 2');
    this.word.selected = !this.word.selected ;
    this.onClick.emit();
  }
}
