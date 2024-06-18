<script lang="ts">
  import Input from '$lib/components/Input.svelte';
  import axios from 'axios';
  import lodash from 'lodash';
  import Loader from '$lib/components/Loader.svelte';
  import { preloadData } from '$app/navigation';
  import { playerNameLoadedStore } from './player/[name]/store';

  let name = ''
  let status = ''
  let errorMsg = ''
  $: link = name === '' ? '' : `/player/${name}/home`
  $: if (status !== 'error') errorMsg = ''

  const fetchStatus = lodash.debounce(async () => {
    status = 'loading'
      axios.get(`${import.meta.env.VITE_API_URL}/player/exists/${name}`)
        .catch((e) => {
          if (e.response) {
            errorMsg = e.response.data.message;
          } else if (e.request) {
            errorMsg = 'Could not connect to the server. Please try again later.';
          } else {
            errorMsg = 'An error occurred. Please try again later.';
          }
          status = 'error'
        })
        .then((response) => {
          if (response === undefined) return
          if (response.status === 200) {
            status = 'success'
            name = response.data
            preloadData(link)
            playerNameLoadedStore.set(true)
          } else {
            errorMsg = response.data.message
            status = 'error'
          }
        });
  }, 500)

  $: {
    if (name === '') {
      status = ''
    } else {
      fetchStatus()
    }
  }
</script>

<svelte:head>
  <title>FDS</title>
  <meta name="description" content="The FDS web app" />
</svelte:head>

<section class="w-full h-screen grid place-content-center gap-28">
  <h1 class="text-center text-5xl font-bolder">
    The <p class="inline text-indigo-500">modern</p>
    way<br /> to view Bridge stats
  </h1>
  <Input description={errorMsg || "Enter any Minecraft username"}
         descriptionColor={status === 'error' ? 'error' : 'neutral'}
         placeholder="Name"
         class="lg:w-[35vw]"
         color={status === 'success' ? 'success' : status === 'error' ? 'error' : 'primary'}
         on:enter={() => window.location.href = link}
         bind:value={name}>
    <div slot="end">
      {#if status === 'loading'}
        <div class="h-full flex items-center">
          <Loader />
        </div>
      {:else if status === 'success'}
        <a href={link}
           class="translate-x-2 h-full w-10 grid place-content-center cursor-pointer duration-300 text-emerald-500/50 hover:text-emerald-500/80">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
               stroke="currentColor"
               class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
          </svg>
        </a>
      {:else if status === 'error'}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-rose-500/80 h-full py-1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
      {/if}
    </div>
  </Input>
</section>
