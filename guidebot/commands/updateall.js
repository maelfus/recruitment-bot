// DB Connect
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/botweb');
var collection = db.get("listingcollection");


exports.run = (client, message, args, level) => { //eslint-disable-line no-unused-vars
  message.channel.bulkDelete(100, true)
    .then(messages => console.log(`Deleted ${messages.size} messages.`) )
    .catch((err) => {console.log(err)});

  // Get Server Settings
  var classes = message.settings;

  collection.find({}).each((guild, {close, pause, resume}) => {
    // Filtering and Formatting for Classes
    var classList = '';
    classList += classes.recruitDeathKnight == "true" ? `\n  • Death Knight : ${guild.deathknight.join(", ")}` : ``;
    classList += classes.recruitDemonHunter == "true" ? `\n  • Demon Hunter : ${guild.demonhunter.join(", ")}` : ``;
    classList += classes.recruitDruid == "true"       ? `\n  • Druid   : ${guild.druid.join(", ")}` : ``;
    classList += classes.recruitHunter == "true"      ? `\n  • Hunter  : ${guild.hunter.join(", ")}` : ``;
    classList += classes.recruitMage == "true"        ? `\n  • Mage    : ${guild.mage.join(", ")}` : ``;
    classList += classes.recruitMonk == "true"        ? `\n  • Monk    : ${guild.monk.join(", ")}` : ``;
    classList += classes.recruitPaladin == "true"     ? `\n  • Paladin : ${guild.paladin.join(", ")}` : ``;
    classList += classes.recruitPriest == "true"      ? `\n  • Priest  : ${guild.priest.join(", ")}` : ``;
    classList += classes.recruitRogue == "true"       ? `\n  • Rogue   : ${guild.rogue.join(", ")}` : ``;
    classList += classes.recruitShaman == "true"      ? `\n  • Shaman  : ${guild.shaman.join(", ")}` : ``;
    classList += classes.recruitWarlock == "true"     ? `\n  • Warlock : ${guild.warlock.join(", ")}` : ``;
    classList += classes.recruitWarrior == "true"     ? `\n  • Warrior : ${guild.warrior.join(", ")}` : ``;


    message.channel.send(`= ${guild.guildname} =

Contacts  ::
  • Discord    : ${guild.contactdiscord}
  • Battle.net : ${guild.contactbnet}
Region    :: ${guild.region}
Server    :: ${guild.server}
Faction   :: ${guild.faction}
Classes   :: ${classList}
Language  :: ${guild.language}
Raid Type :: ${guild.raidtype}
Progress  :: (NYI)
Raid Times:: (NYI)
  •
  •
  •
  •
  •
  •
  •
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
