import API from "../../../rest/API.ts";
import Format from "../Format.ts";

export default async function showChannelMessages(channelID: string) {
  const msgs = await API.getMessages({ limit: 5 }, channelID);
  msgs.reverse();
  const encoder = new TextEncoder();
  for (const msg of msgs) {
    await Deno.stdout.write(
      encoder.encode(Format.staticSquare(
        `${msg.author.username}#${msg.author.discriminator} => ${msg.content}`,
        100,
      )),
    );
  }
}
