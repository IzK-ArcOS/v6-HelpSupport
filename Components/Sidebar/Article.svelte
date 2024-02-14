<script lang="ts">
  import { Runtime } from "$apps/HelpSupport/ts/runtime";
  import { HelpArticle } from "$apps/HelpSupport/ts/types";
  import { BookIcon } from "$ts/images/general";
  import { onMount } from "svelte";
  import Article from "./Article.svelte";
  import { getAllImages } from "$ts/images";

  export let article: HelpArticle;
  export let runtime: Runtime;

  const { path } = runtime;

  let icon = BookIcon;

  function trigger() {
    runtime.handleOpenFile(article.path);
  }

  onMount(() => {
    if (!article.icon) return;

    const icons = getAllImages();

    icon = icons[article.icon] || BookIcon;
  });
</script>

<div class="article">
  <button on:click={trigger} class:active={$path == article.path} class:subitems={!!article.subitems}>
    <img src={icon} alt="" />
    <span>{article.name}</span>
  </button>
  {#if article.subitems}
    <div class="indent" class:show={$path == article.path}>
      {#each article.subitems as subArticle}
        <Article article={subArticle} {runtime} />
      {/each}
    </div>
  {/if}
</div>
