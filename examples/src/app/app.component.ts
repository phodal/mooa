import {Component, Renderer2} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavigationEnd, Router} from '@angular/router';
import {default as Mooa, mooaRouter} from '../../../src/mooa';
import {RouterEvent} from '@angular/router/src/events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private mooa: Mooa;

  constructor(http: HttpClient, private router: Router) {
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
}
