import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges, ViewChild
} from '@angular/core';
import {Word} from '../../shared/interfaces';
import {DictionaryService} from '../../shared/dictionary.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-word-component',
  templateUrl: './word-component.component.html',
  styleUrls: ['./word-component.component.scss']
})
export class WordComponentComponent implements OnInit, OnChanges, OnDestroy {

  @Input() word: Word;
  @Input() mark: boolean = false;
  @ViewChild('inputElement') inputRef: ElementRef;
  @Output() onSelected: EventEmitter<number> = new EventEmitter<number>();

  text: string = '';
  tempText: string = '';
  stream$: Subscription;
  edit: boolean = false;

  constructor(private data: DictionaryService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.mark.previousValue) {
      this.stream$.unsubscribe();
      this.edit = false;
      this.text = this.tempText;
    }
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
    if (!this.mark) { // если слово отмеченно - подписываемся на сервис
      this.tempText = this.text;
      this.stream$ = this.data.streamShowWord$.subscribe(command => {
        switch (command) {
          case 1: // редактировать
            this.edit = true;
            this.inputRef.nativeElement.focus();
            break;
          case 2: // сохранить
            this.edit = false;
            this.saveChange();
            break;
          case 3: // отмена
            this.edit = false;
            this.text = this.tempText;
            break;
          case 4: // удаление слова
            this.edit = false;
            this.data.deleteWordFromDictionary(this.word.word);
            break;
        }
      });
    }
    this.onSelected.emit(this.word.number);
  }

  saveChange() {
    let change = this.text;
    if (change.trim() !== '') {
      change = change.toLowerCase();
      if (change.length === 0 || !change.includes('=')) {
        this.text = this.tempText;
        return;
      }

      const str = change.split('=');
      str.forEach((value1, index, array) => {
        array[index] = value1.trim();
      });
      if (str[1] === '') {
        this.text = this.tempText;
        return;
      }
      this.word.translation = str[1];
      this.word.mark = false;
      this.mark = false;
      this.tempText = this.text;
      this.data.saveWords();
    } else {
      this.text = this.tempText;
    }
  }

  ngOnDestroy(): void {
    if (this.stream$) this.stream$.unsubscribe();
  }
}
