const mooaRouter = {
  hashPrefix(prefix: string) {
    return function (location) {
      return location.pathname.indexOf(`${prefix}`) === 0;
    };
  }
};

export default mooaRouter;
