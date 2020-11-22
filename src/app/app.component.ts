import {Component, OnInit} from '@angular/core';
import {DictionaryService} from './shared/dictionary.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dictionary2';


  constructor(public data: DictionaryService) {
  }

  ngOnInit(): void {
  }


}
