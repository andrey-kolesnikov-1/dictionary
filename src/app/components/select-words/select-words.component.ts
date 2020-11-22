import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { DictionaryService } from 'src/app/shared/dictionary.service';
import { Word } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-select-words',
  templateUrl: './select-words.component.html',
  styleUrls: ['./select-words.component.scss']
})
export class SelectWordsComponent implements OnInit {

  isScrollTextInfo: boolean = false;
  findWord: string = '';
  dictionaryArray: Word[] = [];
  selectedWordsArray: number[] = [];
  numberSelectedWords: number = 0;
  @ViewChild('selElemEnd') selElemEnd: MatSelect;
  @ViewChild('selElemRandom') selElemRandom: MatSelect;

  constructor(private data: DictionaryService) { }

  ngOnInit(): void {
    this.copyDictionary(this.data.dictionary.values());
    this.data.stream$.subscribe(() => {
      this.copyDictionary(this.data.dictionary.values());
    });
    this.checkSelectedWords();
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

  setRandomWords(event: MatSelectChange) {
    this.checkSelectedWords('reset');
    if (event.value === 'off') return;
    this.selElemEnd.value = 'off';

    let counter = +event.value > this.dictionaryArray.length ? this.dictionaryArray.length : +event.value;
    for (let i = 0; i < counter; i++) {
      let repeat = true;
      let randomWord = 0;
      while (repeat) {
        randomWord = Math.floor(Math.random() * this.dictionaryArray.length) + 1;
        repeat = this.selectedWordsArray.includes(randomWord);
      }
      this.selectedWordsArray.push(randomWord);
    }
    for (const iterator of this.selectedWordsArray) {
      this.dictionaryArray.find(value => {
        return value.number == iterator
      }).select = true;
    }
    this.numberSelectedWords = this.selectedWordsArray.length;
  }

  setWordsFromEnd(event: MatSelectChange) {
    this.checkSelectedWords('reset');
    if (event.value === 'off') return;
    this.selElemRandom.value = 'off';

    const length = this.dictionaryArray.length - +event.value + 1;
    for (const iterator of this.dictionaryArray) {
      if (iterator.number >= length) {
        iterator.select = true;
      }
    }
    this.checkSelectedWords();
  }

  checkSelectedWords(comm: string = '') {
    this.selectedWordsArray = [];
    for (let item of this.dictionaryArray) {
      if (comm === 'reset') item.select = false;
      if (item.select) {
        this.selectedWordsArray.push(item.number);
      }
    }
    this.numberSelectedWords = this.selectedWordsArray.length;
  }

  resetAll() {
    this.checkSelectedWords('reset');
    this.selElemEnd.value = 'off';
    this.selElemRandom.value = 'off';
  }

  toLearn() {
    console.log(this.selectedWordsArray)
  }

}
