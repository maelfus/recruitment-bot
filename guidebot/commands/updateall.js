// DB Connect
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/botweb');
var listings = db.get("listingcollection");
var settings = db.get("serversettings");

exports.run = (client, message, args, level) => { //eslint-disable-line no-unused-vars
  message.channel.bulkDelete(100, true)
    .then(messages => console.log(`Deleted ${messages.size} messages.`) )
    .catch((err) => {console.log(err)});

  settings.findOne({ guild: message.guild.id }).then((docs) => {
    if (!docs) {
      // If there are no settings listed for this server, set them in the db
      settings.insert({
        "guild" : message.guild.id,
        "classes" : {
          "deathknight" : false,
          "demonhunter" : false,
          "druid" : false,
          "hunter" : false,
          "mage" : false,
          "monk" : false,
          "paladin" : false,
          "priest" : false,
          "rogue" : false,
          "shaman" : false,
          "warlock" : false,
          "warrior" : false
        },
        "channel" : message.channel.id;
      })
      // Then set them for use here
      var classes = {
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
      };
      var rchannel = message.channel.id;
    } else {
      // otherwise save class settings
      var classes = docs.classes;
      var rchannel = docs.channel;
    }
  });

  // Check to make the request was made in the correct channel
  if ( message.channel.id != rchannel ) {
    message.channel.send(`Wrong channel, dufus!`);
  } else { // Start pulling and sending relevant guild listings
    listings.find({}).each((guild, {close, pause, resume}) => {
      // Filtering and Formatting for Classes
      var classList = '';
      classList += classes.deathknight == true ? `\n  • Death Knight : ${guild.deathknight.join(", ")}` : ``;
      classList += classes.demonhunter == true ? `\n  • Demon Hunter : ${guild.demonhunter.join(", ")}` : ``;
      classList += classes.druid == true       ? `\n  • Druid   : ${guild.druid.join(", ")}` : ``;
      classList += classes.hunter == true      ? `\n  • Hunter  : ${guild.hunter.join(", ")}` : ``;
      classList += classes.mage == true        ? `\n  • Mage    : ${guild.mage.join(", ")}` : ``;
      classList += classes.monk == true        ? `\n  • Monk    : ${guild.monk.join(", ")}` : ``;
      classList += classes.paladin == true     ? `\n  • Paladin : ${guild.paladin.join(", ")}` : ``;
      classList += classes.priest == true      ? `\n  • Priest  : ${guild.priest.join(", ")}` : ``;
      classList += classes.rogue == true       ? `\n  • Rogue   : ${guild.rogue.join(", ")}` : ``;
      classList += classes.shaman == true      ? `\n  • Shaman  : ${guild.shaman.join(", ")}` : ``;
      classList += classes.warlock == true     ? `\n  • Warlock : ${guild.warlock.join(", ")}` : ``;
      classList += classes.warrior == true     ? `\n  • Warrior : ${guild.warrior.join(", ")}` : ``;

      // Send formatted recruiting post to channel
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
  }
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
