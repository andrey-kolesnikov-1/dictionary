import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  groups: Map<string, string[]>;
  newGroup$: Subject<Map<string, string[]>> = new Subject<Map<string, string[]>>();

  constructor() {
    if (localStorage.getItem('groups') !== null) {
      this.groups = new Map(JSON.parse(localStorage.getItem('groups')));
    } else {
      this.groups = new Map<string, []>();
    }
  }

  getGroups() {
    this.newGroup$.next(this.groups);
  }

  saveGroups() {
    const strMap = JSON.stringify([...this.groups]); // Преобразовываем Map в массив, а затем в строку для хранения в локалбном хранилище
    localStorage.setItem('groups', strMap); // сохраняем в памяти
  }

  addNewGroup(name: string, words: string[]) {
    this.groups.set(name, words);
    this.saveGroups();
    this.newGroup$.next(this.groups);
  }


}
