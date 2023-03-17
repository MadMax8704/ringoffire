import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { ChangeDetectionStrategy } from '@angular/compiler';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  static afterChange(): string {
    throw new Error('Method not implemented.');
  }
  
  game: Game;
  gameId: string;
  gameOver: boolean = false;
  backgroundImg = "background-1";
  background = ["background-1","background-2","background-3"] ;
  backgroundIndex = 0;
  cardeffect = new Audio('assets/audio/card_effect.mp3');

  

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gameId = params['id'];
      this
        .firestore
        .collection('games')
        .doc(params['id'])
        .valueChanges()
        .subscribe((game: any) => {
          console.log('Game update', game);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCard = game.playedCard;
          this.game.players = game.players;
          this.game.player_images = game.player_images;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
        });

    });

  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation && this.game.players.length > 3) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.cardeffect.play();
      this.saveGame();

      setTimeout(() => {
        this.game.pickCardAnimation = false;
        this.game.playedCard.push(this.game.currentCard);
        this.saveGame();
      }, 1250);
    }
    if (this.game.players.length <= 3) {
      alert("Minimum 4 PLayer needed!");
    }
  }

  editPlayer(playerId: number) {
    console.log('Edit player', playerId);
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.componentInstance.name = this.game.players[playerId];
    dialogRef.componentInstance.player_image = this.game.player_images[playerId];
    dialogRef.componentInstance.allGivenPictures = this.game.player_images;
    
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1)
          this.game.player_images.splice(playerId, 1)
          this.saveGame();
        } else {
          console.log('Recieved change', change);
          this.game.player_images[playerId] = change;          
          this.saveGame();
        }
      }
    });

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0 && this.game.players.length < 12) {
        this.game.players.push(name);
        this.game.player_images.push('unknown.png');
        this.saveGame();
      }
      if (this.game.players.length >= 12) {
        alert("Max player 12");
      }
    });
  }

  saveGame() {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }

  changeBackground() {
    if (this.backgroundIndex<2) {
      this.backgroundIndex++;
    } else if (this.backgroundIndex = 0) {
      this.backgroundIndex = 0;
    }
      this.backgroundImg = this.background[this.backgroundIndex];
  }
}


