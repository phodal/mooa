/**
 * Robin Coma Delperier
 * Licensed under the Apache-2.0 License
 * https://github.com/PlaceMe-SAS/single-spa-angular-cli/blob/master/LICENSE
 *
 * modified by Phodal HUANG
 *
 */

const hashCode = function (str: string) {
  let hash = 0;
  if (str.length === 0) {
    return hash.toString();
  }
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash = hash & hash;
    hash = hash >>> 1;
  }

  return hash.toString();
};

const assetsLoaderHelper = {
  hashCode: hashCode,
  createScriptTag: function (src: string) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.charset = 'UTF-8';
    script.id = hashCode(src);
    return script;
  },
  createLinkTag: function (src: string) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = src;
    link.type = 'text/css';
    link.charset = 'UTF-8';
    link.id = hashCode(src);
    return link;
  }
};

export default assetsLoaderHelper;
