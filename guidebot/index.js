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
    try {
    // break the string sent in 'data' into a serviceable array 'req'
    // incoming data should look something like this: 'update,012345678901234567'
    let req = data.split(",");
    if ( req[0] == 'update') {
          let listingDetails = await listings.findOne({ _id : req[1]});

           client.guilds.forEach( async (guild) => {
            if (guild.available) {
              // Pull necessary data from the DB
              let serverSettings = await settings.findOne({ serverid: guild.id });
              // Send the new guild listing to the correct channel
              // Filtering and Formatting for Classe
              let classList = '';
              classList += serverSettings.classes.deathknight == true && listingDetails.deathknight[0] != undefined ? `\n  • Death Knight : ${listingDetails.deathknight.join(", ")}` : ``;
              classList += serverSettings.classes.demonhunter == true && listingDetails.demonhunter[0] != undefined ? `\n  • Demon Hunter : ${listingDetails.demonhunter.join(", ")}` : ``;
              classList += serverSettings.classes.druid == true && listingDetails.druid[0] != undefined             ? `\n  • Druid   : ${listingDetails.druid.join(", ")}` : ``;
              classList += serverSettings.classes.hunter == true && listingDetails.hunter[0] != undefined           ? `\n  • Hunter  : ${listingDetails.hunter.join(", ")}` : ``;
              classList += serverSettings.classes.mage == true && listingDetails.mage[0] != undefined               ? `\n  • Mage    : ${listingDetails.mage.join(", ")}` : ``;
              classList += serverSettings.classes.monk == true && listingDetails.monk[0] != undefined               ? `\n  • Monk    : ${listingDetails.monk.join(", ")}` : ``;
              classList += serverSettings.classes.paladin == true && listingDetails.paladin[0] != undefined         ? `\n  • Paladin : ${listingDetails.paladin.join(", ")}` : ``;
              classList += serverSettings.classes.priest == true && listingDetails.priest[0] != undefined           ? `\n  • Priest  : ${listingDetails.priest.join(", ")}` : ``;
              classList += serverSettings.classes.rogue == true && listingDetails.rogue[0] != undefined             ? `\n  • Rogue   : ${listingDetails.rogue.join(", ")}` : ``;
              classList += serverSettings.classes.shaman == true && listingDetails.shaman[0] != undefined           ? `\n  • Shaman  : ${listingDetails.shaman.join(", ")}` : ``;
              classList += serverSettings.classes.warlock == true && listingDetails.warlock[0] != undefined         ? `\n  • Warlock : ${listingDetails.warlock.join(", ")}` : ``;
              classList += serverSettings.classes.warrior == true && listingDetails.warrior[0] != undefined         ? `\n  • Warrior : ${listingDetails.warrior.join(", ")}` : ``;

              if (classList !== '') {
              // Send formatted recruiting post to channel
                let m = await guild.channels.get(serverSettings.channel).send(`= ${listingDetails.guildname} =

Region    :: ${listingDetails.region}
Server    :: ${listingDetails.server}
Faction   :: ${listingDetails.faction}
Classes   :: ${classList}
Language  :: ${listingDetails.language}
Raid Type :: ${listingDetails.raidtype}
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
    • Discord    : ${listingDetails.contactdiscord}
    • Battle.net : ${listingDetails.contactbnet}
Discord   :: ${listingDetails.discordlink}
Website   :: ${listingDetails.website}
Description ::
${listingDetails.description}
ID        ::  ${listingDetails._id}`, {code: "asciidoc"});
                 messagelist.insert({listing: listingDetails._id, server: guild.id, channel: serverSettings.channel, message: m.id });
              }
            } else {
              // add it to the backlog with 'guild.id' and listing id
              backlog.insert({server : guild.id, listing: listingDetails._id, method: 'update'});
            }
          });
    } else if (req[0] == 'delete') {
      // Delete all messages from given a specific listing.
      // This currently responds to the delete button on the website, but will be a model for expired listings.
      let messages = await messagelist.find({listing: monk.id(req[1])});

      messages.forEach( async (msg) => {
        if (client.guilds.get(msg.server).available) {
          try {
            let del = await client.guilds.get(msg.server).channels.get(msg.channel).fetchMessage(msg.message);
            del.delete();
            await messagelist.findOneAndDelete({message: msg.message});
          } catch (e) {
            console.log(e);
          }
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
