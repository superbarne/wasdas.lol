import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [
    basicSsl()
  ],
  // Your configuration options go here
  server: {
    host: '0.0.0.0'
  }
});
