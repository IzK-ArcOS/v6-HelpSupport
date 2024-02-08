<script lang="ts">
  import MarkdownRenderer from "$lib/Components/MarkdownRenderer.svelte";
  import { onMount } from "svelte";
  import { Runtime } from "../ts/runtime";

  export let runtime: Runtime;

  const { buffer, renderArticle } = runtime;

  let wrapper: HTMLDivElement;

  onMount(() => {
    runtime.wrapper.set(wrapper);
  });
</script>

<div class="wrapper" bind:this={wrapper} class:show={$renderArticle}>
  <MarkdownRenderer content={$buffer} />
</div>
