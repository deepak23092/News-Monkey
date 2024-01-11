import { defineConfig } from 'vite';
import replace from '@rollup/plugin-replace';

export default defineConfig({
  // other config options...
  build: {
    rollupOptions: {
      plugins: [
        replace({
          'process.env.VITE_NEWS_API': JSON.stringify(process.env.VITE_NEWS_API),
        }),
      ],
    },
  },
});
