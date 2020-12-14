import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {AudioService} from '../shared/audio.service';

@Directive({
  selector: '[appSound]'
})
export class SoundDirective {

  @Input('appSound') type: string;

  constructor(private elRef: ElementRef, private audio: AudioService) {
  }

  @HostListener('click') onClick() {
    switch (this.type) {
      case 'control':
        this.audio.play('click 2');
        break;
      case 'btn':
        this.audio.play('button 1');
        break;
      case 'tab':
        this.audio.play('tab 1');
        break;
    }
  }

}
