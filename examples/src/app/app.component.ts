import {Component, ElementRef, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavigationEnd, Router} from '@angular/router';
import {default as Mooa, mooaRouter} from '../../../src/mooa';

declare const window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(window:mooa.bootstrapping)': 'loadingStart($event)',
    '(window:mooa.mounting)': 'loadingEnd($event)'
  }
})
export class AppComponent implements OnInit {
  private mooa: Mooa;
  private myElement: ElementRef;
  private iFrameUrl: any;
  private http: HttpClient;

  constructor(private httpClient: HttpClient, private router: Router, myElement: ElementRef) {
    this.http = httpClient;
    this.myElement = myElement;
    this.mooa = new Mooa({
      debug: false,
      parentElement: 'app-home',
      urlPrefix: 'app'
    });
  }

  ngOnInit() {
    // this.mooaWithLink();
    this.mooaWithConfig();
  }

  private mooaWithLink () {
    const that = this;

    that.mooa.registerApplicationByLink('help', '/assets/help', mooaRouter.matchRoute('help'));
    that.mooa.registerApplicationByLink('app1', '/assets/app1', mooaRouter.matchRoute('app1'));
    this.mooa.start();

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        that.mooa.reRouter(event);
      }
    });
  }

  loadingStart(event) {
    const parentElement = this.myElement.nativeElement.querySelector('app-home');
    if (!parentElement) {
      return;
    }
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

  loadingEnd() {
    const loadingSelector = this.myElement.nativeElement.querySelector('.loading');
    if (loadingSelector) {
      loadingSelector.remove();
    }
  }

  private mooaWithConfig () {
    const that = this;

    this.http.get<any[]>('/assets/apps.json')
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
}
