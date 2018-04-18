const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require ("fs");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("CS:GO - Danmark", {type: "WATCHING"});
});

bot.on("guildMemberAdd", async member => {
    console.log(`${member.id} joined the server.`);

    let welcomechannel = member.guild.channels.find(`name`, "nye-medlemmer");
    welcomechannel.send(`${member} Velkommen til **CS:GO - Danmark**!`);
});

bot.on("guildMemberRemove", async member => {
    console.log(`${member.id} left the server.`);

    let welcomechannel = member.guild.channels.find(`name`, "nye-medlemmer");
    welcomechannel.send(`${member} Forlod **CS:GO - Danmark**.`);

});

bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }  

    let prefix = prefixes[message.guild.id].prefixes;
    let messageArray = message.content.split (" ");
    let cmd = messageArray [0];
    let args = messageArray.slice (1);

    if(cmd === `${prefix}serverinfo`){

        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setDescription("Server Information")
        .setColor("#15f153")
        .setThumbnail(sicon)
        .addField("Server Navn", message.guild.name)
        .addField("Du ankom", message.member.joinedAt)
        .addField("Medlemmer", message.guild.memberCount);

        return message.channel.send(serverembed);
    }


    if(cmd === `${prefix}botinfo`){

        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#15f153")
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username);
        

        return message.channel.send(botembed);
    }



    });

    bot.login(botconfig.token);


