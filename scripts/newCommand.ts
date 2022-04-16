import fs from 'fs';
const path = `./src/commands/${process.argv[2]}.ts`


const newCommandContent = `
import ICommand from "../interfaces/ICommand";
import { SlashCommandBuilder } from "@discordjs/builders";
import rest from '../utils/rest';
import { Routes } from "discord-api-types/rest/v10";

const ${process.argv[2]}: ICommand = {
    data: new SlashCommandBuilder()
      .setName('${process.argv[2]}')
      .setDescription('${process.argv[3]}'),
      run: async (interaction) => {
        const { channel, user, guild } = interaction;
        await guild?.members.fetch();
        await interaction.reply('${process.argv[2]}')
      },
  };

  export default ${process.argv[2]};
`

try {
    let commands: string[] = [];
    if (fs.existsSync(path)) {
        console.log("This command already exists. No file created.")
    } else {
        fs.writeFileSync(path, newCommandContent)
        fs.readdirSync('./src/commands').forEach(((f) => {
            commands = [...commands, f.slice(0, -3)];
        }));
        commands = commands.filter(c => c !== '_CommandList');
        let newCommandListContent = `import ICommand from "../interfaces/ICommand"; \n${commands.map((c) => {
            return `import ${c} from "./${c}";\n`
        })}
    `
        newCommandListContent = newCommandListContent.replace(',', '');
        newCommandListContent += `\nexport const CommandList: ICommand[] = [${commands.map((c => c))}];`
        fs.writeFile('./src/commands/_CommandList.ts', newCommandListContent, err => {
            console.log(err)
        });
    };
} catch (err) {
    console.error(err)
}