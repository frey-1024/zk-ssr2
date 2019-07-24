import { StaticRouter } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import createApp from './createApp';

export default (ctx, browserData) => {
  return new Promise((resolve, reject) => {
    const { router, store, routerConfig } = createApp();
    const routes = matchRoutes(routerConfig, ctx.path);
    // 如果没有匹配上路由则返回404
    if (routes.length <= 0) {
      return reject({ code: 404, message: 'Not Page' });
    }
    let promises;
    try {
      // 等所有数据请求回来之后在render, 注意这里不能用ctx上的路由信息，要使用前端的路由信息
      promises = routes
        .filter(item => item.route.component.serverBootstrapper)
        .map(item =>
          item.route.component.serverBootstrapper(
            store,
            { ...item.match, query: ctx.query },
            browserData
          )
        );
    } catch (e) {
      console.log(e);
    }

    Promise.all(promises)
      .then(() => {
        ctx.store = store; // 挂载到ctx上，方便渲染到页面上
        resolve(
          <Provider store={store}>
            <StaticRouter location={ctx.path} context={ctx}>
              {router}
            </StaticRouter>
          </Provider>
        );
      })
      .catch(reject);
  });
};
