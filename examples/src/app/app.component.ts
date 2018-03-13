import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavigationEnd, Router} from '@angular/router';
import Mooa, {mooaRouter} from 'mooa';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('child') childElement: ElementRef;
  private mooa: Mooa;
  private option: any;

  constructor(private renderer: Renderer2, http: HttpClient, private router: Router) {
    this.option = {
      debug: true
    };
    this.mooa = new Mooa(this.option);

    http.get<any[]>('/assets/apps.json')
      .subscribe(
        data => {
          this.createApps(data);
        },
        err => console.log(err)
      );
  }

  private createApps(data: any[]) {
    const that = this;
    data.map((config) => {
      that.mooa.registerApplication(config.name, config, mooaRouter.matchRoute(config.prefix));
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        that.mooa.reRouter();
      }
    });

    return that.mooa.start();
  }
}
