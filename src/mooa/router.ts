interface RouterConfig {
  urlHash: boolean;
}

const mooaRouter = {
  hashPrefix(prefix: string, routerConfig?: RouterConfig) {
    return function (location) {
      if (routerConfig && routerConfig.urlHash) {
        return location.hash.indexOf(`#${prefix}`) === 0;
      } else {
        return location.pathname === prefix;
      }
    };
  }
};

export default mooaRouter;
