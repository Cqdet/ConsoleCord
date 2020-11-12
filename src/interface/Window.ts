import { _TextDecoder } from "https://deno.land/std@0.74.0/node/_utils.ts";
import API from "../rest/API.ts";
import showChannelMessages from "./frontend/functions/showChannelMessages.ts";
import showCurrentUserGuilds from "./frontend/functions/showCurrentUserGuilds.ts";
import Process from "./backend/Process.ts";

export default class Window {
  private alive: boolean;
  private cache: Map<string, unknown>;
  private process: Process;

  constructor(token: string) {
    this.alive = true;
    this.cache = new Map();
    this.process = new Process(token);
  }

  public async start() {
    while (this.alive) {
      const arrayBuffer = (await this.process.awaitCommand()).filter(
        (i) => i !== 0,
      );
      const args = new TextDecoder("utf8").decode(Uint8Array.from(arrayBuffer))
        .split(" ");
      if (!args) return;

      switch (args[0]) {
        case "channel": {
          const id = args[1].slice(0, -1);
          await this.render("channelMessages", [id]);
          continue;
        }
        case "send": {
          if (!this.cache.get("CHANNEL_ID")) return;
          if (!args[1]) return;
          await API.sendMessage(
            args.slice(1).join(" "),
            this.cache.get("CHANNEL_ID") as string,
          );
          continue;
        }
        case "guilds\r\n": {
          await this.render("currentUserGuilds");
          continue;
        }

        case "guild": {
          const id = args[1].slice(0, -1);
        }
      }
    }
  }
  public async render(
    text: "channelMessages" | "currentUserGuilds",
    ...additional: unknown[]
  ) {
    await this.print("\n".repeat(2000));
    switch (text) {
      case "channelMessages": {
        this.cache.set("CHANNEL_ID", additional[0] as string);
        await showChannelMessages(additional[0] as string);
        break;
      }
      case "currentUserGuilds": {
        return await showCurrentUserGuilds();
      }
    }
  }

  public async print(content: string) {
    return await Deno.stdout.write(new TextEncoder().encode(content));
  }
}
