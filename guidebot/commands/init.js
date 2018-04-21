// DB Connect
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/botweb');
var settings = db.get("serversettings");


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
