import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../shared/interfaces';
import {GroupsService} from '../../../shared/groups.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() group: Group;
  @Output() onSelected: EventEmitter<string> = new EventEmitter<string>();
  isDelete: boolean = false;

  constructor( private dataGroup: GroupsService) { }

  ngOnInit(): void {
  }

  clickCard(event) {
    let target = event.target.localName;
    if(target == 'div' || target =='p' || target =='strong' || target =='h2') {
      if (!this.group.selected) {
        this.onSelected.emit(this.group.name);
      } else {
        this.onSelected.emit('');
      }
    }
  }

  editGroup() {
    this.onSelected.emit(this.group.name);
  }

  deleteGroup() {
    this.dataGroup.deleteSelectedGroup(this.group.name);
  }

  toLearn() {
    
  }
}
