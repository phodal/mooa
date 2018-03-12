import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import mooa from '../mooa/mooa';
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

  constructor(private renderer: Renderer2, http: HttpClient, private router: Router) {
    http.get<IAppOption[]>('/assets/apps.json')
      .subscribe(
        data => {
          this.createApps(data);
        },
        err => console.log(err)
      );
  }

  private createChildApp(config: {}) {
    let appElement;
    appElement = this.renderer.createElement(config['selector']);
    this.renderer.appendChild(this.childElement.nativeElement, appElement);
  }

  private createApps(data: IAppOption[]) {
    data.map((config) => {
      mooa.registerApplication(config.name, config, mooaRouter.hashPrefix(config.prefix));
      this.createChildApp(config);
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        mooa.reRouter(event);
      }
    });

    return mooa.start();
  }
}
