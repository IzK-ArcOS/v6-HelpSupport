<script lang="ts">
  import { App } from "$types/app";
  import { Pane, Splitpanes } from "svelte-splitpanes";
  import Renderer from "./Components/Renderer.svelte";
  import Sidebar from "./Components/Sidebar.svelte";
  import "./css/main.css";
  import { Runtime } from "./ts/runtime";

  export let runtime: Runtime;

  const { Index } = runtime;
</script>

{#if $Index.length}
  <Splitpanes>
    <Pane minSize={60}>
      <Renderer {runtime} />
    </Pane>
    <Pane minSize={25} size={25}>
      <Sidebar {runtime} />
    </Pane>
  </Splitpanes>
{/if}
