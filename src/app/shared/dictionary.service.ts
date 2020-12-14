import {Injectable} from '@angular/core';
import {Word} from './interfaces';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {GroupsService} from './groups.service';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  dictionary: Map<string, Word> = new Map<string, Word>();
  index: number = 0;
  numberOfWords: number = 0;
  keys: Array<string> = [];
  private repeatArray: Array<number> = [];
  private selectedWords: string[] = [];
  setting = {
    language: 'ru', // (en / ru)
    random: false,
    repeat: false,
    learnWords: 'all' // (all / words / groups)
  };
  settingSelectedWords = {
    lastWords: 'off',
    randomWords: 'off'
  };
  stream$: Subject<any> = new Subject<any>();
  streamShowWord$: Subject<any> = new Subject<any>();

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  constructor(private router: Router, private group: GroupsService) {
    if (localStorage.getItem('dictionary') !== null) {
      this.dictionary = new Map(JSON.parse(localStorage.getItem('dictionary')));
    }
  }

  // получение копии словаря
  getCopyDictionary(): Map<string, Word> {
    return new Map<string, Word>(JSON.parse(JSON.stringify([...this.dictionary])));
  }

  // установка команды для действия над выбранным словом
  setCommandForWord(command: number) {
    this.streamShowWord$.next(command);
  }

  // получение размера словаря
  getDictionarySize(): number {
    return this.dictionary.size;
  }

  // добавление слов в словарь
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

  // получение даты
  getDate(): string {
    const date = new Date();
    return `${editDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

    function editDate(): string {
      let day = date.getDate() + '';
      return day.length === 1 ? '0' + day : day;
    }
  }

  // сохранение словаря
  saveWords() {
    const strMap = JSON.stringify([...this.dictionary]); // Преобразовываем Map в массив, а затем в строку для хранения в локалбном хранилище
    localStorage.setItem('dictionary', strMap); // сохраняем в памяти
  }

  // удаление словаря
  deleteDictionary() {
    this.dictionary.clear();
    this.saveWords();
    this.stream$.next();
    this.group.deleteAllGroups();
  }

  // удаление слова из словаря
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

  // получение данных для изучения
  setLearnWords(words: string[], key: string) {
    this.setting.learnWords = key;
    this.index = 0;
    this.repeatArray = [];
    this.selectedWords = words;
    this.setRoute('');
  }

  setRoute(route: string) {
    this.router.navigate([route]);
  }

  // заполняет массив выбранными ключами и возвращает его размер
  getKeysMap(selectWords: string = 'all'): number {
    this.keys = [];
    if (selectWords === 'all') {
      for (let item of this.dictionary.keys()) {
        this.keys.push(item);
      }
    } else {
      this.keys = this.selectedWords.slice();
    }
    return this.keys.length;
  }

  // обрабатывает запрос на получение нового слова
  getNextWord(): Word {
    this.numberOfWords = this.getKeysMap(this.setting.learnWords);

    if (this.setting.random) { // случайный порядок слов
      let randomWord = Math.floor(Math.random() * this.numberOfWords);

      // повтор включен, возвращается любое слово с возможным повтором
      if (this.setting.repeat) {
        this.repeatArray = [];
        this.index = randomWord + 1; // указание индекса текущего слова

      } else { // повтор запрещен, возвращается не повторяющиеся слова
        if (this.repeatArray.length === this.numberOfWords) { // если дошли до конца - возвращаем пустой объект
          return {word: '', translation: '', mark: false, number: 0, date: '', select: false};
        }
        while (this.repeatArray.includes(randomWord)) { // поиск нового, неповторяющегося слова по индексу
          randomWord = Math.floor(Math.random() * this.numberOfWords);
          // console.log(randomWord, 'из', this.numberOfWords, 'arr', this.repeatArray)
        }
        this.repeatArray.push(randomWord);
        this.index = this.repeatArray.length; // указание индекса текущего слова
      }
      return this.dictionary.get(this.keys[randomWord]); // возвращает выбранное слово

    } else { // последовательный порядок слов
      this.repeatArray = [];

      if (this.numberOfWords > this.index) { // пока индекс текущего слова меньше максимального размера выбранных слов - инкрементируем индекс и возвращаем слово
        this.index++;
        return this.dictionary.get(this.keys[this.index - 1]);
      } else { // иначе возвращаем пустышку
        if (this.setting.repeat) {
          this.index = 0;
        } // если включен повтор - сбрасываем индекс текущего слова
        return {word: '', translation: '', mark: false, number: 0, date: '', select: false};
      }
    }
  }
}

