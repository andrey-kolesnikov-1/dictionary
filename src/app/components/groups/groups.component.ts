import {Component, OnDestroy, OnInit} from '@angular/core';
import {GroupsService} from '../../shared/groups.service';
import {Group, Word, WordsForGroup} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {DictionaryService} from '../../shared/dictionary.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {

  findWord: string = '';
  groupsArray: Group[] = [];
  copyGroupMap: Map<string, any[]>;
  wordsArray: WordsForGroup[] = [];
  copyDictionary: Map<string, Word>;
  toggleInfoWords: boolean = false;
  formNewGroup: boolean = false;
  stream: Subscription;
  nameNewGroup: string = '';
  tempSelectedWords: string[] = [];
  nameSelectedGroup: string = '';


  constructor(private dataGroup: GroupsService, private data: DictionaryService) {
  }


  ngOnInit(): void {
    // подписываемся на стрим получения копии групп
    this.stream = this.dataGroup.newGroup$.subscribe(groups => {
      this.copyGroupMap = groups;
      this.groupsArray = [];
      for (let item of groups.values()) {
        this.groupsArray.push(item[0]);
      }
    });
    this.dataGroup.getGroups();

    // получаем копию всего словаря
    this.copyDictionary = this.data.getCopyDictionary();
  }


  checkFind() {

  }

  selectGroup(group: string) { // выделяем группу по клику на ней или кнопке "Редактировать"
    this.nameSelectedGroup = group;
    this.toggleInfoWords = false;
    for (let item of this.groupsArray) {
      item.selected = item.name === group;
      if (item.selected) {
        this.toggleInfoWords = true;
      }
    }
    this.showGroupWords();
  }

  showGroupWords() { // вывод всех слов словаря
    this.wordsArray = [];
    if (!this.toggleInfoWords) {
      return;
    }
    for (let item of this.copyDictionary.values()) {
      this.wordsArray.push({
        number: item.number,
        text: item.word + ' = ' + item.translation,
        selected: this.copyGroupMap.get(this.nameSelectedGroup).includes(item.word)
      });
    }
  }

  addNewGroup() { //кнопка "Добавить группу"
    this.formNewGroup = this.toggleInfoWords = true; // открываем форму новой группы и доступные слова
    this.showGroupWords(); // выводим слова
  }

  saveNewGroup() { // сохранение новой группы
    const group = { // создаем объект описания группы
      name: this.nameNewGroup,
      numberWords: this.tempSelectedWords.length,
      dateCreate: this.getDate(),
      lastUse: this.getDate(),
      numberUse: 0,
      selected: false
    };
    const arr: any[] = this.tempSelectedWords.map(value => { // создаем массив из слов-ключей
      return value.split('=')[0].trim();
    });
    arr.unshift(group); // помещаем первым элементом массива объект описания
    this.dataGroup.addNewGroup(group.name, arr); // сохраняем группу в сервисе
    this.cancelCreateNewGroup(); // закрываем форму новой группы и доступные слова
  }

  getDate(): string { // получение и форматирование даты
    const date = new Date();

    function format(str: string): string {
      return str.length === 1 ? '0' + str : str;
    }

    return `${format(date.getDate() + '')}.${format(date.getMonth() + 1 + '')}.${format(date.getFullYear() + '')}`;
  }

  cancelCreateNewGroup() { // закрываем форму новой группы и доступные слова
    this.formNewGroup = this.toggleInfoWords = false;
    this.tempSelectedWords = [];
  }

  selectWordForGroup() { // обработка клика по слову словаря
    if (this.formNewGroup) {
      this.tempSelectedWords = this.wordsArray.filter(value => value.selected).map(value => value.text);
    }
  }

  ngOnDestroy(): void { // отписываемся при удалении компонента
    this.stream.unsubscribe();
  }
}
