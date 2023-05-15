import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {
  constructor(public settingsservice: SettingsService, public dialogRef: MatDialogRef<SettingsDialogComponent>) { }
  
 
  ngOnInit(): void {
    
    console.log(this.settingsservice.volume)
  }

}
