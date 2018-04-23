// DB Connect
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('localhost:27017/botweb');
const settings = db.get("serversettings");


exports.run = async (client, message, args, level) => {
  if ( await settings.findOne( { "serverid" : message.guild.id } ) == null) {
    try {
      await message.channel.send(`Starting initialization...`);

      let response = {};
      response.channel = await client.awaitReply(message, `Which channel would you like listings to appear in?`);
      response.filter = await client.awaitReply(message, `Which classes/roles would you like to filter for? (available options, separate by spaces: deathknight demonhunter druid hunter mage monk paladin priest rogue shaman warlock warrior tanks healers dps)`);

      let channel = '';
      // check response.channel input, strip additional characters and test for channel existance.
      channel = response.channel.slice(2, 20);

      // split response.filter and format for insertion. (validate against options)
      let split = response.filter.split(" ");
      let classes = {
        deathknight: false,
        demonhunter: false,
        druid: false,
        hunter: false,
        mage: false,
        monk: false,
        paladin: false,
        priest: false,
        rogue: false,
        shaman: false,
        warlock: false,
        warrior: false
      };
      for ( i in split ) {
        i != "random" ? classes[split[i]] = true : null;
      }
      settings.insert({
      "serverid" : message.guild.id,
      "classes" : classes,
      "channel" : channel
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    message.channel.send(`Settings already exist for this server.  Use \`recruit\` and \`channel\` commands to update your server options.`);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Administrator"
};

exports.help = {
  name: "init",
  category: "Recruitment",
  description: "Sets initial options for recruitment bot use. Bot will ask a series of questions to set up for initial use.",
  usage: "init"
};
