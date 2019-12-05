import { Component, OnInit } from '@angular/core';
import { KJV } from '../../assets/bibles/KJV';
import { NKJV } from '../../assets/bibles/NKJV';
import { KJVarray, books66, bookNum, userNotes } from '../../assets/bibles/KJVarray';

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
  fullTextChapter;
  showChapterVar: boolean = false;
  inputBook: string;
  inputChapter: number;
  inputVerse: number;
  score: number = 0;
  denominator: number = 0;
  books66iSaved;
  userNotesi = userNotes;
  showNotesVar: boolean = false;
  // initialNextVerse: boolean = false;


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
    this.books66iSaved = this.books66i;
    this.userVerseObjPopulator();
  }
  restart(){
    this.books66i = this.books66iSaved;
    this.score = 0;
    this.denominator = 0;
    this.userVerseObjPopulator();
  }

  userVerseObjPopulator() {
    this.userVerseObjCount = 0;
    this.userVerseObj = {};
    for (let i = 0; i < this.books66i.length; i++) {
      if (this.books66i[i][1]) {
        for (let j = 0; j < this.KJVarrayi[(i+1).toString()][1].length; j++) {
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
    // if (this.initialNextVerse) this.checkAnswer();
    this.showVerseVar = false;
    this.showChapterVar = false;
    this.showBookVar = false;
    if (this.userVerseObjCount === 0) {
      this.verseToDisplay1 = "";
      this.verseToDisplay2 = "***All verses have been shown***";
      this.verseToDisplay3 = "";
      this.verseLoc = "";
      this.chapterLocNum = null;
      this.verseOnlyLocNum = null;
      return ;
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

    this.showChapterLogic();
    this.showBookLogic();
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

    this.showChapterLogic();
    this.showBookLogic();
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
    this.showBookLogic();
  }
  showBookLogic() {
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
  showChapter(){
    if (this.showChapterVar === true) {
      this.fullTextChapter = [];
      this.showChapterVar = false;
      return ;
    }
    this.showChapterVar = true;
    this.showChapterLogic();
  }
  showChapterLogic() {
    if (this.versionChosen === 'NKJV'){
      this.fullTextChapter = [];
      console.log(this.chapterLocNum);
      var currentChapter = this.NKJVi.books[parseInt(this.bookNumi[this.bookLoc])-1].chapters[this.chapterLocNum-1].verses
      for (let j = 0; j < currentChapter.length; j++) {
        this.fullTextChapter.push(currentChapter[j].text);
      }
    }else {

    }
  }

  checkAnswer() {
    console.log(this.inputBook, this.bookLoc);
    console.log(this.inputChapter, this.chapterLocNum);
    console.log(this.inputVerse, this.verseOnlyLocNum);
    if (this.verseToDisplay2 === "***All verses have been shown***") return ;
    if (this.inputBook === this.bookLoc) {
      this.score++;
    }
    if (this.inputChapter === this.chapterLocNum) {
      this.score++;
    }
    if (this.inputVerse === this.verseOnlyLocNum) {
      this.score++;
    }
    this.denominator = this.denominator + 3;
    this.verseRenderer();
  }

  verseColor(j) {
    var remainder = j%10;
    switch (remainder) {
      case 1: return "color1";
      case 2: return "color2";
      case 3: return "color3";
      case 4: return "color4";
      case 5: return "color5";
      case 6: return "color6";
      case 7: return "color7";
      case 8: return "color8";
      case 9: return "color9";
      case 0: return "color10";
      default: return "black";
    }
  }
  showNotes() {
    this.showNotesVar = !this.showNotesVar;
  }
  chapterCheckboxTF(i,j) {
    this.books66i[i][2][j] = !this.books66i[i][2][j];
  }

  getIndex(index) {
    return index;
  }
  //esv to be added
}
