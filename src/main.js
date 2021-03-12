import Vue from 'vue';
import { store } from '@/store';
import App from './App';
import { router } from './routing/app.routing';
import '@/plugins/firebase';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);

Vue.config.productionTip = false;

// Configure router
new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
});
