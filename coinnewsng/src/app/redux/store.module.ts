import {NgModule} from '@angular/core';
import {NgReduxModule, NgRedux, DevToolsExtension} from '@angular-redux/store';
import {provideReduxForms} from '@angular-redux/form';
import {createLogger} from 'redux-logger';
import {rootInitialState, rootReducer, RootState} from './root-reducer';

@NgModule({
  imports: [NgReduxModule]
})
export class ReduxStoreModule {

  constructor(public store: NgRedux<RootState>, devTools: DevToolsExtension) {

    const loggerColors = {
      title: () => 'green',
      prevState: () => '#9E9E9E',
      action: () => '#03A9F4',
      nextState: () => '#4CAF50',
      error: () => '#F20404',
    };

    // Tell Redux about our reducers. If the Redux DevTools
    // chrome extension is available in the browser, tell Redux about
    // it too.
    store.configureStore(
      rootReducer,
      rootInitialState,
      [createLogger({collapsed: true, colors: loggerColors})],
      devTools.isEnabled() ? [devTools.enhancer()] : []);

    // Enable syncing of Angular form state with our Redux store.
    provideReduxForms(store);
  }
}
