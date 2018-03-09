import LoaderHelper from './helper/loader-helper';

function bootstrap(opts) {
  return new Promise((resolve, reject) => {
    LoaderHelper.loadAllAssets(opts.appConfig).then(resolve, reject);
  });
}

function load(opts) {
  return Promise.resolve();
}

function mount(opts) {
  return new Promise((resolve, reject) => {
    LoaderHelper.getContainerEl(opts.appConfig);
    resolve();
  });
}

function unmount(opts) {
  return new Promise((resolve, reject) => {
    LoaderHelper.getContainerEl(opts.appConfig).remove;
    resolve();
  });
}

function unload(opts) {
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
