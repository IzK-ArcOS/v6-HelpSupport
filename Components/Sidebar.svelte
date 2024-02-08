<script lang="ts">
  import { Runtime } from "../ts/runtime";
  import Article from "./Sidebar/Article.svelte";

  export let runtime: Runtime;

  const { Index } = runtime;
</script>

<div class="sidebar">
  {#each $Index as article}
    <Article {article} {runtime} />
  {/each}
</div>
