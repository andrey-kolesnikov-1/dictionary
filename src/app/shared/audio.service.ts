import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audio = new Audio()
  soundOff: boolean = false;

  constructor() { }

  playResult(result: boolean) {
    if (this.soundOff) return
    this.audio.src = result ? '/assets/sound/true.mp3' : '/assets/sound/false.mp3';
    this.audio.play();
  }
}
