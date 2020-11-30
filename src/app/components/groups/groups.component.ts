import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
  showWords: WordsForGroup[] = [];
  copyDictionary: Map<string, Word>;
  toggleInfoWords: boolean = false;
  formNewGroup: boolean = false;
  infoSelectedGroup: boolean = false;
  stream: Subscription;
  nameNewGroup: string = '';
  tempSelectedWords: string[] = [];
  nameSelectedGroup: string = '';

  @ViewChild('inputElement') inputElement: ElementRef;


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
      if (this.groupsArray.length === 0) {
        this.toggleInfoWords = this.infoSelectedGroup = false;
      }
    });
    this.dataGroup.getGroups();

    // получаем копию всего словаря
    this.copyDictionary = this.data.getCopyDictionary();
  }


  checkFind() {
      if (this.findWord.trim()) {
        let text = this.findWord.trim()
        let arr = []
        for (let value of this.wordsArray) {
          if (value.text.includes(text)) {
            arr.push(value)
          }
        }
        this.showWords = arr;
      } else {
        this.showWords = this.wordsArray.map(value => value); // копируем главный массив в массив для отображения
      }
  }

  selectGroup(group: string) { // выделяем группу по клику на ней или кнопке "Редактировать"
    this.nameSelectedGroup = group;
    this.toggleInfoWords = this.infoSelectedGroup = false;

    for (let item of this.groupsArray) {
      item.selected = item.name === group;
      if (item.selected) {
        this.formNewGroup = false;
        this.infoSelectedGroup = this.toggleInfoWords = true;
      }
    }
    this.showGroupWords();
    this.selectWordForGroup();
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
        selected: this.nameSelectedGroup ? this.copyGroupMap.get(this.nameSelectedGroup).includes(item.word) : false
      });
    }
    this.showWords = this.wordsArray.map(value => value); // копируем главный массив в массив для отображения
  }

  addNewGroup() { //кнопка "Добавить группу"
    this.nameNewGroup = '';
    this.selectGroup('');
    this.infoSelectedGroup = false;
    this.formNewGroup = this.toggleInfoWords = true; // открываем форму новой группы и доступные слова
    this.showGroupWords(); // выводим слова

    setTimeout(() => {this.inputElement.nativeElement.focus();}, 100)
  }

  saveNewGroup() { // сохранение новой группы
    let name = this.nameNewGroup.trim();
    if (!name) return;
    const group = { // создаем объект описания группы
      name: name,
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
      this.tempSelectedWords = this.wordsArray.filter(value => value.selected).map(value => value.text);
  }

  ngOnDestroy(): void { // отписываемся при удалении компонента
    this.stream.unsubscribe();
  }

  saveChangeGroup() { // сохранение изменений в выбранной группе
    const arr: any[] = this.tempSelectedWords.map(value => value.split('=')[0].trim());
    this.dataGroup.saveEditedGroup(this.nameSelectedGroup, arr);
    this.infoSelectedGroup = this.toggleInfoWords = false;
  }

}
