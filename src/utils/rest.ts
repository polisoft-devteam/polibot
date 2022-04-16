import { REST } from "@discordjs/rest";

const rest = new REST({ version: "9" }).setToken(
    process.env.BOT_TOKEN as string
  );

  export default rest;