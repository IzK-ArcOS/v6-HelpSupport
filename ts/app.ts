import { QuestionIcon } from "$ts/images/dialog";
import { App } from "$types/app";
import AppSvelte from "../App.svelte";
import { Runtime } from "./runtime";

export const HelpSupport: App = {
  metadata: {
    name: "Help & Support",
    description: "Get useful information and help",
    author: "The ArcOS Team",
    version: "1.0.5",
    icon: QuestionIcon,
    appGroup: "support"
  },
  runtime: Runtime,
  content: AppSvelte,
  id: "HelpSupport",
  size: { w: 900, h: 550 },
  minSize: { w: 550, h: 400 },
  maxSize: { w: 1200, h: 900 },
  pos: { x: 150, y: 150 },
  state: {
    minimized: false,
    maximized: false,
    headless: false,
    fullscreen: false,
    resizable: true
  },
  controls: {
    minimize: true,
    maximize: true,
    close: true
  },
  singleInstance: true
};