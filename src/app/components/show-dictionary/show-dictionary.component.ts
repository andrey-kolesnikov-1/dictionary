import {Component, OnDestroy, OnInit} from '@angular/core';
import {DictionaryService} from '../../shared/dictionary.service';
import {Word} from '../../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-show-dictionary',
  templateUrl: './show-dictionary.component.html',
  styleUrls: ['./show-dictionary.component.scss']
})
export class ShowDictionaryComponent implements OnInit, OnDestroy {
  isScrollTextInfo: boolean = false;
  text: string = '';
  isDeleteDictionaryDialog: boolean = false;
  dictionaryArray: Word[] = [];
  enableBtnSelWord: boolean = true;
  isDeleteWord: boolean = false;
  isEmptyField: boolean = true;
  findWord: string = '';
  sub: Subscription;

  constructor(public data: DictionaryService) {
  }

  ngOnDestroy(): void {
    this.controlSelectedWord(3);
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.copyDictionary(this.data.dictionary.values());
    this.sub = this.data.stream$.subscribe(() => {
      this.copyDictionary(this.data.dictionary.values());
    });
  }

  copyDictionary(data) {
    this.dictionaryArray = [];
    for (let item of data) {
      this.dictionaryArray.push(item);
    }
  }

  checkFind() {
    if (this.findWord.trim()) {
      let text = this.findWord.trim()
      let arr = []
      for (let value of this.data.dictionary.values()) {
        if (value.word.includes(text) || value.translation.includes(text)) {
          arr.push(value)
        }
      }
      this.copyDictionary(arr)
    } else {
      this.copyDictionary(this.data.dictionary.values())
    }
  }

  checkEmptyField() {
    this.isEmptyField = this.text.trim() === '';
  }

  addNewWords() {
    this.controlSelectedWord(3);
    this.data.addWordsToDictionary(this.text);
  }

  clearField() {
    this.controlSelectedWord(3);
    this.text = '';
    this.isEmptyField = true;
  }

  deleteAllDictionary() {
    this.controlSelectedWord(3);
    this.isDeleteDictionaryDialog = true;
  }

  deleteDictionary() {
    this.data.deleteDictionary();
  }

  selectedWord(event: number) {
    for (let item of this.dictionaryArray) {
      item.mark = item.number === event;
    }
    this.enableBtnSelWord = false;
  }

  cancelActionWord() {
    this.selectedWord(-1);
    this.enableBtnSelWord = true;
  }

  controlSelectedWord(command: number) {
    switch (command) {
      case 1: // редактировать
        this.data.setCommandForWord(command);
        break;
      case 2: // сохранить
        this.data.setCommandForWord(command);
        this.cancelActionWord();
        break;
      case 3: // отмена
        this.data.setCommandForWord(command);
        this.cancelActionWord();
        break;
      case 4: // удалить
        this.isDeleteWord = true;
        break;
    }
  }

  deleteWord() {
    this.cancelActionWord();
    this.data.setCommandForWord(4);
  }
}
