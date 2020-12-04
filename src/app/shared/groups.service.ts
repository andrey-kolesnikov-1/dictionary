import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  groups: Map<string, any[]>;
  newGroup$: Subject<Map<string, any[]>> = new Subject<Map<string, any[]>>();

  constructor() {
    if (localStorage.getItem('groups') !== null) {
      this.groups = new Map(JSON.parse(localStorage.getItem('groups')));
    } else {
      this.groups = new Map<string, any[]>();
    }
  }

  getGroups() { // возвращаем копию групп
    this.newGroup$.next(new Map<string, any[]>(JSON.parse(JSON.stringify([...this.groups]))));
  }

  saveGroups() {
    const strMap = JSON.stringify([...this.groups]); // Преобразовываем Map в массив, а затем в строку для хранения в локалбном хранилище
    localStorage.setItem('groups', strMap); // сохраняем в памяти
  }

  addNewGroup(name: string, data: any[]) {
    this.groups.set(name, data);
    this.save();
  }

  saveEditedGroup(group: string, words: any[]) {
    if (this.groups.has(group)) {
      let info = this.groups.get(group)[0];
      info.numberWords = words.length;
      words.unshift(info);
      this.groups.set(group, words);
      this.save();
    }
  }

  deleteSelectedGroup(group: string) {
    this.groups.delete(group);
    this.save();
  }

  save() {
    this.saveGroups();
    this.getGroups();
  }

}
