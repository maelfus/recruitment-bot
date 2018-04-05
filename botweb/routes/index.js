var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* Handle POST request from listings page */

router.post('/addguild', function(req, res) {
  // Set DB
  var db = req.db;

  // Gather FORM variables
/* Commenting until completion */
  var guildname = req.body.guildname;
  var contactbnet = req.body.contactbnet;
  var contactdiscord = req.body.contactdiscord;
  var region = req.body.region;
  var server = req.body.server;
  var faction = req.body.faction;
  var classes = req.body.classes; // array
  var language = req.body.language;
  var raidtype = req.body.raidtype;
  // var raidtimes = req.body.raidtimes;
  // var progress = req.body.progress;
  var discordlink = req.body.discordlink;
  var website = req.body.website;
  var description = req.body.description;
  // var user = req.body.user; // need to pull oauth user info
  var lastupdated =  new Date();
/* */

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
    "classes": classes,
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
      // Forward back to /list
      res.render('list', { title: 'Listings', message: 'Successfully added new listing' });
    }
  });
});

/* GET Listings page. */
router.get('/list', function(req, res, next) {
  res.render('list', { title: 'Listings' });
});

module.exports = router;
