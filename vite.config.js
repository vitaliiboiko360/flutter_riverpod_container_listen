import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import vitePluginSass from 'vite-plugin-sass';
import { patchCssModules } from 'vite-css-modules';

export default defineConfig({
  define: {
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  base: './',
  mode: 'development',
  appType: 'spa',
  server: {
    host: '0.0.0.0',
    port: 3001,
    fs: {
      allow: ['./data/', './'],
      deny: ['./node_modules'],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log(
              'Received Response from the Target:',
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
    },
  },
  esbuild: {
    legalComments: 'none',
  },
  resolve: {
    alias: [
      { find: 'css', replacement: path.resolve(__dirname, 'css') },
      { find: 'data', replacement: path.resolve(__dirname, 'data') },
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [patchCssModules(), vitePluginSass(), vue()],
  css: {
    modules: {
      generateScopedName: '[hash]',
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use './css/shared.scss' as *;`,
      },
    },
  },
  build: {
    output: {
      dir: 'js',
      name: 'index.js',
    },
  },
  optimizeDeps: {
    exclude: ['@tanstack/vue-query'],
  },
});
