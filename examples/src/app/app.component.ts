import {Component, ElementRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavigationEnd, Router} from '@angular/router';
import {default as Mooa, mooaRouter} from '../../../src/mooa';

declare const window: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(window:mooa.bootstrapping)': 'loadingStart($event)',
    '(window:mooa.mounting)': 'loadingEnd($event)'
  }
})
export class AppComponent {
  private mooa: Mooa;
  private myElement: ElementRef;
  private iFrameUrl: any;

  constructor(http: HttpClient, private router: Router, myElement: ElementRef) {
    this.myElement = myElement;
    this.mooa = new Mooa({
      debug: false,
      parentElement: 'app-home',
      urlPrefix: 'app'
    });
    const that = this;

    http.get<any[]>('/assets/apps.json')
      .subscribe(data => {
          data.map((config) => {
            that.mooa.registerApplication(config.name, config, mooaRouter.matchRoute(config.prefix));
          });
          this.mooa.start();
        },
        err => console.log(err)
      );

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        that.mooa.reRouter(event);
      }
    });
  }

  loadingStart(event) {
    // if (event.detail.app.name === window.mooa.name) {
    //   return;
    // }
    const parentElement = this.myElement.nativeElement.querySelector('app-home');
    parentElement.innerHTML = `
<div class="loading">
  <p>loading</p>
  <div class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</div>`;
  }

  loadIframe(url: any) {
    this.iFrameUrl = url;
    const parentElement = this.myElement.nativeElement.querySelector('app-home');
    parentElement.innerHTML = `<iframe width="100%" height="300" [src]="url | safe"></iframe>`;
  }

  loadingEnd() {
    const loadingSelector = this.myElement.nativeElement.querySelector('.loading');
    loadingSelector.remove();
  }
}
