import {Component, Renderer2} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavigationEnd, Router} from '@angular/router';
import {default as Mooa, mooaRouter} from '../../../src/mooa';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private mooa: Mooa;

  constructor(private renderer: Renderer2, http: HttpClient, private router: Router) {
    this.mooa = new Mooa({debug: false});
    const that = this;

    http.get<any[]>('/assets/apps.json')
      .subscribe(data => {
          data.map((config) => {
            that.mooa.registerApplication(config.name, config, mooaRouter.matchRoute(config.prefix));
          });
        },
        err => console.log(err)
      );

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        that.mooa.reRouter();
      }
    });
  }
}
