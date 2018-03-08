function bootstrap(opts) {
  // load assets
  console.log('bootstrap', opts);
  return Promise.resolve();
}

function load(opts) {
  console.log('load', opts);
  return Promise.resolve();
}

function mount(opts) {
  // setContainer
  console.log('mount', opts);
  return Promise.resolve();
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
