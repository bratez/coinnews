import { Component } from '@angular/core';
import { LocalstorageService } from './services/localstorage.service';
import { Article } from './models/article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentCoinNews: Array<Article> = [];
  getNewsInterval = 3000;
  inRequest = false;
  recording;

  constructor (private localstorageService: LocalstorageService) {
    this.currentCoinNews = this.localstorageService.getCurrentList();
    this.runRecording();
  }

  runRecording() {
    this.recording = setInterval (() => {
      if (!this.inRequest) {
        this.record();
      }
    }, this.getNewsInterval)
  }

  stopRecording() {
    clearInterval(this.recording);
  }

  record() {
    this.localstorageService.getNews().subscribe(data => {
      console.log(data);
      this.inRequest = false;
    });
  }
}
