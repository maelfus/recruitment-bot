// DB Connect
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('localhost:27017/botweb');
const settings = db.get("serversettings");


exports.run = (client, message, args, level) => {

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
  description: "Sets initial options for recruitment bot use",
  usage: "init"
};
