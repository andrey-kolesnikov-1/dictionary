import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DictionaryService} from '../../shared/dictionary.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {
  isTranslate = false;
  isShowAnswer = false;


  constructor(private data: DictionaryService ,private router: Router) {
  }

  ngOnInit(): void {
  }

  toDictionary() {
    this.router.navigate(['/dictionary']);
  }

  checkTranslation() {
    this.isShowAnswer = !this.isShowAnswer;
  }
}
