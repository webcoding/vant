/**
 * 同步父窗口和 iframe 的 vue-router 状态
 */

import isMobile from './is-mobile';
import { setLang } from './lang';
import { iframeReady } from './iframe';

window.syncPath = function(dir) {
  const router = window.vueRouter;
  const isInIframe = window !== window.top;
  const currentDir = router.history.current.path;
  const iframe = document.querySelector('iframe');

  if (!isInIframe && !isMobile && iframe) {
    const pathParts = currentDir.split('/');
    let lang = pathParts[0];
    if (currentDir[0] === '/') {
      lang = pathParts[1];
    }
    setLang(lang);

    iframeReady(iframe, () => {
      iframe.contentWindow.changePath(lang, currentDir);
    });
  }
};

window.changePath = function(lang, path = '') {
  setLang(lang);
  window.vueRouter.replace(path);
};
