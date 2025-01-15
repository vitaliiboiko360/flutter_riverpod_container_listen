import { createApp } from 'vue';

import App from '../src/App.vue';

import { VueQueryPlugin } from '@tanstack/vue-query';

const app = createApp(App);
app.use(VueQueryPlugin);
app.mount('#app');
