import {toBootstrapPromise} from './bootstrap';
import {toLoadPromise} from './load';
import {toMountPromise} from './mount';
import {toUnloadPromise} from './unload';
import {toUnmountPromise} from './unmount';

const MooaLifeCycle = {
  bootstrap: toBootstrapPromise,
  load: toLoadPromise,
  mount: toMountPromise,
  unload: toUnloadPromise,
  unmount: toUnmountPromise,
};

export default MooaLifeCycle;
