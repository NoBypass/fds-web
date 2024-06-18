<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher()

  let className = ''
  export let placeholder = ''
  export let value = ''
  export let description = ''
  export let descriptionColor: 'neutral' | 'error' = 'neutral'
  export let color: 'primary' | 'success' | 'error' = 'primary'
  export let small = false

  export { className as class }

  let valWidth = 0
  let inputElem: HTMLInputElement | null = null
  let focused = false
  let cd = false

  const colors = {
    primary: 'border-neutral-600 has-[:focus]:border-indigo-500 outline-indigo-900',
    success: 'border-emerald-600 has-[:focus]:border-emerald-500 outline-emerald-900',
    error: 'border-rose-600 has-[:focus]:border-rose-500 outline-rose-900'
  }

  const descColors = {
    neutral: 'text-neutral-400',
    error: 'text-rose-500'
  }

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
  <div class="cursor-text flex border {small ? 'px-2' : 'px-3'} rounded-lg has-[:focus]:outline has-[:focus]:outline-offset-2 outline-offset-0 duration-150 outline-1 transition-all has-[:focus]:animate-pulse {colors[color]}">
    <span style="transform: translateY({small ? 4 : 10}px) translateX({valWidth-3}px)"
          class="{focused ? '' : 'hidden'} absolute bg-white ml-1 w-px h-5 transition-all duration-150 {cd ? '' : 'animate-blink'}" />
    <slot name="start" />
    <input type="text"
           use:focusOnParentClick
           class="placeholder:text-neutral-400 {small ? 'py-0.5' : 'py-1.5'} caret-transparent w-full bg-transparent color-neutral-100 focus:outline-none"
           placeholder={focused ? '' : placeholder}
           bind:this={inputElem}
           on:focus={() => focused = true}
           on:blur={() => focused = false}
           on:keydown={(e) => { if (e.key === 'Enter') dispatch('enter', {
              value
           }) }}
           bind:value />
    <slot name="end" />
  </div>
  {#if description !== ''}
    <p class="mt-1 {descColors[descriptionColor]} text-xs mb-1">{description}</p>
  {/if}
</div>
