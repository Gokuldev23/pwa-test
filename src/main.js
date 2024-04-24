import './app.css'
import App from './App.svelte'

// main.js or app.js

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('../service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function(error) {
        console.error('Service Worker registration failed in  main:', error);
      });
  });
}

const app = new App({
  target: document.getElementById('app'),
})

export default app
