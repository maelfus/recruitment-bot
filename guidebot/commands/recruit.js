// DB Connect
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('localhost:27017/botweb');
const settings = db.get("serversettings");


exports.run = (client, message, args, level) => {
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
    if (i != "random") { classes[args[i]] = true; }
  }

  settings.findOneAndUpdate( { "serverid" : message.guild.id }, { "serverid" : message.guild.id, "classes" : classes, "channel": message.channel.id })
    .then(() => { message.channel.send(`Updated class settings! Filter set to: ${Object.keys(classes).join(", ")} (update report isnt working yet, please ignore)`); });

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
