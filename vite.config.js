import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': '/src/',
            vue: 'vue/dist/vue.esm-bundler.js'
        }
    },
    server: {
        host: true
    },
    base: ''
});
