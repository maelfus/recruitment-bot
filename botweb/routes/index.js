var express = require('express');
var router = express.Router();
const WebSocket = require('ws');
const ws = new WebSocket('ws://127.0.0.1:9001');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* Handle POST request to delete a guild from listing page */
router.post('/removeguild', function(req, res, next) {
  var db = req.db;
  var collection = db.get('listingcollection');

  collection.remove({ _id: req.body.id }, function(err, doc) {
    if (err) {
      req.send('An error occured while removing listing');
    }
    else {
      // Forward back to /list
      res.redirect('/list');
    }
  });
});


/* Handle POST request to add a new guild from listings page */
router.post('/addguild', function(req, res, next) {
  // Set DB
  var db = req.db;

  // Gather FORM variables
  var guildname = req.body.guildname;
  var contactbnet = req.body.contactbnet;
  var contactdiscord = req.body.contactdiscord;
  var region = req.body.region;
  var server = req.body.server;
  var faction = req.body.faction;
//  var classes = req.body.classes; // array
  var deathknight = req.body.deathknight;
  var demonhunter = req.body.demonhunter;
  var druid = req.body.druid;
  var hunter = req.body.hunter;
  var mage = req.body.mage;
  var monk = req.body.monk;
  var paladin = req.body.paladin;
  var priest = req.body.priest;
  var rogue = req.body.rogue;
  var shaman = req.body.shaman;
  var warlock = req.body.warlock;
  var warrior = req.body.warrior;
  var language = req.body.language;
  var raidtype = req.body.raidtype;
  // var raidtimes = req.body.raidtimes;
  // var progress = req.body.progress;
  var discordlink = req.body.discordlink;
  var website = req.body.website;
  var description = req.body.description;
  // var user = req.body.user; // need to pull oauth user info
  var lastupdated =  new Date();

  // Set Collection
  var collection = db.get('listingcollection');

  // DB Insert
  collection.insert({
    "guildname": guildname,
    "contactbnet": contactbnet,
    "contactdiscord": contactdiscord,
    "region": region,
    "server": server,
    "faction": faction,
//    "classes": classes,
    "deathknight": deathknight,
    "demonhunter": demonhunter,
    "druid": druid,
    "hunter": hunter,
    "mage": mage,
    "monk": monk,
    "paladin": paladin,
    "priest": priest,
    "rogue": rogue,
    "shaman": shaman,
    "warlock": warlock,
    "warrior": warrior,
    "language": language,
    "raidtype": raidtype,
//    "raidtimes": raidtimes,
//    "progress": progress,
    "discordlink": discordlink,
    "website": website,
    "description": description,
//    "user": user,
    "lastupdated": lastupdated
  }, function(err, doc) {
    if (err) {
      req.send('An error occured while inserting new listing');
    }
    else {
      // Send notification to bot that a new guild was listed.
        ws.send(`update,${doc._id}`);

      // Forward back to /list
      res.redirect('/list');
    }
  });
});

/* GET Listings page. */
router.get('/list', function(req, res, next) {
  var db = req.db;
  var collection = db.get('listingcollection');

  // Select guildname from all listings to display via list.dust
  collection.find({}, { guildname: 1 }, function(e,docs){
    res.render('list', { title: 'Listings', listing: docs} );
  });
});

module.exports = router;
