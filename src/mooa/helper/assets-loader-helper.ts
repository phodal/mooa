const assetsLoaderHelper = {
  createScriptTag: function (src: string) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.charset = 'UTF-8';
    script.id = `mooa_${src}`;
    return script;
  },
  createLinkTag: function (src: string) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = src;
    link.type = 'text/css';
    link.charset = 'UTF-8';
    link.id = `mooa_${src}`;
    return link;
  }
};

export default assetsLoaderHelper;
