var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* Handle POST request from listings page */

router.post('/addguild', function(req, res, next) {
  // Set DB
  var db = req.db;

  // Gather FORM variables
/* Commenting until completion
  var guildname = res.body.guildname;
  var contactbnet = res.body.contactbnet;
  var contactdiscord = res.body.contactdiscord;
  var region = res.body.region;
  var server = res.body.server;
  var faction = res.body.faction;
  var classes = res.body.classes; // array
  var language = res.body.language;
  var raidtype = res.body.raidtype;
  // var raidtimes = res.body.raidtimes;
  // var progress = res.body.progress;
  var discordlink = res.body.discordlink;
  var website = res.body.website;
  var description = res.body.description;
  // var user = res.body.user; // need to pull oauth user info
  var lastupdate =  new Date();
*/

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
      res.redirect("/list", { message: 'Successfully added: ' + guildname })
    }
  });
});

/* GET Listings page. */
router.get('/list', function(req, res, next) {
  res.render('list', { title: 'Listings' });
});

module.exports = router;
