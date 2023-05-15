import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }


  background = ["background-1", "background-2", "background-3"];
  backgroundIndex = 1;
  backgroundImg = this.background[0];
  
  audiosource = ['assets/audio/piano_jazz.mp3','assets/audio/disco.mp3','assets/audio/piano_funky.mp3','assets/audio/hard_rock.mp3'];
  audio = new Audio();
  audioIndex = 0;
  public volume = 0.1;    

  changeBackground() {
    if (this.backgroundIndex < 2) {
      this.backgroundIndex++;
    } else if (this.backgroundIndex = 0) {
      this.backgroundIndex = 0;
    }
    this.backgroundImg = this.background[this.backgroundIndex];
  }

  playedMusic() {
    this.audio.src = this.audiosource[0];
    this.audio.loop = true;
    this.audio.play();
    this.audio.volume = this.volume;
  }

  nextMusic() {
    this.audio.pause();
    if (this.audioIndex < 3) {
      this.audioIndex++;
    } else if (this.audioIndex = 0) {
      this.audioIndex = 0;
    }  
    
    this.audio.src = this.audiosource[this.audioIndex];
    this.audio.play();

  }

  pauseMusic() {     
    this.audio.pause();
  }

  playMusic() { 
    this.audio.play();
    this.audio.volume = this.volume;
   }



}
