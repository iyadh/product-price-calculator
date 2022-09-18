import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueTippy from 'vue-tippy';
import App from './App.vue';

import './assets/main.css';
import 'tippy.js/dist/tippy.css';

const app = createApp(App);

app.use(createPinia(), VueTippy);

app.mount('#app');
