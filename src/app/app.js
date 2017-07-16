import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { setup, LogicRender } from 'refast';
import { Component } from 'react';
import { render } from 'react-dom';
import FastClick from 'fastclick';
import { isDev } from 'variables';

import Signin from 'pages/signin';
import DB from 'db';
import './app.less';

const { Toast, Dialog } = window.SaltUI;
const customHistory = hashHistory;

if (isDev && window.chrome && window.chrome.webstore) { // This is a Chrome only hack
  // see https://github.com/livereload/livereload-extensions/issues/26
  setInterval(() => {
    document.body.focus();
  }, 200);
}

// bind fastclick
FastClick && FastClick.attach(document.body);

// 这里使用setup来配置noflux
setup('fn', {
  toast: Toast,
  dialog: Dialog,
  DB,
  history: customHistory,
});

const Loading = () => <div className="kuma-loading" />;
const Empty = () => <div>暂无数据</div>;

// 修改 LogicRender 增加默认配置
// 用来自定义Loading和Empty的样式
Object.assign(LogicRender.defaultProps, { Empty, Loading });

class App extends Component {
  render() {
    return (
      <div className={'appContainerStyle'}>
        {this.props.children}
      </div>
    );
  }
}

render(
  <Router history={customHistory}>
    <Route name="app" path="/" component={App}>
      <IndexRoute component={Signin} />
      <Route path="signin" component={Signin} />
    </Route>
  </Router>,
  document.getElementById('App'),
);
