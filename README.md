# Mooa

> A single SPA Utils for Angular 2+

based on [single-spa](https://github.com/CanopyTax/single-spa) && [single-spa-angular-cli](https://github.com/PlaceMe-SAS/single-spa-angular-cli)

Examples: see in [examples/](./examples)

Online Demo: [https://mooa.pho.im/](https://mooa.pho.im/)

Usage
---

### 1. Install mooa

in host and apps

```sh
yarn add mooa
```

### 2. Config Host

1. add get Apps logic in AppComponent (``app.component.ts``)

```typescript
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

### 3. Config App

1. config App ``main.ts`` for load

```typescript
import mooaPlatform from 'mooa';

if (environment.production) {
  enableProdMode();
}

mooaPlatform.mount('help').then((opts) => {
  platformBrowserDynamic().bootstrapModule(AppModule).then((module) => {
    opts['attachUnmount'](module);
  });
});

```

2. setup app routing

```typescript
const appRoutes: Routes = [
  {path: '*', component: AppComponent}
  ...
];

@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: mooaPlatform.appBase()},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

3. comments ``src/polyfills.ts``

```typescript
// import 'zone.js/dist/zone';
```

4. add copy zone.js to ``assets/``, modify ``index.html``

```
<script src="/assets/zone.js"></script>
```

### 4. Setup apps.json

Examples:

```typescript
[
  {
    "name": "app1",
    "selector": "app-app1",
    "baseScriptUrl": "/assets/app1",
    "styles": [
      "styles.bundle.css"
    ],
    "prefix": "app/app1",
    "scripts": [
      "inline.bundle.js",
      "polyfills.bundle.js",
      "main.bundle.js"
    ],
    "parentElement": "app-home"
  }
]
```

License
---

[![Phodal's Idea](http://brand.phodal.com/shields/idea-small.svg)](http://ideas.phodal.com/)

Copyright (c) 2013-2014 Christopher Simpkins
Copyright (c) 2017-2018 Robin Coma Delperier

© 2018 A [Phodal Huang](https://www.phodal.com)'s [Idea](http://github.com/phodal/ideas).  This code is distributed under the MIT license. See `LICENSE` in this directory.
