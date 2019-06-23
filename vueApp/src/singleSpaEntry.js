import Vue from 'vue'
// import singleSpaVue from 'single-spa-vue';
import Vuex from 'vuex';

import App from './App.vue'
import singleSpaVue from './spaVue';

Vue.prototype.test = 'sdfsf'

Vue.config.productionTip = false;
const vueLifecycles = singleSpaVue({
    Vue,
    Vuex,
    appOptions: {
        el: '#app4',
        render: h => h(App)
}
});

export const bootstrap = [
    vueLifecycles.bootstrap,
];

export function mount(props) {
    createDomElement();
    return vueLifecycles.mount(props);
}

export const unmount = [
    vueLifecycles.unmount,
];

function createDomElement() {
    // Make sure there is a div for us to render into
    let el = document.getElementById('app4');

    if (!el) {
        el = document.createElement('div');
        el.id = 'app4';
        document.body.appendChild(el);
    }
    return el;
}
