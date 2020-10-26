import express from 'express';
import { client } from '../utils/mongo-utils'

const router = express.Router();
router.get('/', function(req, res, next) {
  console.log(`Pinging`);
  const db = client.db(`marketGalleryDB`);
  const pings = db.collection('pings');
  const ping = {};
  pings.insertOne(ping, (error, result) => {
    if (error) {
      res.status(500);
      res.json(err);
      return;
    }
    res.json(ping);
  })
});

module.exports = router;
