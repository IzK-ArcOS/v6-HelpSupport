import { AppRuntime } from "$ts/apps/runtime";
import { getAllImages } from "$ts/images";
import { BadStatusIcon } from "$ts/images/status";
import { tryJsonConvert } from "$ts/json";
import { Process } from "$ts/process";
import { createErrorDialog } from "$ts/process/error";
import { readFile } from "$ts/server/fs/file";
import { sleep } from "$ts/util";
import { Store } from "$ts/writable";
import type { App, AppMutator } from "$types/app";
import { ArcFile } from "$types/fs";
import { HelpSupportAccelerators } from "./accelerators";
import { HelpArticleIndex } from "./types";

export class Runtime extends AppRuntime {
  public File = Store<ArcFile>();
  public buffer = Store<string>();
  public path = Store<string>();
  public wrapper = Store<HTMLDivElement>();
  public Index = Store<HelpArticleIndex>([]);
  public renderArticle = Store<boolean>(false);
  public readonly STARTPATH = "@client/help/Home.md";

  constructor(app: App, mutator: AppMutator, process: Process) {
    super(app, mutator, process);

    this.openedFile.subscribe(async (v) => {
      if (!v) return;

      await this.readFile(v);
    });

    this.process.accelerator.store.push(...HelpSupportAccelerators(this));
    this._init();
  }

  private async _init() {
    await this.readIndex();

    this.handleOpenFile(this.STARTPATH);
  }

  async readIndex() {
    const index = await readFile(`@client/help/index.json`);

    if (!index) return this.indexReadError();

    const data = await index.data.text();
    const json = tryJsonConvert<HelpArticleIndex>(data);

    if (typeof json === "string") return this.indexReadError();

    this.Index.set(json);
  }

  async readFile(v: string) {
    this.renderArticle.set(false);

    const file = await readFile(v);

    if (!file) return this.articleReadError(v);

    this.path.set(v);

    const content = await file.data.text();

    this.buffer.set("");
    await sleep(10);
    this.buffer.set(content);

    this.File.set(file);

    setTimeout(() => {
      this.setAnchorRedirects();
      this.replaceIconSources();

      this.renderArticle.set(true);
    }, 100);
  }

  public setAnchorRedirects() {
    const path = this.path.get();
    const wrapper = this.wrapper.get();

    if (!path || !wrapper) {
      return false;
    }

    const anchors = wrapper.querySelectorAll("a");

    for (const anchor of anchors) {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();

        const href = anchor.getAttribute("href");

        if (!href.startsWith("@client")) return;

        this.handleOpenFile(href);
      });
    }
  }

  public replaceIconSources() {
    const path = this.path.get();
    const wrapper = this.wrapper.get();

    if (!path || !wrapper) {
      console.log("nononono");
      return false;
    }

    const images = wrapper.querySelectorAll("img");
    const icons = getAllImages();

    for (const image of images) {
      const src = image.getAttribute("src");

      for (const id in icons) {
        if (src == `#${id}`) {
          image.setAttribute("src", icons[id]);
        }
      }

      if (src.startsWith("@client"))
        image.setAttribute("src", src.replace("@client", "."));
    }
  }

  public indexReadError() {
    createErrorDialog(
      {
        title: "Load failed!",
        message:
          "Help & Support can't find the Index file! Without it, it doesn't know what articles are available. Try restarting ArcOS, if that doesn't work, create a GitHub issue.",
        buttons: [
          {
            caption: "Close",
            action: () => this.closeApp(),
            suggested: true,
          },
        ],
        image: BadStatusIcon,
        sound: "arcos.dialog.error",
      },
      this.pid,
      true
    );

    return false;
  }

  public articleReadError(path = this.path.get()) {
    createErrorDialog(
      {
        title: "Wisdom out of reach!",
        message: `It seems you've found a glitch in the matrix. It's either that, or you modified the frontend. Regardless, the help article you tried to open doesn't exist.<br/><br/>Tried to open <code>${path}</code>`,
        buttons: [
          {
            caption: "Go Home",
            action: () => {
              this.handleOpenFile(this.STARTPATH);
            },
            suggested: true,
          },
        ],
        image: BadStatusIcon,
        sound: "arcos.dialog.error",
      },
      this.pid,
      true
    );

    return false;
  }
}
