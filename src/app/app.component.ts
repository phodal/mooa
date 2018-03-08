import {Component} from '@angular/core';
import mooa from '../mooa/mooa';
import mooaRouter from '../mooa/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private chatConfig: object = {
    name: 'help',
    selector: 'help-root',
    baseScriptUrl: '/src/apps/help/dist',
    styles: [
      'styles.bundle.css',
    ],
    scripts: [
      'inline.bundle.js',
      'polyfills.bundle.js',
      'main.bundle.js'
    ]
  };

  constructor() {
    mooa.registerApplication('chat', this.chatConfig, mooaRouter.hashPrefix(''));

    mooa.start();
  }
}
