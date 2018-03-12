# Mooa

> A single SPA Utils for Angular 2+

based on [single-spa](https://github.com/CanopyTax/single-spa) && [single-spa-angular-cli](https://github.com/PlaceMe-SAS/single-spa-angular-cli)

Usage
---

Host <-> Apps

### Host

In AppComponent (``app.component.ts``)

```
constructor(private renderer: Renderer2, http: HttpClient, private router: Router) {
  http.get<IAppOption[]>('/assets/apps.json')
    .subscribe(
      data => {
        this.createApps(data);
      },
      err => console.log(err)
    );
}

private createApps(data: IAppOption[]) {
  data.map((config) => {
    mooa.registerApplication(config.name, config, mooaRouter.hashPrefix(config.prefix));
  });

  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      mooa.reRouter(event);
    }
  });

  return mooa.start();
}
```

Child App ``main.ts``

```
import mooaPlatform from 'mooa';

if (environment.production) {
  enableProdMode();
}

mooaPlatform.mount('help').then(({ props, attachUnmount }) => {
  platformBrowserDynamic().bootstrapModule(AppModule).then((module) => {
    attachUnmount(module);
  });
});

```

License
---

[![Phodal's Idea](http://brand.phodal.com/shields/idea-small.svg)](http://ideas.phodal.com/)

Copyright (c) 2013-2014 Christopher Simpkins
Copyright (c) 2017-2018 Robin Coma Delperier

© 2018 A [Phodal Huang](https://www.phodal.com)'s [Idea](http://github.com/phodal/ideas).  This code is distributed under the MIT license. See `LICENSE` in this directory.
