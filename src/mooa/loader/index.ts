import LoaderHelper from '../helper/loader-helper';

function bootstrap(opts) {
  console.log('bootstrap', opts.name, opts.status);
  return new Promise((resolve, reject) => {
    LoaderHelper.loadAllAssets(opts.appConfig).then(resolve, reject);
  });
}

function load(opts) {
  console.log('load', opts.name, opts.status);
  return Promise.resolve();
}

function mount(opts) {
  console.log('mount', opts.name, opts.status);
  return new Promise((resolve, reject) => {
    LoaderHelper.getContainerEl(opts.appConfig);
    resolve();
  });
}

function unmount(opts) {
  console.log('unmount', opts.name, opts.status);
  return new Promise((resolve, reject) => {
    LoaderHelper.getContainerEl(opts.appConfig).remove();
    resolve();
  });
}

function unload(opts) {
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
