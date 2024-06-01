<script lang="ts">
  import type { LayoutServerData } from './$types';
  import { tabStore } from './store';
  import Tag from '$lib/components/Tag.svelte';

  export let data: LayoutServerData;
</script>

<div class="grid grid-rows-sidebar grid-cols-topbar h-full">
  <nav class="h-12 w-64 border-b border-r flex items-center px-6 border-neutral-750">
    <h1 class="text-xl">
      {#await data.name}
        Player Overview
      {:then name}
        {name}
      {:catch error}
        <p>Error loading data: {error.message}</p>
      {/await}
    </h1>
  </nav>
  <nav class="h-12 w-full border-b border-neutral-750 flex items-center px-4 text-neutral-400">
    <a href="/" class="h-12 w-12 grid content-center hover:text-neutral-300 duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" stroke-width="2" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
    </a>
    <p class="text-sm">{$tabStore}</p>
  </nav>

  <nav class="border-r border-neutral-750 h-full w-64">
    <section>
      <h2>Tabs</h2>
      <ul>
        <li>Home</li>
        <li class="flex gap-3 items-center">Hypixel <Tag>Coming Soon</Tag></li>
        <li>Scrims</li>
      </ul>
    </section>
    <section>
      <h2>About</h2>
      <ul>
        <li>Wiki</li>
        <li>Source Code</li>
      </ul>
    </section>
  </nav>

  <main class="p-5">
    <!-- <p set:html={JSON.stringify(player)}></p> -->
    <slot />
  </main>
</div>

<style>
    nav section {
        @apply px-6 border-b border-neutral-750 py-5
    }

    nav section h2 {
        @apply text-neutral-500 text-sm mb-2
    }

    nav section ul li {
        @apply text-sm py-1.5 text-neutral-300
    }
</style>
