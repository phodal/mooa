import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import mooa from '../mooa/mooa';
import mooaRouter from '../mooa/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  @ViewChild('child') childApp: ElementRef;

  private chatConfig: object = {
    name: 'help',
    selector: 'help-root',
    baseScriptUrl: '/assets/app1',
    styles: [
      'styles.bundle.css',
    ],
    scripts: [
      'inline.bundle.js',
      'polyfills.bundle.js',
      'main.bundle.js'
    ]
  };

  constructor(private renderer: Renderer2) {
    mooa.registerApplication('chat', this.chatConfig, mooaRouter.hashPrefix(''));

    this.createChildApp(this.chatConfig);
    mooa.start();
  }

  private createChildApp(chatConfig: {}) {
    let childElement;
    childElement = this.renderer.createElement(chatConfig['selector']);
    console.log(childElement)
    // this.renderer.appendChild(this.childApp.nativeElement, childElement);
  }
}
