<script lang="ts">
  import Tag from '$lib/components/Tag.svelte';
  import { page } from '$app/stores';
  import Input from '$lib/components/Input.svelte';

  $: path = $page.url.pathname.split("/")
  $: current = path.pop()!.replace(/\b\w/g, char => char.toUpperCase())
  $: link = `/player/${path.pop()!}`;
</script>

<div class="grid grid-rows-sidebar grid-cols-topbar h-full">
  <nav class="h-12 w-64 border-b border-r flex items-center px-6 border-neutral-750">
    <h1 class="text-xl">FDS</h1>
  </nav>
  <nav class="h-12 w-full border-b border-neutral-750 flex items-center justify-between px-4 text-neutral-400">
    <div class="flex items-center">
      <a href="/" class="h-12 w-12 grid content-center hover:text-neutral-300 duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" stroke-width="2" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </a>
      <p class="text-sm -translate-x-3">{current}</p>
    </div>
    <!-- TODO: Request /exists like on landing page -->
    <Input small
           class="w-72"
           placeholder="Search Players..."
           on:enter={(e) => window.location.href = `/player/${e.detail.value}/${current.toLowerCase()}`} />
  </nav>

  <nav class="border-r border-neutral-750 h-full w-64">
    <section>
      <h2>Tabs</h2>
      <ul>
        <li class:active={current === 'Home'}><a href={`${link}/home`}>Home</a></li>
        <li class:active={current === 'Hypixel'}><a class="gap-3 justify-between items-center" href="/">Hypixel <Tag>Coming Soon</Tag></a></li>
        <li class:active={current === 'Minemen'}><a class="gap-3 justify-between items-center" href="/">Minemen <Tag>Coming Soon</Tag></a></li>
        <li class:active={current === 'Scrims'}><a href={`${link}/scrims`}>Scrims</a></li>
      </ul>
    </section>
    <section>
      <h2>About</h2>
      <ul>
        <li class="hover:bg-neutral-800 rounded-md"><a href="/">Wiki</a></li>
        <li class="hover:bg-neutral-800 rounded-md"><a href="/">Source Code</a></li>
      </ul>
    </section>
  </nav>

  <main class="p-5">
    <slot />
  </main>
</div>

<style>
    .active {
      @apply bg-neutral-800
    }

    nav section {
        @apply px-4 border-b border-neutral-750 py-5
    }

    nav section h2 {
        @apply text-neutral-500 text-sm mb-2 px-2
    }

    nav section ul {
        @apply cursor-pointer
    }

    nav section ul li {
        @apply text-sm text-neutral-300 hover:bg-neutral-800 rounded-md
    }

    nav section ul li a {
        @apply px-2 py-1.5 w-full h-full flex
    }
</style>
