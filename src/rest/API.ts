/**
 * The base API client
 */
export default class API {
  public static token: string;

  public static init(token: string) {
    this.token = token;
  }

  public static async request(
    method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
    endpoint: string,
    body: Record<string, unknown>,
    encodeURI: boolean,
  ) {
    const headers = method === "POST" || method === "PATCH"
      ? {
        Authorization: `${this.token}`,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.286 Chrome/85.0.4183.121 Electron/10.1.5 Safari/537.36",
        "Content-Type": "application/json",
        // "Accept": "*/*",
        // "Accept-Encoding": "gzip, deflate, br",
        // "Accept-Language": "en-US",
        // "Content-Length": 0,
        // "Origin": "https://discord.com",
        // "Referer": "",
      }
      : {
        Authorization: `${this.token}`,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.286 Chrome/85.0.4183.121 Electron/10.1.5 Safari/537.36",
      };

    let content = JSON.stringify(body);
    if (
      (method === "GET" || method === "DELETE") &&
      (Object.keys(body).length === 0)
    ) {
      let qs = "";
      Object.keys(body).forEach((key) => {
        if (body[key] != undefined) {
          if (Array.isArray(body[key])) {
            // deno-lint-ignore ban-ts-comment
            // @ts-ignore
            body[key].forEach(function (val: unknown) {
              qs += `&${encodeURIComponent(key)}=${
                encodeURIComponent(val as string)
              }`;
            });
          } else {
            qs += `&${encodeURIComponent(key)}=${
              // deno-lint-ignore ban-ts-comment
              // @ts-ignore
              encodeURIComponent(body[key])
            }`;
          }
        }
        content = qs;
      });
    }
    const res = await fetch(`https://canary.discord.com/api/v8/` + endpoint, {
      method,
      body: encodeURI ? null : content,
      // deno-lint-ignore no-explicit-any
      headers: <any> headers,
    });

    if (!res.ok) {
      throw `Failed to ${method}: ` + await res.text();
    } else {
      return res.json();
    }
  }

  public static async sendMessage(content: string, channelID: string) {
    return await this.request("POST", `channels/${channelID}/messages`, {
      content: content,
    }, false);
  }

  public static async getMessages(
    query: { around?: number; before?: number; after?: number; limit?: number },
    channelID: string,
  ) {
    if (!query.limit) {
      query.limit = 50;
    }
    return await this.request(
      "GET",
      `/channels/${channelID}/messages`,
      query,
      true,
    );
  }

  public static async getCurrentUserGuilds() {
    return await this.request("GET", "/users/@me/guilds", {}, true);
  }

  public static async getGuild(guildID: string) {
    return await this.request("GET", `/guilds/${guildID}`, {}, true);
  }

  public static async getGuildChannels(guildID: string) {
    return await this.request("GET", `/guilds/${guildID}/channels`, {}, true);
  }
}
