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
    var f = "="; //filler character for guildname header outline

    message.channel.send(`
====${f.repeat(guild.guildname.length)}====
    ${guild.guildname}
====${f.repeat(guild.guildname.length)}====
Contacts  ::
    Discord    : ${guild.contactdiscord}
    Battle.net : ${guild.contactbnet}
Region    :: ${guild.region}
Server    :: ${guild.server}
Faction   :: ${guild.faction}
Classes   ::
  • Death Knight : ${guild.deathknight}
  • Demon Hunter : ${guild.demonhunter}
  • Druid   : ${guild.druid}
  • Hunter  : ${guild.hunter}
  • Mage    : ${guild.mage}
  • Monk    : ${guild.monk}
  • Paladin : ${guild.paladin}
  • Priest  : ${guild.priest}
  • Rogue   : ${guild.rogue}
  • Shaman  : ${guild.shaman}
  • Warlock : ${guild.warlock}
  • Warrior : ${guild.warrior}
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
