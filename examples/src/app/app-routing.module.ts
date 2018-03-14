import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {ReaderComponent} from './reader/reader.component';
import {GamesComponent} from './games/games.component';
import {ShoppingComponent} from './shopping/shopping.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '*',
        component: AppComponent
      },
      {
        path: 'reader',
        component: ReaderComponent
      },
      {
        path: 'games',
        component: GamesComponent
      },
      {
        path: 'shopping',
        component: ShoppingComponent
      },
      {
        path: 'app/:appName/:route',
        component: AppComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
