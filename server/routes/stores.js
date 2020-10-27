import express from 'express';
import { client } from '../utils/mongo-utils'
import { ObjectID } from 'mongodb'
const router = express.Router();
router.post('/:storeId/items', function(req, res, next) {
  console.log(`post item`);
  const { params,body } = req;
  const item = body
  const { storeId } = params;

  item.storeId = new ObjectID(storeId);

  console.log(`storeId: ${storeId}`)
  const db = client.db(`marketGalleryDB`);
  
  const items = db.collection('items');
  items.insertOne( item, (error, res) => {
    if (error) {
      res.status(500);
      res.json(err);
      return;
    }
  })
  res.end();
});

module.exports = router;
