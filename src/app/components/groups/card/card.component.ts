import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../shared/interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {


  // @Input() select: boolean = false;
  @Input() group: Group;
  @Output() onSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

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
}
