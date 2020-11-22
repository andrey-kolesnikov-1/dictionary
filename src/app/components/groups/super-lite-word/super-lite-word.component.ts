import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-super-lite-word',
  templateUrl: './super-lite-word.component.html',
  styleUrls: ['./super-lite-word.component.scss']
})
export class SuperLiteWordComponent implements OnInit {

  select: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  selectWord() {
    this.select = !this.select;
  }
}
