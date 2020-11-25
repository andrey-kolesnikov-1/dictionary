import {Injectable} from '@angular/core';
import {Word} from './interfaces';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  dictionary: Map<string, Word> = new Map<string, Word>();
  index: number = 0;
  private keys: Array<string> = [];
  private repeatArray: Array<number> = [];
  setting: Object = {
    language: 'en',
    random: false,
    repeat: false,
    learnWords: 'all' // all / selected words / group
  };
  stream$: Subject<any> = new Subject<any>();
  streamShowWord$: Subject<any> = new Subject<any>();

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  constructor() {
    if (localStorage.getItem('dictionary') !== null) {
      this.dictionary = new Map(JSON.parse(localStorage.getItem('dictionary')));
    }
  }

  getCopyDictionary(): Map<string, Word> {
  return new Map<string, Word>(JSON.parse(JSON.stringify([...this.dictionary])));
  }

  setCommandForWord(command: number) {
    this.streamShowWord$.next(command);
  }

  getDictionarySize(): number {
    return this.dictionary.size;
  }

  addWordsToDictionary(text: string) {
    if (text.trim() !== '') {
      text = text.toLowerCase();
      let tempStr = text.split('\n');
      tempStr = tempStr.filter(value => value !== '' && value.includes('='));
      if (tempStr.length === 0) {
        return;
      }

      tempStr.forEach(value => {
        const str = value.split('=');
        str.forEach((value1, index, array) => {
          array[index] = value1.trim();
        });
        if (!this.dictionary.has(str[0])) {
          this.dictionary.set(str[0], {
            number: this.dictionary.size + 1,
            word: str[0],
            translation: str[1],
            date: this.getDate(),
            mark: false,
            select: false
          });
        }
      });
      this.saveWords();
      this.stream$.next();
    }
  }

  private getDate(): string {
    const date = new Date();
    return `${editDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

    function editDate(): string {
      let day = date.getDate() + '';
      return day.length === 1 ? '0' + day : day;
    }
  }

  saveWords() {
    const strMap = JSON.stringify([...this.dictionary]); // Преобразовываем Map в массив, а затем в строку для хранения в локалбном хранилище
    localStorage.setItem('dictionary', strMap); // сохраняем в памяти
  }

  deleteDictionary() {
    this.dictionary.clear();
    this.saveWords();
    this.stream$.next();
  }

  deleteWordFromDictionary(key: string) {
    if (this.dictionary.has(key)) {
      this.dictionary.delete(key);
      let index = 0;
      for (let value of this.dictionary.values()) {
        index++;
        value.number = index;
      }
      this.saveWords();
      this.stream$.next();
    } else {
      console.log('такого слова нет в словаре');
    }
  }
}

