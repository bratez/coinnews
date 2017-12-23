import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Service } from '../services/service.service';
import {RootState} from './root-reducer';

@Injectable()

export class Actions {
  static readonly LOADED_NEWS = 'LOADED_NEWS';
  static readonly LOADED_COINS = 'LOADED_COINS';

  constructor(private ngRedux: NgRedux<RootState>, private service: Service) {}

  getCurrentList() {
    this.service.getNews().subscribe(news => {
      this.ngRedux.dispatch({type: Actions.LOADED_NEWS, payload: news});
    });
  }
}
