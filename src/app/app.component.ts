import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import mooa, {default as Mooa} from '../mooa/mooa';
import mooaRouter from '../mooa/router';
import {HttpClient} from '@angular/common/http';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('child') childElement: ElementRef;
  private mooa: Mooa;

  constructor(private renderer: Renderer2, http: HttpClient, private router: Router) {
    this.mooa = new Mooa();
    http.get<IAppOption[]>('/assets/apps.json')
      .subscribe(
        data => {
          this.createApps(data);
        },
        err => console.log(err)
      );
  }

  private createApps(data: IAppOption[]) {
    const that = this;
    data.map((config) => {
      that.mooa.registerApplication(config.name, config, mooaRouter.hashPrefix(config.prefix));
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        that.mooa.reRouter(event);
      }
    });

    return that.mooa.start();
  }
}
