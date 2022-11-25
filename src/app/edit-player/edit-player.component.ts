import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';


@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  @Input() name: string;
  player_image: string;
  allGivenPictures: string[];
  awalibleProfilePictures = [];

  allProfilePictures = ['1.png', '2.png',
    '3.png', '4.png', '6.png',
    '7.png', '8.png', '10.png', '11.png',
    '12.png', '13.png', '14.png'];

  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) { }

  ngOnInit(): void {
    const namesToDeleteSet = new Set(this.allGivenPictures);
    this.awalibleProfilePictures = this.allProfilePictures.filter((picture) => {
      return !namesToDeleteSet.has(picture);
    });
  }

}
