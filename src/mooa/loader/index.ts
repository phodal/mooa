/**
 * Robin Coma Delperier
 * Licensed under the Apache-2.0 License
 * https://github.com/PlaceMe-SAS/single-spa-angular-cli/blob/master/LICENSE
 *
 * modified by Phodal HUANG
 *
 */

import LoaderHelper from '../helper/loader-helper';

declare const window: any;

function bootstrap(opts: MooaApp) {
  if (!window['mooa']) {
    window.mooa = {};
  }
  window.mooa.isSingleSpa = true;
  window.mooa.name = opts.name;

  console.log('bootstrap', opts.name, opts.status);
  return new Promise((resolve, reject) => {
    LoaderHelper.loadAllAssets(opts.appConfig).then(resolve, reject);
  });
}

function load(opts: MooaApp) {
  console.log('load', opts.name, opts.status);
  return Promise.resolve();
}

function mount(opts: MooaApp, props?: any) {
  console.log('mount', opts.name, opts.status);
  return new Promise((resolve, reject) => {
    LoaderHelper.getContainerEl(opts.appConfig);
    if (window.mooa[opts.name]) {
      window.mooa[opts.name].mount(props);
      resolve();
    } else {
      console.error(`Cannot mount ${opts.name} because that is not bootstraped`);
      reject();
    }
  });
}

function unmount(opts: MooaApp, props: any) {
  console.log('unmount props', props);
  const { singleSpa: { unloadApplication, getAppNames } } = props
  return new Promise((resolve, reject) => {
    if (window.mooa[opts.name]) {
      window.mooa[opts.name].unmount();
      LoaderHelper.getContainerEl(opts.appConfig).remove();
      if (getAppNames().indexOf(opts.name) !== -1) {
        unloadApplication(opts.name, { waitForUnmount: true });
        resolve();
      } else {
        reject(`Cannot unmount ${opts.name} because that ${opts.name} is not part of the decalred applications : ${getAppNames()}`);
      }
    } else {
      reject(`Cannot unmount ${opts.name} because that is not bootstraped`);
    }
  });
}

function unload(opts: MooaApp) {
  console.log(opts.name, opts.status);
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
