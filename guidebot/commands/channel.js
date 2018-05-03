// DB Connect
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('localhost:27017/botweb');
const settings = db.get("serversettings");


exports.run = async (client, message, args, level) => {
  try {
    let oldSettings = await settings.findOne({ serverid : message.guild.id }, {});

    if (oldSettings == null) {
      throw "No settings available for this server. Use \`init\` to configure";
    } else {
      let channel = args[0].slice(2, 20);

      if ( message.guild.channels.has(channel) ) {
        oldSettings.channel = channel;
        await settings.findOneAndUpdate( {serverid : oldSettings.serverid} , oldSettings );
        message.channel.send(`Channel settings updated!`);
      } else {
        throw "Invalid Channel. Pleast try again.";
      }
    }
  } catch (e) {
    await message.channel.send(e);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Administrator"
};

exports.help = {
  name: "channel",
  category: "Recruitment",
  description: "Sets channel to feed listings to.",
  usage: "channel <#channel>"
};
