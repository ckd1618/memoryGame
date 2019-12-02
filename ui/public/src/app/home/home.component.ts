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
  books66i = books66;
  showSelector = true;
  verseArr;

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
    this.verseArrPopulator();
  }
  verseArrPopulator() {
    
  }
}
