// DB Connect
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('localhost:27017/botweb');
const settings = db.get("serversettings");


exports.run = async (client, message, args, level) => {
  try {
    const oldSettings = await settings.findOne( { "serverid" : message.guild.id } );
    if (oldSettings == null) {
      throw "No settings available for this server. Use \`init\` to configure.";
    } else {

      // Reset classes so that the update only includes the classes in the command
      let classes = {
        deathknight : false,
        demonhunter : false,
        druid : false,
        hunter : false,
        mage : false,
        monk : false,
        paladin : false,
        priest : false,
        rogue : false,
        shaman : false,
        warlock : false,
        warrior : false
      }

      // set our args to the classes obj (ignore the 'random' property)
      for ( i in args ) {
        typeof args[i] === 'function' ? null : classes.hasOwnProperty(args[i].toLowerCase()) ? classes[args[i].toLowerCase()] = true : await message.channel.send(`Invalid class, ${args[i]}, skipping...`);
        //classes.hasOwnProperty(args[i].toLowerCase()) ? classes[args[i].toLowerCase()] = true : typeof args[i] !== 'function' ? await message.channel.send(`Invalid class, ${args[i]}, skipping...`) : null;
      }
      // Update server settings for the new class filter and report to channel
      await settings.findOneAndUpdate( { "serverid" : message.guild.id }, { "serverid" : message.guild.id, "classes" : classes, "channel": oldSettings.channel });
      let reportClasses = '';
      for ( i in classes ) {
        classes[i] === true ? reportClasses += `${i} `: null;
      }
      await message.channel.send(`Updated class settings! Filter set to: ${reportClasses}`);
    }
  } catch (e) {
    message.channel.send(e);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Administrator"
};

exports.help = {
  name: "recruit",
  category: "Recruitment",
  description: "Sets classes/roles to filter recruiting messages",
  usage: "recruit <class> <class> <role> <role> <...>"
};
