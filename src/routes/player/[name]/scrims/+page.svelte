<script lang="ts">
  import type { PageData } from './$types';
  import Tag from '$lib/components/Tag.svelte';
  import CircleChart from '$lib/components/CircleChart.svelte';

  export let data: PageData;

  // TODO: redirect to error page on error

  const { player, totals } = data;
  const ranks = ['Premium', 'Private', 'Prime', 'Pristine', 'Member'];
  type Ranks = 'Premium' | 'Private' | 'Prime' | 'Pristine' | 'Member';
  let rank: Ranks = 'Member';
  $: rank = (ranks.find(r => player.cages.includes(`cages.${r.toLowerCase()}`)) || 'Member') as Ranks;

  const colors: {[idx: string]: {
    border: string,
    shadow: string,
    tag: string,
    text: string,
    stats: string,
    }} = {
    Premium: {
      border: 'border-scrims-premium',
      shadow: 'shadow-scrims-premium/15',
      tag: 'bg-scrims-premium/15',
      text: 'text-scrims-premium',
      stats: 'hover:border-scrims-premium hover:bg-scrims-premium/5 hover:shadow-scrims-premium/15',
    },
    Private: {
      border: 'border-scrims-private',
      shadow: 'shadow-scrims-private/15',
      tag: 'bg-scrims-private/15',
      text: 'text-scrims-private',
      stats: 'hover:border-scrims-private hover:bg-scrims-private/5 hover:shadow-scrims-private/15',
    },
    Prime: {
      border: 'border-scrims-prime',
      shadow: 'shadow-scrims-prime/15',
      tag: 'bg-scrims-prime/15',
      text: 'text-scrims-prime',
      stats: 'hover:border-scrims-prime hover:bg-scrims-prime/5 hover:shadow-scrims-prime/15',
    },
    Pristine: {
      border: 'border-scrims-pristine',
      shadow: 'shadow-scrims-pristine/15',
      tag: 'bg-scrims-pristine/15',
      text: 'text-scrims-pristine',
      stats: 'hover:border-scrims-pristine hover:bg-scrims-pristine/5 hover:shadow-scrims-pristine/15',
    },
    Member: {
      border: 'border-scrims-member',
      shadow: 'shadow-scrims-member/15',
      tag: 'bg-scrims-member/15',
      text: 'text-scrims-member',
      stats: 'hover:border-scrims-member hover:bg-scrims-member/5 hover:shadow-scrims-member/15',
    },
  }

  const stats: {title: string, key: string, data: number}[] = [
    { title: 'Wins', key: 'wins', data: totals.wins },
    { title: 'Draws', key: 'draws', data: totals.draws },
    { title: 'Losses', key: 'losses', data: totals.losses },
    { title: 'Games', key: 'games', data: totals.games },
    // TODO: { title: 'Finished Games', key: 'wins+draws+losses', data: totals.wins+totals.draws+totals.losses },
    { title: 'Time Played', key: 'secondsSpentPlaying', data: totals.secondsSpentPlaying },
    // TODO: { title: 'Time Online', key: 'playtime/1000', data: player.playtime/1000 },
    { title: 'Goals', key: 'goals', data: totals.goals },
    { title: 'Kills', key: 'kills', data: totals.kills },
    { title: 'Deaths', key: 'playerCausedDeaths', data: totals.playerCausedDeaths },
    // TODO: { title: 'Voids', key: 'deaths-playerCausedDeaths', data: totals.deaths-totals.playerCausedDeaths },
    { title: 'Gapples', key: 'gapplesEaten', data: totals.gapplesEaten },
    { title: 'Damage Dealt', key: 'damageDealt', data: totals.damageDealt },
    { title: 'Blocks Placed', key: 'blocksPlaced', data: totals.blocksPlaced },
    { title: 'Blocks Broken', key: 'blocksBroken', data: totals.blocksBroken },
    { title: 'Hits Given', key: 'hitsGiven', data: totals.hitsGiven },
    { title: 'Hits Taken', key: 'hitsTaken', data: totals.hitsTaken },
    { title: 'Arrow Hits', key: 'arrowsHit', data: totals.arrowsHit },
    { title: 'Arrow Shots', key: 'arrowsShot', data: totals.arrowsShot },
  ];

  const bridge: { [idx: string]: any } = player.stats.bridge;

  let selected: number = 0;
  let selectedCategory = 'all';
  let ss: any;

  const statsPerSelected = () => {
    let res: { [idx: string]: { [idx: string]: number } } = {}
    for (const category of ['private', 'ranked', 'casual', 'duel']) {
      res[category] = {
        '1v1': Math.round(bridge[category]?.['1v1']?.[s.key] as number) || 0,
        '2v2': Math.round(bridge[category]?.['2v2']?.[s.key] as number) || 0,
        '3v3': Math.round(bridge[category]?.['3v3']?.[s.key] as number) || 0,
        '4v4': Math.round(bridge[category]?.['4v4']?.[s.key] as number) || 0,
        'other':Math.round( bridge[category]?.['other']?.[s.key] as number) || 0,
      }
    }
    return res;
  }

  const secsToTime = (secs: number): string => `${Math.round(secs / 360)/10}h`;

  const timeToSecs = (time: string): number => parseFloat(time) * 3600;

  const fmtNumber = (x: any): string => {
    if (typeof x === 'number') return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return x;
  }

  const sumValues = (category: string) => ss[category]?.['1v1'] + ss[category]?.['2v2'] + ss[category]?.['3v3'] + ss[category]?.['4v4'] + ss[category]?.['other'];

  $: s = stats[selected];

  $: ss = {
    total: stats[selected].data,
    ...statsPerSelected()
  }

  $: sum = sumValues(selectedCategory) || totals[s.key] || 0;

  $: displayData = selectedCategory !== 'all' ? [
    { label: 'All', value: sum },
    { label: '1v1', value: ss[selectedCategory]['1v1'] },
    { label: '2v2', value: ss[selectedCategory]['2v2'] },
    { label: '3v3', value: ss[selectedCategory]['3v3'] },
    { label: '4v4', value: ss[selectedCategory]['4v4'] },
    { label: 'Other', value: ss[selectedCategory]['other'] },
  ] : [
    { label: 'All', value: totals[s.key] },
    { label: 'Private', value: sumValues('private') },
    { label: 'Casual', value: sumValues('casual') },
    { label: 'Ranked', value: sumValues('ranked') },
    { label: 'Duel', value: sumValues('duel') },
  ].map(item => ({ ...item, value: selected === 4 ? secsToTime(item.value) : Math.round(item.value) }));

  $: chartData = displayData.map(({ label, value }) => ({
    name: label,
    value: typeof value === 'number' ? value : timeToSecs(value),
  })).filter(({ name, value }) => value !== 0 && !isNaN(value) && name !== 'All');
</script>

<main class="3xl:px-120 2xl:px-60 xl:px-32">
  <header>
    <h1 class="text-xl mb-5">
      Scrims Profile for <b class={colors[rank].text}>{player.username}</b>
    </h1>
    <Tag class="inline-flex px-2.5 {colors[rank].tag} {colors[rank].border}">{rank}</Tag>
  </header>

  <section>
    <h2 class="mb-4">Bridge</h2>
    <div id="stats" class="grid grid-cols-6 gap-2.5">
      {#each stats as { title, data }, i}
        <button on:click={() => selected = i} class="{selected === i ? colors[rank].border : 'border-neutral-950'} hover:shadow-lg cursor-pointer bg-neutral-950 transition-all duration-150 inline-flex flex-col items-center w-full py-2.5 rounded-lg gap-1 border {colors[rank].stats}">
          <h3 class="text-sm text-neutral-400">{title}</h3>
          {#if i === 4}
            <p class="text-lg font-bold">{fmtNumber(secsToTime(data))}</p>
          {:else}
            <p class="text-lg font-bold">{fmtNumber(Math.round(data))}</p>
          {/if}
        </button>
      {/each}
    </div>

    <div class="grid grid-cols-5 bg-neutral-950 h-120 mt-8 rounded-lg p-4 border {colors[rank].border} shadow-xl {colors[rank].shadow}">
      <nav class="flex items-center border-r border-r-neutral-500">
        <ul class="space-y-1 w-full pr-4">
          {#each ['All', 'Casual', 'Duel', 'Private', 'Ranked'] as category}
            <li>
              <button disabled={category === 'All' ? false : sumValues(category.toLowerCase()) === 0}
                      on:click={() => selectedCategory = category.toLowerCase()}
                      class:bg-neutral-800={selectedCategory === category.toLowerCase()}
                      class="w-full rounded-md hover:bg-neutral-900 duration-150 py-0.5 px-2 disabled:hover:bg-transparent disabled:text-white/50 text-left">
                {category}
              </button>
            </li>
          {/each}
        </ul>
      </nav>
      <main class="col-span-4 grid grid-cols-2 grid-rows-4 gap-4 pl-4">
        <h1 class="col-span-2 text-center">Details for <b>{s.title}</b></h1>
        <article class="row-span-3 col-start-1">
          {#each displayData as { label, value }}
            <p>{label} {value}</p>
          {/each}
        </article>
        <CircleChart class="row-span-3 place-self-center" centerText={selected === 4 ? secsToTime(sum) : Math.round(sum)} data={chartData} />
      </main>
    </div>
  </section>

  <section>
    <h2 class="flex gap-4 items-center">Tow <Tag>Coming Soon</Tag></h2>
  </section>
</main>

<style lang="postcss">
    main section {
        @apply mt-12
    }

    main section h2 {
        @apply text-lg
    }

    #stats {

    }
</style>
