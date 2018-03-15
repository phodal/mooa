# Mooa

> A single SPA Utils for Angular 2+

based on [single-spa](https://github.com/CanopyTax/single-spa) && [single-spa-angular-cli](https://github.com/PlaceMe-SAS/single-spa-angular-cli)

difference: Host <-> Apps Design

![Mooa Architecture](./docs/mooa.png)

Examples: see in [examples/](./examples)

Online Demo: 

1. [http://mooa.pho.im/](http://mooa.pho.im/) (host in AWS S3)
2. [http://mooa.phodal.com/](http://mooa.phodal.com/) (host in GitHub Pages)

Features:

1. SPA by Configurable file, ex: ``apps.json``
2. Pluggable APP
3. support Child APP navigate
4. CLI for Update (TODO)

Goal:

1. 构建插件化的 Web 开发平台，满足业务快速变化及分布式多团队并行开发的需求
2. 构建服务化的中间件，搭建高可用及高复用的前端微服务平台
3. 支持前端的独立交付及部署

Usage
---

### 1. Install mooa

in Host and Child App

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

2. setup app routing in ``app.module.ts``

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

```javascript
// import 'zone.js/dist/zone';
```

4. add copy zone.js to ``assets/``, modify ``index.html``

```html
<script src="/assets/zone.js"></script>
```

### 4. Setup apps.json

Examples:

```json
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

API
---

### navigateTo Custom App

```
mooaPlatform.navigateTo({
  appName: 'help',
  router: 'home'
});
```

License
---

[![Phodal's Idea](http://brand.phodal.com/shields/idea-small.svg)](http://ideas.phodal.com/)

Copyright (c) 2013-2014 Christopher Simpkins
Copyright (c) 2017-2018 Robin Coma Delperier

© 2018 A [Phodal Huang](https://www.phodal.com)'s [Idea](http://github.com/phodal/ideas).  This code is distributed under the MIT license. See `LICENSE` in this directory.
