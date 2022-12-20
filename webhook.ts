Deno.permissions.request({
  name: "net",
  host: "discord.com",
});

export class Webhook {
  webhook: string;

  constructor(webhook: string) {
    this.webhook = webhook;
  }

  async post(content: string, username?: string, avatarUrl?: string) {
    // Make request to the webhook
    const body = { content, username, avatarUrl };
    const response = await fetch(this.webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // Error on non-2xx response status
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    console.log(`Posted "${content}" to Discord`);
  }
}
