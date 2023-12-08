import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import cors from 'cors';

// https://vitejs.dev/config/
export default defineConfig( {
  // server: {
  //   middleware: [
  //     cors( {
  //       allowedHeaders: 'Content-Type,Authorization',
  //       origin: 'http://localhost:5000/', // Specify your allowed origin
  //       methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //       credentials: true,
  //     } )
  //   ]
  // },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:5000',
          'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Headers': 'Content-Type,Authorization', // Specify your allowed headers
        },
      },
    },
  },
  plugins: [ react() ],
} )
