import { EventEmitter } from "https://deno.land/std@0.74.0/node/events.ts";
import API from "../../rest/API.ts";

export default class Process extends EventEmitter {
  private stopped: boolean;

  private keyReader: Deno.Reader & { rid: number };

  constructor(token: string) {
    super();
    API.init(token);
    this.stopped = false;

    this.keyReader = Deno.stdin;
  }

  public async awaitKeystrokes() {
    const buffer = new Uint8Array(1024);
    Deno.setRaw(this.keyReader.rid, true);
    const length = <number> await this.keyReader.read(buffer);
    Deno.setRaw(this.keyReader.rid, false);
    const keystroke = buffer.subarray(0, length);
    this.emit("keystroke", keystroke);
    return keystroke;
  }

  public async awaitCommand() {
    const buffer = new Uint8Array(1024);
    await Deno.stdin.read(buffer);
    const cmd = buffer;
    this.emit("command", cmd);
    return cmd;
  }

  public stop(): void {
    this.stopped = true;
    this.emit("stop", null);
    Deno.exit();
  }
}
