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
      ws.send(`delete,${req.body.id}`);
      // Forward back to /list
      res.redirect('/list');
    }
  });
});


/* Handle POST request to add a new guild from listings page */
router.post('/addguild', function(req, res, next) {
  // Set DB
  var db = req.db;

  // function for typechecking and converting req.body.<class> to an array
  function arrayClass(c) {
    if (Array.isArray(c)) {
      return c;
    } else {
      return Array.from([c]);
    }
  }

  // Gather FORM variables
  var guildname = req.body.guildname;
  var contactbnet = req.body.contactbnet;
  var contactdiscord = req.body.contactdiscord;
  var region = req.body.region;
  var server = req.body.server;
  var faction = req.body.faction;
  var deathknight = arrayClass(req.body.deathknight);
  var demonhunter = arrayClass(req.body.demonhunter);
  var druid = arrayClass(req.body.druid);
  var hunter = arrayClass(req.body.hunter);
  var mage = arrayClass(req.body.mage);
  var monk = arrayClass(req.body.monk);
  var paladin = arrayClass(req.body.paladin);
  var priest = arrayClass(req.body.priest);
  var rogue = arrayClass(req.body.rogue);
  var shaman = arrayClass(req.body.shaman);
  var warlock = arrayClass(req.body.warlock);
  var warrior = arrayClass(req.body.warrior);
  var language = req.body.language;
  var raidtype = req.body.raidtype;
  // var raidtimes = req.body.raidtimes;
  // var progress = req.body.progress;
  var discordlink = req.body.discordlink;
  var website = req.body.website;
  var description = req.body.description;
  // var user = req.body.user; // need to pull oauth user info
  var lastupdated = new Date();

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
