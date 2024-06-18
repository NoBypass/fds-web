<script lang="ts">
  import type { PageData } from './$types';
  import Tag from '$lib/components/Tag.svelte';

  export let data: PageData;

  // TODO: redirect to error page on error

  const { player, times } = data.player;
  let rank: 'Premium' | 'Private' | 'Prime' | 'Pristine' | 'Member';
  $: rank = player.cages.includes('cages.premium')
    ? 'Premium'
    : player.cages.includes('cages.private')
      ? 'Private'
      : player.cages.includes('cages.prime')
        ? 'Prime'
        : player.cages.includes('cages.pristine')
          ? 'Pristine'
          : 'Member';

  const tagColors = {
    Premium: 'bg-scrims-premium/15 border-scrims-premium',
    Private: 'bg-scrims-private/15 border-scrims-private',
    Prime: 'bg-scrims-prime/15 border-scrims-prime',
    Pristine: 'bg-scrims-pristine/15 border-scrims-pristine',
    Member: 'bg-scrims-member/15 border-scrims-member',
  };

  const textColors = {
    Premium: 'text-scrims-premium',
    Private: 'text-scrims-private',
    Prime: 'text-scrims-prime',
    Pristine: 'text-scrims-pristine',
    Member: 'text-scrims-member',
  };
</script>

<header>
  <h1 class="text-xl mb-5">
    Scrims Profile for <b class={textColors[rank]}>{player.username}</b>
  </h1>
  <Tag class="inline-flex px-2.5 {tagColors[rank]}">{rank}</Tag>
</header>

<div class="mt-32">
  {#if data.error}
    <p>{data.error}</p>
  {:else}
    Success
  {/if}
</div>
