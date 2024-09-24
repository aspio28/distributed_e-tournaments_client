import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import '@/styles/tailwind.css';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

import ToasService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

import 'primeicons/primeicons.css';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{red.50}',
            100: '{red.100}',
            200: '{red.200}',
            300: '{red.300}',
            400: '{red.400}',
            500: '{red.800}',
            600: '{red.600}',
            700: '{red.700}',
            800: '{red.500}',
            900: '{red.900}',
            950: '{red.950}'
        },
    }
});

const app = createApp(App)

app.use(createPinia());
app.use(router);
app.use(PrimeVue,{
    theme: {
        preset: MyPreset,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
 });
app.use(ToasService);
app.use(ConfirmationService);
app.mount('#app');
