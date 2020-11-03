import App from './app.mjs';
import store from './store.mjs';

new Vue({
    render: h => h(App),
    store: store
}).$mount('#app');