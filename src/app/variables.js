// 这里放置全局的变量
const isDev = __LOCAL__;
const urlPrefix = isDev ? '/mock/' : 'http://139.224.226.66:28080';
export default {
  urlPrefix,
  isDev,
  // 这里放置全局的调用的URL
  URLS: {},
};
