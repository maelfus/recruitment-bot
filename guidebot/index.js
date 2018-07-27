// This will check if the node version you are running is the required
// Node version, if it isn't it will throw the following error to inform
// you.
if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

// Load up the discord.js library
const Discord = require("discord.js");
// We also load the rest of the things we need in this file:
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");

// WebSocket Server for handling requests from the web front end
const WebSocket = require('ws');
const wss = new WebSocket.Server({
  port: 9001,
  verifyClient:  function (info) {
    if (info.req.connection.remoteAddress === '::ffff:127.0.0.1') { return true; } else {
      console.log(info.req.connection.remoteAddress);
      return false;
    }
  }
});

async function postListing(listing, settings) {
  //Check to see if this listing already exists in the message listed
  let messageArray = await messagelist.find({ server: settings.serverid, listing: listing._id})
  if (messageArray.length != 0) {
    messageArray.map(async (element) => {
      let del = await client.guilds.get(element.server).channels.get(element.channel).fetchMessage(element.message);
      del.delete()
      await messagelist.findOneAndDelete({message: element.message});
    })
  }

  // Post the updated or new listing
  let classList = '';
  classList += settings.classes.deathknight == true && listing.classes.hasOwnProperty('deathknight') && listing.classes.deathknight[0] != undefined ? `\n  • Death Knight : ${listing.classes.deathknight.join(", ")}` : ``;
  classList += settings.classes.demonhunter == true && listing.classes.hasOwnProperty('demonhunter') && listing.classes.demonhunter[0] != undefined ? `\n  • Demon Hunter : ${listing.classes.demonhunter.join(", ")}` : ``;
  classList += settings.classes.druid == true && listing.classes.hasOwnProperty('druid') && listing.classes.druid[0] != undefined             ? `\n  • Druid   : ${listing.classes.druid.join(", ")}` : ``;
  classList += settings.classes.hunter == true && listing.classes.hasOwnProperty('hunter') && listing.classes.hunter[0] != undefined           ? `\n  • Hunter  : ${listing.classes.hunter.join(", ")}` : ``;
  classList += settings.classes.mage == true && listing.classes.hasOwnProperty('mage') && listing.classes.mage[0] != undefined               ? `\n  • Mage    : ${listing.classes.mage.join(", ")}` : ``;
  classList += settings.classes.monk == true && listing.classes.hasOwnProperty('monk') && listing.classes.monk[0] != undefined               ? `\n  • Monk    : ${listing.classes.monk.join(", ")}` : ``;
  classList += settings.classes.paladin == true && listing.classes.hasOwnProperty('paladin') && listing.classes.paladin[0] != undefined         ? `\n  • Paladin : ${listing.classes.paladin.join(", ")}` : ``;
  classList += settings.classes.priest == true && listing.classes.hasOwnProperty('priest') && listing.classes.priest[0] != undefined           ? `\n  • Priest  : ${listing.classes.priest.join(", ")}` : ``;
  classList += settings.classes.rogue == true && listing.classes.hasOwnProperty('rogue') && listing.classes.rogue[0] != undefined             ? `\n  • Rogue   : ${listing.classes.rogue.join(", ")}` : ``;
  classList += settings.classes.shaman == true && listing.classes.hasOwnProperty('shaman') && listing.classes.shaman[0] != undefined           ? `\n  • Shaman  : ${listing.classes.shaman.join(", ")}` : ``;
  classList += settings.classes.warlock == true && listing.classes.hasOwnProperty('warlock') && listing.classes.warlock[0] != undefined         ? `\n  • Warlock : ${listing.classes.warlock.join(", ")}` : ``;
  classList += settings.classes.warrior == true && listing.classes.hasOwnProperty('warrior') && listing.classes.warrior[0] != undefined         ? `\n  • Warrior : ${listing.classes.warrior.join(", ")}` : ``;

  if (classList !== '') {
  // Send formatted recruiting post to channel

    let m = await client.guilds.get(settings.serverid).channels.get(settings.channel).send(`= ${listing.guildname} =

Region    :: ${listing.region}
Server    :: ${listing.server}
Faction   :: ${listing.faction}
Classes   :: ${classList}
Language  :: ${listing.language}
Raid Type :: ${listing.raidtype}
Progress  :: (NYI)
Raid Times:: (NYI)
•
•
•
•
•
•
•
Contacts  ::
• Discord    : ${listing.contactdiscord}
• Battle.net : ${listing.contactbnet}
Discord   :: ${listing.discordlink}
Website   :: ${listing.website}
Description ::
${listing.description}
ID        ::  ${listing._id}`, {code: "asciidoc"});
     return messagelist.insert({listing: listing._id, server: settings.serverid, channel: settings.channel, message: m.id, lastupdated: listing.lastupdated });
   }
};

async function postSignature(setting) {
  if (setting.signature != '') {
    let del = await client.guilds.get(setting.serverid).channels.get(setting.channel).fetchMessage(setting.signature);
    del.delete();
  }
  let msg = await client.guilds.get(setting.serverid).channels.get(setting.channel).send(`= Listings expire after 2 weeks; Don't forget to update your listing regularly!=\n:: To have your guild listed, visit http://127.0.0.1:3000`, {code: "asciidoc"});
  setting.signature = msg.id;
  settings.findOneAndUpdate({serverid: setting.serverid}, setting );
}

// DB Setup
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('localhost:27017/botweb');
const listings = db.get("listingcollection");
const settings = db.get("serversettings");
const messagelist = db.get("messagelistings");
const backlog = db.get("backlog");

// Handle incoming data pushes from Express
wss.on('connection', function connection(ws) {
  ws.on('message', async function incoming(data) {
    let req = data.split(",");
    try {
      // First expire all the outdated listings...
      let expiryCheck = await messagelist.find({});
      let expiryTime = new Date(Date.now() - 12096e5); // 12096e5 = ~2 weeks
      expiryCheck.forEach( async (msg) => {
        if (msg.lastupdated <= expiryTime) {
          if (client.guilds.get(msg.server).available) {
            try {
              let del = await client.guilds.get(msg.server).channels.get(msg.channel).fetchMessage(msg.message);
              del.delete();
              await messagelist.findOneAndDelete({message: msg.message});
            } catch (e) {console.log(e);}
          } else {
            // add it to the backlog for deletion...
            backlog.insert({server : msg.server, message: msg.message, method: 'delete' });
          }
        }
      });

      // Lets deal with the backlog...
      let bl = await backlog.find({});
      bl.forEach( async (item) => {
        let listingDetails = await listings.findOne({ _id : item.listing});
        let serverSettings = await settings.findOne({ serverid: item.server});
        if (item.method === 'update' && client.guilds.get(item.server).available) {
          let post = postListing(listingDetails, serverSettings);
          backlog.findOneAndDelete({_id: item._id});
          // Repost signature line after the listing
          let postsig = postSignature(serverSettings);
        } else if (item.method === 'delete' && client.guilds.get(item.server).available) {
          //figure out backlog deletion when I get around to it.
          let del = await client.guilds.get(item.server).channels.get(serverSettings.channel).fetchMessage(item.message);
          del.delete();
          await messagelist.findOneAndDelete({message: item.message});
          await backlog.findOneAndDelete({_id: item._id});
        }
      });

      // Now deal with the original message request...
      // break the string sent in 'data' into a serviceable array 'req'
      // incoming data should look something like this: 'update,012345678901234567'
      if ( req[0] == 'update') {
        let listingDetails = await listings.findOne({ _id : req[1]});

        client.guilds.forEach( async (guild) => {
          if (guild.available) {
            // Pull necessary data from the DB
            let serverSettings = await settings.findOne({ serverid: guild.id });
            let post = postListing(listingDetails, serverSettings);
            // repost signature line after listing
            let postsig = postSignature(serverSettings);
          } else {
            // add it to the backlog with 'guild.id' and listing id
            backlog.insert({server : guild.id, listing: listingDetails._id, method: 'update'});
          }
        });
      } else if (req[0] == 'delete') {
        // Delete all messages from channels given a specific listing.
        // This currently responds to the delete button on the website, but will be a model for expired listings.
        let messages = await messagelist.find({listing: monk.id(req[1])});

        messages.forEach( async (msg) => {
          if (client.guilds.get(msg.server).available) {
            try {
              let del = await client.guilds.get(msg.server).channels.get(msg.channel).fetchMessage(msg.message);
              del.delete();
              await messagelist.findOneAndDelete({message: msg.message});
            } catch (e) {console.log(e);}
          } else {
            // add it to the backlog for deletion...
            backlog.insert({server : msg.server, message: msg.message, method: 'delete' });
          }
        });
      }
    } catch (e) {console.log(e);}
  });
});


// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`,
// or `bot.something`, this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config file that contains our token and our prefix values.
client.config = require("./config.js");
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix

// Require our logger
client.logger = require("./util/Logger");

// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.
require("./modules/functions.js")(client);

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Enmap();
client.aliases = new Enmap();

// Now we integrate the use of Evie's awesome Enhanced Map module, which
// essentially saves a collection to disk. This is great for per-server configs,
// and makes things extremely easy for this purpose.
client.settings = new Enmap({provider: new EnmapLevel({name: "settings"})});

// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.

const init = async () => {

  // Here we load **commands** into memory, as a collection, so they're accessible
  // here and everywhere else.
  const cmdFiles = await readdir("./commands/");
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  // Generate a cache of client permissions for pretty perms
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  // Here we login the client.
  client.login(client.config.token);

// End top-level async/await function.
};

init();
