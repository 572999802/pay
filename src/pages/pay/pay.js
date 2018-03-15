import '../../../node_modules/mint-ui/lib/style.css';
import '../../common/stylus/index.styl';
import Vue from 'vue';
import Pay from './Pay.vue';
import router from './router';
import MintUi from 'mint-ui';
import VConsole from 'vconsole';

Vue.use(MintUi);
var vConsole = new VConsole();
Vue.use(vConsole);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#pay',
  router,
  template: '<Pay/>',
  components: {Pay}
});
