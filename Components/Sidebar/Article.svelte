<script lang="ts">
  import { Runtime } from "$apps/HelpSupport/ts/runtime";
  import { HelpArticle } from "$apps/HelpSupport/ts/types";
  import Article from "./Article.svelte";

  export let article: HelpArticle;
  export let runtime: Runtime;

  const { path } = runtime;

  function trigger() {
    runtime.handleOpenFile(article.path);
  }
</script>

<div class="article">
  <button on:click={trigger} class:active={$path == article.path}>
    {article.name}
  </button>
  {#if article.subitems}
    <div class="indent">
      {#each article.subitems as subArticle}
        <Article article={subArticle} {runtime} />
      {/each}
    </div>
  {/if}
</div>
