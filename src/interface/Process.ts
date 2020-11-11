import { EventEmitter } from "https://deno.land/std@0.74.0/node/events.ts";
import API from "../rest/API.ts";

export default class Process extends EventEmitter {
  private stopped: boolean;

  private keyReader: Deno.Reader & { rid: number };
  private keyBuffer: Uint8Array;

  private commandBuffer: Uint8Array;

  constructor(token: string) {
    super();
    API.init(token);
    this.stopped = false;

    this.keyReader = Deno.stdin;
    this.keyBuffer = new Uint8Array(1024);

    this.commandBuffer = new Uint8Array(1024);
  }

  public start() {
    this.emit("ready");
  }

  public async awaitKeystrokes() {
    Deno.setRaw(this.keyReader.rid, true);
    const length = <number> await this.keyReader.read(this.keyBuffer);
    Deno.setRaw(this.keyReader.rid, false);
    const keystroke = this.keyBuffer.subarray(0, length);
    this.emit("keystroke", keystroke);
    // return keystroke;
  }

  public async awaitCommand() {
    await Deno.stdin.read(this.commandBuffer);
    const cmd = this.commandBuffer;
    this.emit("command", cmd);
    // return cmd;
  }

  public stop(): void {
    this.stopped = true;
    this.emit("stop", null);
    Deno.exit();
  }
}
