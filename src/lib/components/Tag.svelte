<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  let className = '';
  export { className as class };
</script>

<div
  class={twMerge(
    'px-2 py-0.5 border border-indigo-500 rounded-full bg-indigo-500/15 text-xs',
    className,
  )}
>
  <slot />
</div>
