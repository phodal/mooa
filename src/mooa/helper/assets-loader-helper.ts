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

const assetsLoaderHelper = {
  createScriptTag: function (src: string) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.id = hashCode(src);
    return script;
  },
  createLinkTag: function (src: string) {
    const link = document.createElement('link');
    link.href = src;
    link.rel = 'stylesheet';
    link.id = hashCode(src);
    return link;
  }
};
export default assetsLoaderHelper;
