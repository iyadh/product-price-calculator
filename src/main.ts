import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueTippy from 'vue-tippy';
import App from './App.vue';

import './assets/main.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const app = createApp(App);

app.use(createPinia());
app.use(VueTippy, {
  defaultProps: {
    placement: 'top-start',
  },
});

app.mount('#app');
