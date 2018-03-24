import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReaderComponent} from './reader/reader.component';
import {GamesComponent} from './games/games.component';
import {ShoppingComponent} from './shopping/shopping.component';
import {HomeComponent} from './home/home.component';
import {GraphComponent} from './graph/graph.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: GraphComponent
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
      },
      {
        path: 'app/:appName',
        component: HomeComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
