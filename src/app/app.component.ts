import {Component, OnInit} from '@angular/core';
import {DictionaryService} from './shared/dictionary.service';
import {AudioService} from './shared/audio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dictionary';

  constructor(public data: DictionaryService, private audio: AudioService) {
  }

  ngOnInit(): void {
  }

  clickLink() {
    this.audio.play('click 2');
  }
}
