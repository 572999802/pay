import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component(resolve) {
        require.ensure(['payViews/index/index'], () => {
          resolve(require('payViews/index/index'));
        });
      }
    },
    {
      path: '/rule',
      name: 'Rule',
      component(resolve) {
        require.ensure(['payViews/index/rule'], () => {
          resolve(require('payViews/index/rule'));
        });
      }
    }
  ]
});
