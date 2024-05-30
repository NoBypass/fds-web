<script lang="ts">
  import type { LayoutData } from '../$types'

  export let data: LayoutData
</script>

{#await data.name}
  Loading...
{:then name}
  {name}
{:catch error}
  <p>Error loading name: {error.message}</p>
{/await}
