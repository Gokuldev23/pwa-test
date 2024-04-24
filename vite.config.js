import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({ registerType: 'autoUpdate',injectRegister:"inline",workbox:{
      globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg}'],
      runtimeCaching:[{
        urlPattern:(e)=>{
          return  e.request.destination  != "image"
        },
        handler:"NetworkFirst",
        options: {
          cacheName: 'runtime_cache',
          expiration: {
            maxEntries: 60,
            maxAgeSeconds: 60*60  // <== 5 minutes
          },
          cacheableResponse: {
            statuses: [0,200]
          },
      },}
    ]
    }})
  ],
})
