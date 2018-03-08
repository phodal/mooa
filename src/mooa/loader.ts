/**
 * Robin Coma Delperier
 * Licensed under the Apache-2.0 License
 * https://github.com/PlaceMe-SAS/single-spa-angular-cli/blob/master/LICENSE
 *
 * modified by Phodal HUANG
 *
 */

const hashCode = (str: string): string => {
  let hash = 0;
  if (str.length === 0) {
    return '';
  }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash.toString();
};

const loadScriptTag = (url: string) => {
  return () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.onload = function () {
        resolve();
      };
      script.onerror = err => {
        reject(err);
      };
      script.src = url;
      script.id = hashCode(url);
      document.head.appendChild(script);
    });
  };
};

const loadLinkTag = (url: string) => {
  return () => {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.onload = function () {
        resolve();
      };
      link.onerror = err => {
        reject(err);
      };
      link.href = url;
      link.rel = 'stylesheet';
      link.id = hashCode(url);
      document.head.appendChild(link);
    });
  };
};

function loadAllAssets(opts: any) {
  return new Promise((resolve, reject) => {
    const scriptsPromise = opts.scripts.reduce(
      (prev: Promise<undefined>, fileName: string) => prev.then(loadScriptTag(`${opts.baseScriptUrl}/${fileName}`)),
      Promise.resolve(undefined)
    );
    const stylesPromise = opts.styles.reduce(
      (prev: Promise<undefined>, fileName: string) => prev.then(loadLinkTag(`${opts.baseScriptUrl}/${fileName}`)),
      Promise.resolve(undefined)
    );
    Promise.all([scriptsPromise, stylesPromise]).then(resolve, reject);
  });
}

function getContainerEl(opts) {
  let el = document.querySelector(opts.selector);
  if (!el) {
    el = document.createElement(opts.selector);
    document.body.appendChild(el);
  }
  return el;
}

function bootstrap(opts) {
  return new Promise((resolve, reject) => {
    loadAllAssets(opts.appConfig).then(resolve, reject);
  });
}

function load(opts) {
  console.log('load', opts);
  return Promise.resolve();
}

function mount(opts) {
  // setContainer
  return new Promise((resolve, reject) => {
    getContainerEl(opts.appConfig);
    resolve();
  });
}

function unmount(opts) {
  // removeContainer
  return Promise.resolve();
}

function unload(opts) {
  // removeScript
  return Promise.resolve();
}

export default function loader(opts) {
  return {
    bootstrap: bootstrap.bind(null, opts),
    load: load.bind(null, opts),
    mount: mount.bind(null, opts),
    unload: unload.bind(null, opts),
    unmount: unmount.bind(null, opts),
  };
}
