import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../shared/interfaces';
import {GroupsService} from '../../../shared/groups.service';
import {DictionaryService} from '../../../shared/dictionary.service';
import {AudioService} from '../../../shared/audio.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() group: Group;
  @Output() onSelected: EventEmitter<string> = new EventEmitter<string>();
  isDelete: boolean = false;

  constructor( private dataGroup: GroupsService, private data: DictionaryService, private audio: AudioService) { }

  ngOnInit(): void {
  }

  clickCard(event) { // нажатие по карточке группы
    let target = event.target.localName;
    if(target == 'div' || target =='p' || target =='strong' || target =='h2') {
      this.audio.play('click 2');
      if (!this.group.selected) {
        this.onSelected.emit(this.group.name);
      } else {
        this.onSelected.emit('');
      }
    }
  }

  editGroup() { // кнопка "Редактировать"
    this.audio.play('button 1');
    this.onSelected.emit(this.group.name);
  }

  toDelete() {
    this.isDelete = true;
    this.audio.play('button 1');
  }

  deleteGroup() { // кнопка "Удалить"
    this.dataGroup.deleteSelectedGroup(this.group.name);
  }

  toLearn() { // кнопка "Изучить"
    this.audio.play('button 1');
    // модифицируем статистику группы в хранилище
    const status = this.dataGroup.groups.get(this.group.name);
    status[0].numberUse++;
    status[0].lastUse = this.data.getDate();
    this.dataGroup.save();
    this.onSelected.emit('');
    const arr = [...status];
    arr.shift();
    this.data.setLearnWords(arr, 'groups');
  }
}
