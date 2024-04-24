<script>
  import { onMount } from "svelte";

  let arr = []
  onMount(async()=>{
    let res = await fetch('https://dummyjson.com/products?limit=5')
    let products = await res.json()
    console.log(products.products)
    arr = products.products

    Notification.requestPermission().then(prem=>{
      console.log({prem})
    })

  })
</script>


{#each arr as {title,description}}
  <h4>{title}</h4>
  <p>{description}</p>
{/each}