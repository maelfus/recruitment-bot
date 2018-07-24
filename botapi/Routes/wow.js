import express from 'express';
import collection from '../models/wow';
import monk from 'monk';

const wow = express.Router();

wow.route('/')
  .get((req, res) => {
    // return all listings
    collection.find({}, (err, listing) => {
      res.json(listing);
    })
  })

wow.route('/id/:id')
  .get((req, res) => {
    const id = monk.id(req.params.id)
    collection.findOne({ _id: id }, (err, listing) => {
      res.json(listing);
    })
  })

wow.route('/user/:userId')
  .get((req, res) => {
    // Find a listing by the users discord ID
    collection.findOne({ user:  req.params.userId }, (err, listing) => {
      res.json(listing);
    })
  })
  .post((req, res) => {
    let body = JSON.parse(req.params.body)
    body.user = req.params.userId
    collection.findOneAndUpdate({ user: req.params.userId }, body, { upsert: true, returnNewDocument: true}, (err, listing) => {
      res.json(listing)
    })
  })

wow.route('/newest')
  .get((req, res) => {
    collection.find({}, { limit : 1, sort : { "lastupdated" : -1 }}, (err, listing) => {
      res.json(listing);
    })
  })


export default wow;
