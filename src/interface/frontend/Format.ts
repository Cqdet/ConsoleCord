import * as Colors from "https://deno.land/std/fmt/colors.ts";

export default class Format {
  public static flexSquare(content: string) {
    const l = content.length;
    return `${Format.color(0x005AAA, `|${"-".repeat(l + 5)}|`)}\n${
      Format.color(0x005AAA, `|`)
    }  ${Format.color(0x088B65, content)}   ${Format.color(0x005AAA, `|`)}\n${
      Format.color(0x005AAA, `|${"-".repeat(l + 5)}|`)
    }\n`;
  }

  public static staticSquare(content: string, length: number) {
    if (length % 2 !== 0) throw new Error("Non-even number given");
    return `${Format.color(0x005AAA, `|${"-".repeat(length)}|`)}\n  ${
      Format.color(0x088B65, content)
    } \n${Format.color(0x005AAA, `|${"-".repeat(length)}|`)}\n`;
  }

  public static color(color: number, content: string) {
    return Colors.rgb24(content, color);
  }
}
