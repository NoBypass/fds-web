<script>
  import Input from '$lib/components/Input.svelte';

  let name = ''
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
  <Input description="Enter any Minecraft username"
         placeholder="Name"
         class="lg:w-[35vw]"
         on:enter={() => window.location.href = `/player/${name}/home`}
         bind:value={name}>
    <a slot="end" href={`/player/${name}/home`}
       class="translate-x-2 h-10 w-10 grid place-content-center cursor-pointer duration-300 text-white/50 hover:text-white/80">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
           stroke="currentColor"
           class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
      </svg>
    </a>
  </Input>
</section>
