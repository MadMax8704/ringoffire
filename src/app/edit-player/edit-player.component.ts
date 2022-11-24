import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export  class EditPlayerComponent implements OnInit {

  allProfilePictures = ['1.png', '2.png',
    '3.png', '4.png', '6.png',
    '7.png', '8.png', '10.png', '11.png',
    '12.png', '13.png', '14.png'];

  awalibleProfilePictures = [];

  tohave = '';

  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) {

      this.awalibleProfilePictures = this.allProfilePictures;

      

   }

  ngOnInit(): void {
  }
    // let to_delete = this.allProfilePictures.indexOf(this.picture);
    // this.allProfilePictures = this.allProfilePictures.splice(to_delete,1);
    // console.log('Img is', this.picture);

}
