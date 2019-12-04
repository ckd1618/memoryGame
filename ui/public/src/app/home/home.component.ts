import { Component, OnInit } from '@angular/core';
import { KJV } from '../../assets/bibles/KJV';
import { NKJV } from '../../assets/bibles/NKJV';
import { KJVarray, books66, bookNum } from '../../assets/bibles/KJVarray';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  versionChosen: string = 'NKJV';
  fullText;
  NKJVi = NKJV;
  KJVi = KJV;
  KJVarrayi = KJVarray;
  books66i = books66;
  bookNumi = bookNum;
  showSelector = true;
  userVerseObj ={};
  userVerseObjCount = 0;
  verseToDisplay1: string;
  verseToDisplay2: string;
  verseToDisplay3: string;
  verseLoc: string = "";
  bookLoc: string = "";
  bookLocNum: number;
  chapterLoc: string = "";
  chapterLocNum: number;
  verseOnlyLoc: string = "";
  verseOnlyLocNum: number;
  showVerseVar: boolean = false;
  noVersesSelected: string = "";
  showBookVar: boolean = false;


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
    this.userVerseObjPopulator();
  }
  userVerseObjPopulator() {
    this.userVerseObjCount = 0;
    this.userVerseObj = {};
    for (let i = 0; i < this.books66i.length; i++) {
      if (this.books66i[i][1]) {
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
    if (this.userVerseObjCount !== 0){
      this.showSelector = false;
      this.noVersesSelected = "";
      this.verseRenderer();
    }else{
      this.noVersesSelected = "Please make a selection in order to begin."
    }
    
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
    this.bookLoc = this.KJVarrayi[three[0]][0];
    this.chapterLoc = three[1];
    this.verseOnlyLoc = three[2];
    this.bookLocNum = parseInt(this.KJVarrayi[three[0]][0]);
    this.chapterLocNum = parseInt(three[1]);
    this.verseOnlyLocNum = parseInt(three[2]);
    //code below is if you wish to automatically remove the verse after it is displayed
    var doneVerseObjNum = this.userVerseObjCount--;
    this.userVerseObj[random1] = this.userVerseObj[doneVerseObjNum];
    delete this.userVerseObj[doneVerseObjNum];
  }

  NKJVrenderer(three, random1) {
    console.log(three);
    // console.log(three[2], this.KJVarrayi[three[0]][1][three[1]-1]);
    this.verseToDisplay1 = three[2] === 1 ? "" : this.NKJVi.books[three[0]-1].chapters[three[1]-1].verses[three[2]-2].text + " ";
    this.verseToDisplay2 = this.NKJVi.books[three[0]-1].chapters[three[1]-1].verses[three[2]-1].text + " ";
    this.verseToDisplay3 = three[2] === this.KJVarrayi[three[0]][1][three[1]-1] ? "" : this.NKJVi.books[three[0]-1].chapters[three[1]-1].verses[three[2]].text + " ";
    this.verseLoc = `${this.KJVarrayi[three[0]][0]} ${three[1]}:${three[2]}`;
    this.bookLoc = this.KJVarrayi[three[0]][0];
    this.chapterLoc = three[1];
    this.verseOnlyLoc = three[2];
    this.bookLocNum = parseInt(this.KJVarrayi[three[0]][0]);
    this.chapterLocNum = parseInt(three[1]);
    this.verseOnlyLocNum = parseInt(three[2]);
    //code below is if you wish to automatically remove the verse after it is displayed
    var doneVerseObjNum = this.userVerseObjCount--;
    this.userVerseObj[random1] = this.userVerseObj[doneVerseObjNum];
    delete this.userVerseObj[doneVerseObjNum];
  }

  showVerse() {
    this.showVerseVar = !this.showVerseVar;
  }

  toggleChapters(i) {
    var length = this.KJVarrayi[i+1][1].length;
    var arrOfTF = [];

    for (let idx = 0; idx < length; idx++) {
      if (this.books66i[i][3]) {
        arrOfTF.push(false);
      }else{
        arrOfTF.push(true);
      }
    }
    this.books66i[i][3] = !this.books66i[i][3];
    this.books66i[i][2] = arrOfTF;
  }
  showBook() {
    if (this.showBookVar === true) {
      this.fullText = [];
      this.showBookVar = false;
      return ;
    }
    this.showBookVar = true;
    if (this.versionChosen === 'NKJV'){
      this.fullText = [];
      var NKJVchaptersNum: number = this.NKJVi.books[parseInt(this.bookNumi[this.bookLoc])-1].chapters.length;
      for (let i = 0; i < NKJVchaptersNum; i++) {
        var tempChapter = [];
        var currentChapter = this.NKJVi.books[parseInt(this.bookNumi[this.bookLoc])-1].chapters[i].verses
        for (let j = 0; j < currentChapter.length; j++) {
          tempChapter.push(currentChapter[j].text);
        }
        this.fullText.push(tempChapter);
      }
    }else {

    }
  }
  //esv to be added
}
