import {Component, OnDestroy, OnInit} from '@angular/core';
import { GroupsService } from '../../shared/groups.service';
import {Group} from '../../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {

  findWord: string = '';
  groupsArray: Group[] = [];
  toggleInfoWords: boolean = false;
  stream: Subscription;


  constructor(private dataGroup: GroupsService) { }


  ngOnInit(): void {
    this.stream =  this.dataGroup.newGroup$.subscribe(value => {
      // console.log(value)
    });
    this.dataGroup.getGroups();

    this.groupsArray.push(
      {name: 'name1', numberWords: 100, dateCreate: '20.11.2020', numberUse: 10, lastUse: '22.11.2020', selected: false},
      {name: 'name2', numberWords: 200, dateCreate: '20.11.2020', numberUse: 10, lastUse: '22.11.2020', selected: false},
      {name: 'name3', numberWords: 300, dateCreate: '20.11.2020', numberUse: 10, lastUse: '22.11.2020', selected: false},
      {name: 'name4', numberWords: 400, dateCreate: '20.11.2020', numberUse: 10, lastUse: '22.11.2020', selected: false},
    );
  }


  checkFind() {

  }

  selectGroup(group: string) {
    this.toggleInfoWords = false;
    for (let item of this.groupsArray) {
      item.selected = item.name === group;
      if (item.selected) this.toggleInfoWords = true;
    }
  }

  addNewGroup() {

  }

  ngOnDestroy(): void {
    this.stream.unsubscribe();
  }
}
