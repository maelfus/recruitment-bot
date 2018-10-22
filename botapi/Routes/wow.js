import express from 'express';
import { listings, bnet } from '../models/wow';
import monk from 'monk';
import WebSocket from 'ws'
import fetch from 'cross-fetch'
import btoa from 'btoa'


const wow = express.Router();

wow.route('/')
  .get((req, res) => {
    // return all listings
    listings.find({}, (err, listing) => {
      res.json(listing);
    })
  })

wow.route('/id/:id')
  .get((req, res) => {
    const id = monk.id(req.params.id)
    listings.findOne({ _id: id }, (err, listing) => {
      res.json(listing);
    })
  })

wow.route('/user/:userId')
  .get((req, res) => {
    // Find a listing by the users discord ID
    listings.findOne({ user:  req.params.userId }, (err, listing) => {
      res.json(listing);
    })
  })
  .post((req, res) => {
    let body = req.body
    body.lastupdated = new Date()
    listings.findOneAndUpdate({ user: req.params.userId }, body, { upsert: true, returnNewDocument: true}, (err, listing) => {
      res.json(listing)
      // Send update command to bot
      let ws = new WebSocket('ws://127.0.0.1:9001');
      ws.on('open', function open() {
        ws.send(`update,${listing._id}`);
        ws.close();
      })
    })
  })

wow.route('/newest')
  .get((req, res) => {
    listings.find({}, { limit : 1, sort : { "lastupdated" : -1 }}, (err, listing) => {
      res.json(listing);
    })
  })

wow.route('/bnet')
  .get((req, res) => {
    bnet.find({}, (err, docs) => {
      res.json(docs)
    })
  })

wow.route('/bnet/update')
  .get(async (req, res) => {
    let realmIndex = {
      us: {}
    //   eu: {},
    //   kr: {},
    //   tw: {},
    //   sea: {},
    //   cn: {}
    }
    realmIndex.us = await fetch('https://us.battle.net/oauth/token', {
      method: 'POST',
      body: "grant_type=client_credentials",
      headers: {
        "Authorization": "Basic " + btoa(`${process.env.BNET_CLIENT_ID}:${process.env.BNET_CLIENT_SECRET}`),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(res => res.json())
    .then((json) => {
      return fetch(`https://us.api.blizzard.com/data/wow/realm/?namespace=dynamic-us&access_token=${json.access_token}`, { method: 'GET' })
      .then(res => res.json())
      .then((json) => {
        return json
      })
    })
    .catch((err) => {
      console.error(err)
    })
  
    //console.log(realmIndex)
    realmIndex.us.region = "us"
    bnet.findOneAndUpdate( { region: "us" }, realmIndex.us, { upsert: true, returnNewDocument: true }, (err, doc) => { console.log(doc) })
  })

export default wow;
