import {Component} from '@angular/core';
import {DictionaryService} from './shared/dictionary.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dictionary';

  constructor(public data: DictionaryService) {
  }
}
