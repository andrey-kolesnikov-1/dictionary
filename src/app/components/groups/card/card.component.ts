import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Group} from '../../../shared/interfaces';
import {GroupsService} from '../../../shared/groups.service';
import {DictionaryService} from '../../../shared/dictionary.service';
import {AudioService} from '../../../shared/audio.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() group: Group;
  @Output() onSelected: EventEmitter<string> = new EventEmitter<string>();
  isDelete: boolean = false;

  constructor(private dataGroup: GroupsService, private data: DictionaryService, private audio: AudioService) {
  }

  clickCard(event) { // нажатие по карточке группы
    let target = event.target.localName;
    if (target == 'div' || target == 'p' || target == 'strong' || target == 'h2') {
      this.audio.play('click 2');
      if (!this.group.selected) {
        this.onSelected.emit(this.group.name);
      } else {
        this.onSelected.emit('');
      }
    }
  }

  editGroup() { // кнопка "Редактировать"
    this.onSelected.emit(this.group.name);
  }

  toDelete() {
    this.isDelete = true;
  }

  deleteGroup() { // кнопка "Удалить"
    this.dataGroup.deleteSelectedGroup(this.group.name);
  }

  toLearn() { // кнопка "Изучить"
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
