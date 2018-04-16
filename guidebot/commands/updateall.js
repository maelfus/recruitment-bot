// DB Connect
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/botweb');
var collection = db.get("listingcollection");



exports.run = (client, message, args, level) => { //eslint-disable-line no-unused-vars
  message.channel.bulkDelete(100, true)
    .then(messages => console.log(`Deleted ${messages.size} messages.`) )
    .catch((err) => {console.log(err)});

  collection.find({}).each((guild, {close, pause, resume}) => {
      message.channel.send(` == ${guild.guildname} ==
Contacts  ::
    Discord : ${guild.contactdiscord}
    Battle.net : ${guild.contactbnet}
Region    :: ${guild.region}
Server    :: ${guild.server}
Faction   :: ${guild.faction}
Classes   :: ${guild.classes}
Language  :: ${guild.language}
Raid Type :: ${guild.raidtype}
Progress  :: (NYI)
Raid Times:: (NYI)
Discord   :: ${guild.discordlink}
Website   :: ${guild.website}
Description ::
${guild.description}
ID        ::  ${guild._id}`, {code: "asciidoc"});
}).then(() => {
  message.channel.send(`To have your guild listed, visit http://127.0.0.1:3000/`);
}).catch((err) => { console.log(err) });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "updateall",
  category: "Recruitment",
  description: "Clears the channel (currently last 100 messages) and relists all guild listings. This will take time due to API rate limits",
  usage: "updateall"
};
