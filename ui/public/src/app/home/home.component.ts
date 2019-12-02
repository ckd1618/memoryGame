import { Component, OnInit } from '@angular/core';
import { KJV } from '../../assets/bibles/KJV';
import { KJVarray, books66 } from '../../assets/bibles/KJVarray';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  versionChosen: string = 'KJV';
  KJVi = KJV;
  KJVarrayi = KJVarray;
  books66i = books66;
  showSelector = true;
  userVerseObj ={};
  userVerseObjCount = 0;
  verseToDisplay1: string;
  verseToDisplay2: string;
  verseToDisplay3: string;
  verseLoc: string = "";
  showVerseVar: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  consoleLog(){
    console.log(this.books66i);
  }
  bookCheckbox(i) {
    this.books66i[i][1] = !this.books66i[i][1];

  }
  chapterCheckbox(i, j) {
    this.books66i[i][2][j] = !this.books66i[i][2][j];
  }
  begin(){
    this.showSelector = false;
    this.userVerseObjPopulator();
  }
  userVerseObjPopulator() {
    this.userVerseObjCount = 0;
    this.userVerseObj = {};
    for (let i = 0; i < this.books66i.length; i++) {
      if (this.books66i[i][1]) {
        // console.log(this.books66i[i][2].length);
        for (let j = 0; j < this.KJVarrayi[i][1].length; j++) {
          if(this.books66i[i][2][j]) {
            for (let k = 1; k <= this.KJVarrayi[i+1][1][j]; k++) {
              this.userVerseObjCount++;
              this.userVerseObj[this.userVerseObjCount] = [i+1,j+1,k];
            }
          }
        }
      }
    }
    this.verseRenderer();
    // Math.floor(Math.random() * this.userVerseObjCount)+1
    // this.KJVarrayi[three[0]][0]
  }
  verseRenderer() {
    this.showVerseVar = false;
    if (this.userVerseObjCount === 0) {
      this.verseToDisplay2 = "***All verses have been shown***";
      this.verseLoc = "";
      return
    }
    var random1 = Math.floor(Math.random() * this.userVerseObjCount)+1;
    var three = this.userVerseObj[random1];
    this.verseToDisplay1 = this.KJVi[this.KJVarrayi[three[0]][0]][three[1]][three[2]-1];
    this.verseToDisplay2 = this.KJVi[this.KJVarrayi[three[0]][0]][three[1]][three[2]];
    this.verseToDisplay3 = this.KJVi[this.KJVarrayi[three[0]][0]][three[1]][three[2]+1];
    this.verseLoc = `${this.KJVarrayi[three[0]][0]} ${three[1]}:${three[2]}`;
    //code below is if you wish to automatically remove the verse after it is displayed
    var doneVerseObjNum = this.userVerseObjCount--;
    this.userVerseObj[random1] = this.userVerseObj[doneVerseObjNum];
    delete this.userVerseObj[doneVerseObjNum];
  }
  showVerse() {
    this.showVerseVar = !this.showVerseVar;
  }
}
