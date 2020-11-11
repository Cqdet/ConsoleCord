// deno-lint-ignore-file
import * as Colors from "https://deno.land/std/fmt/colors.ts";

export default class Logger {
  public static DEBUG_ENABLED: boolean = true;
  private name: string;

  public constructor(name: string) {
    this.name = name + " ";
    Colors.setColorEnabled(true); // whats the point in logger without colors D:
  }

  public debug(msg: string, ...extra: any[]): void {
    if (!Logger.DEBUG_ENABLED) return;
    msg = this.name + Colors.bold(Colors.rgb24("Debug", 0xa1a1a1)) + ": " + msg;
    this.log(msg, ...extra);
  }

  public critical(msg: string, ...extra: any[]): void {
    msg = this.name + Colors.bold(Colors.rgb24("Critical Error!", 0xe80013)) +
      ": " + Colors.rgb24(msg, 0xff4a59);
    this.log(msg, ...extra);
  }

  public error(msg: string, ...extra: any[]): void {
    msg = this.name + Colors.bold(Colors.rgb24("Error!", 0xff4a4a)) + ": " +
      Colors.rgb24(msg, 0xfc7e7e);
    this.log(msg, ...extra);
  }

  public warn(msg: string, ...extra: any[]): void {
    msg = this.name + Colors.bold(Colors.rgb24("Warn!", 0xffe96b)) + ": " +
      Colors.rgb24(msg, 0xfaeda2);
    this.log(msg, ...extra);
  }

  public notice(msg: string, ...extra: any[]): void {
    msg = this.name + Colors.bold(Colors.rgb24("Notice!", 0x55f7ff)) + ": " +
      Colors.rgb24(msg, 0x93e9ed);
    this.log(msg, ...extra);
  }

  public success(msg: string, ...extra: any[]): void {
    msg = this.name + Colors.bold(Colors.rgb24("Success!", 0x5eff94)) + ": " +
      Colors.rgb24(msg, 0xbaffd1);
    this.log(msg, ...extra);
  }

  public info(msg: string, ...extra: any[]): void {
    msg = this.name + Colors.bold(Colors.white("Info!")) + ": " + msg;
    this.log(msg, ...extra);
  }

  // notice: 0x55f7ff
  public logColor(color: any, msg: string, ...extra: any[]): void {
    this.log(Colors.rgb24(msg, color), ...extra);
  }

  private log(...messages: any[]): void {
    let date: Date = new Date();
    let time: string = [
      date.getHours() >= 10 ? date.getHours() : "0" + date.getHours(),
      date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes(),
      date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds(),
    ].join(":");
    time = Colors.rgb24(`[${time}]`, 0xbfbfbf);
    console.log(time, ...messages);
  }

  public static parseTime(): string {
    let date: Date = new Date();
    let time: string = [
      date.getHours() >= 10 ? date.getHours() : "0" + date.getHours(),
      date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes(),
      date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds(),
    ].join(":");
    return time;
  }
}
