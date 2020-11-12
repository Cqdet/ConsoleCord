import API from "../../../rest/API.ts";
import Format from "../Format.ts";

export default async function showCurrentUserGuilds() {
  const encoder = new TextEncoder();
  const guilds = await API.getCurrentUserGuilds();
  await Deno.stdout.write(
    new TextEncoder().encode(
      `USER GUILDS\n`,
    ),
  );
  for (const guild of guilds) {
    await Deno.stdout.write(
      encoder.encode(Format.staticSquare(`- ${guild.name} -`, 34)),
    );
  }
}
