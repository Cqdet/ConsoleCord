import API from "../../../rest/API.ts";

export default async function showGuild(guildID: string) {
  const guild = await API.getGuild(guildID);
  let channels = await API.getGuildChannels(guildID);
  // deno-lint-ignore no-explicit-any
  channels = channels.filter((ch: any) => ch.type === 4);
  await Deno.stdout.write(
    new TextEncoder().encode(
      `GUILD NAME => ${guild.name}\n`,
    ),
  );
  for (const channel of channels) {
    await Deno.stdout.write(
      new TextEncoder().encode(`---\n#${channel.name}\n`),
    );
  }
}
