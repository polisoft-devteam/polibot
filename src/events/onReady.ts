import { Client } from 'discord.js';
import { REST } from "@discordjs/rest";
import { CommandList } from '../commands/_CommandList';
import { Routes, APIApplicationCommandOption } from "discord-api-types/v9";

const onReady = async (BOT: Client) => {
    try {
        const rest = new REST({ version: "9" }).setToken(
          process.env.BOT_TOKEN as string
        );
    
        const commandData: {
          name: string;
          description?: string;
          type?: number;
          options?: APIApplicationCommandOption[];
        }[] = [];
    
        CommandList.forEach((command) =>
          commandData.push(
            command.data.toJSON() as {
              name: string;
              description?: string;
              type?: number;
              options?: APIApplicationCommandOption[];
            }
          )
        );
        await rest.put(
          Routes.applicationGuildCommands(
            BOT.user?.id || "missing token",
            process.env.GUILD_ID as string
          ),
          { body: commandData }
        );
      } catch (err) {
        console.log(err)
      }
};

export default onReady;