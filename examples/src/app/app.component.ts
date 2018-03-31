import {Component, ElementRef, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavigationEnd, Router} from '@angular/router';
import {default as Mooa, mooaRouter} from '../../../src/mooa';

declare const window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private mooa: Mooa;
  private myElement: ElementRef;
  private http: HttpClient;

  constructor(private httpClient: HttpClient, private router: Router, myElement: ElementRef) {
    this.http = httpClient;
    this.myElement = myElement;
    this.mooa = new Mooa({
      mode: 'iframe',
      debug: false,
      parentElement: 'app-home',
      urlPrefix: 'app',
      switchMode: 'coexist',
      preload: true,
      includeZone: true
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

  private mooaWithConfig () {
    const that = this;

    this.http.get<any[]>('/assets/apps.json')
      .subscribe(data => {
          data.map((config) => {
            if (config.sourceType) {
              that.mooa.registerApplicationByLink(config.name, config.link, mooaRouter.matchRoute(config.name));
            } else {
              that.mooa.registerApplication(config.name, config, mooaRouter.matchRoute(config.prefix));
            }
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
