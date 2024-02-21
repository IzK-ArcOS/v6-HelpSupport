import { sleep } from "$ts/util";
import { AppKeyCombinations } from "$types/accelerator";
import { Runtime } from "./runtime";

export const HelpSupportAccelerators: (runtime: Runtime) => AppKeyCombinations = (runtime) => {
  return [
    {
      key: "r",
      alt: true,
      shift: false,
      async action() {
        const path = runtime.path.get();
        runtime.handleOpenFile("");
        await sleep();
        runtime.handleOpenFile(path);
      },
    },
  ];
};
