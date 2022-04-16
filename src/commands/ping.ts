import ICommand from "../interfaces/ICommand";
import { SlashCommandBuilder } from "@discordjs/builders";
import rest from '../utils/rest';
import { Routes } from "discord-api-types/rest/v10";

const shame: ICommand = {
    data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("ping"),
      run: async (interaction) => {
        const { channel, user, guild } = interaction;
        await guild?.members.fetch();
        await interaction.reply(`${user} pong`)
      },
  };

  export default shame;