import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import mooa from '../mooa/mooa';
import mooaRouter from '../mooa/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app';
  @ViewChild('child') childElement: ElementRef;

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
  }

  ngAfterViewInit() {
    this.createChildApp(this.chatConfig);
    mooa.start();
  }

  private createChildApp(chatConfig: {}) {
    let appElement;
    appElement = this.renderer.createElement(chatConfig['selector']);
    this.renderer.appendChild(this.childElement.nativeElement, appElement);
  }
}
