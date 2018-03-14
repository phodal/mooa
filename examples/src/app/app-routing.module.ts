import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {ReaderComponent} from './reader/reader.component';
import {GamesComponent} from './games/games.component';
import {ShoppingComponent} from './shopping/shopping.component';
import {HomeComponent} from './home/home.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
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
        component: HomeComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
