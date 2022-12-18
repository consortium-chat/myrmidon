# Myrmidon

Utilities bot for the CONsortium Discord server.

## Setup

Install [Deno](https://deno.land)

Create a `.env` file in the working directory with the following values:

    DISCORD_TOKEN="replace with token"
    GUILD_ID="replace with guild ID"
    ARCHIVE_CATEGORY="replace with archive category ID"
    FRIDAY_WEBHOOK="replace with webhook endpoint"

Run the following command:

    deno run --allow-read=. --allow-env --allow-net="discord.com,gateway.discord.gg" main.ts

## License

[MIT](license.txt)
