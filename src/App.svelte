<script>
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";

  // Check if the browser supports service workers
  if ("serviceWorker" in navigator) {
    // Register the service worker
    navigator.serviceWorker
      .register("../service-worker.js")
      .then(function (registration) {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch(function (error) {
        console.error("Service Worker registration failed:", error);
      });
  }

  // Function to display a notification
  function showNotification() {
    let title = "new notification";
    let options = {
      body: "This is a notification from your web app!",
      icon: "svelte.svg",
      vibrate: [200, 100, 200],
    };
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notification");
      return;
    }

    // Check if the user has granted permission to display notifications
    if (Notification.permission === "granted") {
      // If permission has been granted, show the notification
      navigator.serviceWorker.ready.then(function (registration) {
        registration.showNotification(title, options);
      });
    } else if (Notification.permission !== "denied") {
      // If permission has not been denied, request permission from the user
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(title, options);
          });
        }
      });
    }
  }

  // Example usage
  // showNotification('Hello', {
  //   body: 'This is a notification from your web app!',
  //   icon: '/path/to/icon.png'
  // });
</script>

<main>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>
  <button on:click={showNotification}>Notify</button>
  <Counter />
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
