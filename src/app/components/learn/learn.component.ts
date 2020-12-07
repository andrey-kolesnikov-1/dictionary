import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {DictionaryService} from '../../shared/dictionary.service';
import {Word} from '../../shared/interfaces';
import {MatRadioChange} from '@angular/material/radio';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {AudioService} from '../../shared/audio.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {

  sentence: Word;
  wordForTranslate: string = '';
  isShowAnswer: boolean = false;
  answer: string = '';
  isShowTranslate: boolean = false;
  translate: string = '';
  trueTranslate: string = '';
  errorsTranslate: number = 0;
  iconSound: string = 'volume_up';
  colorSoundBtn: string = 'accent';
  textForDictionary: string = '';

  @ViewChild('inputElement') input: ElementRef;


  constructor(public data: DictionaryService, private audio: AudioService) {
  }

  ngOnInit(): void {
    if (this.data.dictionary.size > 0) {
      this.errorsTranslate = 0;
      this.data.index = 0;
      setTimeout(() => this.nextWord(), 50);
    }
  }

  checkTranslation() {
    this.isShowAnswer = false;
    setTimeout(() => {
      const translate = this.translate.trim().toLowerCase();
      if (this.data.setting.language === 'en') {
        this.answer = this.sentence.translation.includes(translate) ? 'Верно' : 'Неверно!';
      } else {
        this.answer = this.sentence.word.includes(translate) ? 'Верно' : 'Неверно!';
      }
      if (this.answer === 'Неверно!') this.errorsTranslate++;
      if (translate) {
        this.isShowAnswer = true;
        this.isShowTranslate = false;
        this.audio.playResult(this.answer === 'Верно');
      }
    }, 50);
  }

  nextWord() {
    this.sentence = this.data.getNextWord();
    if (this.data.setting.language === 'en') {
      this.wordForTranslate = this.sentence.word === '' ? 'Конец словаря' : this.sentence.word;
    } else {
      this.wordForTranslate = this.sentence.word === '' ? 'Конец словаря' : this.sentence.translation;
    }
    this.isShowAnswer = this.isShowTranslate = false;
    this.translate = '';
    this.input.nativeElement.focus();
    this.checkEmptyAnswer();
  }

  showTranslation() {
    this.isShowTranslate = !this.isShowTranslate;
  }

  checkEmptyAnswer() {
    this.trueTranslate = this.data.setting.language === 'ru' ? this.sentence.word : this.sentence.translation;
    this.trueTranslate = this.trueTranslate === '' ? '0' : this.trueTranslate;
  }

  changeLanguage(event: MatRadioChange) {
    this.data.setting.language = event.value;
    this.data.index--;
    this.nextWord();
  }

  changeLearnWords(event: MatRadioChange) {
    this.data.setting.learnWords = event.value;
    switch (event.value) {
      case 'all':
        this.data.index = 0;
        this.errorsTranslate = 0;
        this.nextWord();
        break;
      case 'words':
        this.data.setRoute('/select-words');
        break;
      case 'groups':
        this.data.setRoute('/groups');
        break;
    }
  }

  previousWord() {
    this.data.index = this.data.index < 2 ? this.data.numberOfWords - 1 : this.data.index -= 2;
    this.nextWord();
  }

  toggleSound() {
    this.audio.soundOff = !this.audio.soundOff;
    if (this.audio.soundOff) {
      this.iconSound = 'volume_off';
      this.colorSoundBtn = '';
    } else {
      this.iconSound = 'volume_up';
      this.colorSoundBtn = 'accent';
    }
  }

  addTestWords() {
    this.data.addWordsToDictionary(this.textForDictionary);
    this.data.index = 0;
    setTimeout(() => this.nextWord(), 50);
  }
}
