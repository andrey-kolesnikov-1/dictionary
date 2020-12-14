import {Component, Input, OnInit} from '@angular/core';
import {Word} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-lite-word',
  templateUrl: './lite-word.component.html',
  styleUrls: ['./lite-word.component.scss']
})
export class LiteWordComponent implements OnInit {

  @Input() word: Word;
  text: string = '';

  constructor() {
  }

  ngOnInit(): void {
    this.show();
  }

  show() {
    let str = '';
    let tab = '';
    for (let i = 0; i <= 10 - this.word.word.length; i++) {
      tab += ' ';
    }
    str += `${this.word.word}${tab} =   ${this.word.translation}\n`;
    this.text = str;
  }

  selectWord() {
    this.word.select = !this.word.select;
  }
}
