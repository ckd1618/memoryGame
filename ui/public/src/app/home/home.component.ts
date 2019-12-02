import { Component, OnInit } from '@angular/core';
import { KJV } from '../../assets/bibles/KJV';
import { NKJV } from '../../assets/bibles/NKJV';
import { KJVarray, books66 } from '../../assets/bibles/KJVarray';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  versionChosen: string = 'NKJV';
  NKJVi = NKJV;
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
    // console.log(this.NKJVi.books[64-1]['chapters'][3-1]['verses'][3-1].text);
    // console.log(this.NKJVi.books[64-1].chapters[0].verses[1].text);
    // console.log(this.KJVarrayi[64][1][1-1] === 14);
    // console.log(this.NKJVi.books[64-1].chapters[1-1].verses[1-1].text);

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
      this.verseToDisplay1 = "";
      this.verseToDisplay2 = "***All verses have been shown***";
      this.verseToDisplay3 = "";
      this.verseLoc = "";
      return
    }
    var random1 = Math.floor(Math.random() * this.userVerseObjCount)+1;
    var three = this.userVerseObj[random1];
    this.versionRouter(three, random1);

  }

  versionRouter(three, random1) {
    if (this.versionChosen === 'NKJV') {
      this.NKJVrenderer(three, random1);
    } else {
      this.KJVrenderer(three, random1);
    }
  }

  KJVrenderer(three, random1){
    // console.log(three);
    var bookName = this.KJVarrayi[three[0]][0];
    this.verseToDisplay1 = this.KJVi[bookName][three[1]][three[2]-1];
    this.verseToDisplay2 = this.KJVi[bookName][three[1]][three[2]];
    this.verseToDisplay3 = this.KJVi[bookName][three[1]][three[2]+1];
    this.verseLoc = `${this.KJVarrayi[three[0]][0]} ${three[1]}:${three[2]}`;
    //code below is if you wish to automatically remove the verse after it is displayed
    var doneVerseObjNum = this.userVerseObjCount--;
    this.userVerseObj[random1] = this.userVerseObj[doneVerseObjNum];
    delete this.userVerseObj[doneVerseObjNum];
  }

  NKJVrenderer(three, random1) {
    // console.log(three);
    // console.log(three[2], this.KJVarrayi[three[0]][1][three[1]-1]);
    this.verseToDisplay1 = three[2] === 1 ? "" : this.NKJVi.books[three[0]-1].chapters[three[1]-1].verses[three[2]-2].text;
    this.verseToDisplay2 = this.NKJVi.books[three[0]-1].chapters[three[1]-1].verses[three[2]-1].text;
    this.verseToDisplay3 = three[2] === this.KJVarrayi[three[0]][1][three[1]-1] ? "" : this.NKJVi.books[three[0]-1].chapters[three[1]-1].verses[three[2]].text;
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
