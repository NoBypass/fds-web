<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher()

  let className = ''
  export let placeholder = ''
  export let value = ''
  export let description = ''

  export { className as class }

  let valWidth = 0
  let inputElem: HTMLInputElement | null = null
  let focused = false
  let cd = false

  $: {
    if (value !== '' && inputElem) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      ctx.font = getComputedStyle(inputElem).font
      valWidth = ctx.measureText(value).width
      cd = true;
      setTimeout(() => {
        cd = false
      }, 1000)
    } else {
      valWidth = 0
    }
  }

  function focusOnParentClick(node: HTMLInputElement) {
    const handleClick = () => node.focus()
    node.parentNode!.addEventListener('click', handleClick)

    return {
      destroy() {
        node.parentNode!.removeEventListener('click', handleClick)
      }
    }
  }
</script>

<div class={className}>
  <div class="cursor-text flex border border-neutral-600 px-3 rounded-lg has-[:focus]:border-indigo-500 has-[:focus]:outline outline-indigo-900 has-[:focus]:outline-offset-2 outline-offset-0 duration-150 outline-1 transition-all has-[:focus]:animate-pulse">
    <span style="transform: translateY(10px) translateX({valWidth-3}px)"
          class="{focused ? '' : 'hidden'} absolute bg-white ml-1 w-px h-5 transition-all duration-150 {cd ? '' : 'animate-blink'}" />
    <slot name="start" />
    <input type="text"
           use:focusOnParentClick
           class="placeholder:text-neutral-400 caret-transparent w-full bg-transparent color-neutral-100 focus:outline-none"
           placeholder={focused ? '' : placeholder}
           bind:this={inputElem}
           on:focus={() => focused = true}
           on:blur={() => focused = false}
           on:keydown={(e) => { if (e.key === 'Enter') dispatch('enter', e) }}
           bind:value />
    <slot name="end" />
  </div>
  {#if description !== ''}
    <p class="mt-0.5 text-neutral-400 text-xs mb-1">{description}</p>
  {/if}
</div>
