import express from 'express';
import { client } from '../utils/mongo-utils'
import { ObjectID } from 'mongodb'
const router = express.Router();
router.get('/:itemId', function(req, res, next) {
  console.log(`Getting item`);
  const { params } = req;
  const { itemId } = params;
  console.log(`itemId: ${itemId}`)
  const db = client.db(`marketGalleryDB`);
  const items = db.collection('items');
  items.findOne({ _id: new ObjectID(itemId) }, {}, (error, item) => {
    if (error) {
      res.status(500);
      res.json(err);
      return;
    }
    if (!item) {
      res.status(404);
      res.end();
      return;
    }
    
    const stores = db.collection('stores');
    stores.findOne({ _id: item.storeId }, {}, (error, store) => {
      if (error) {
        res.status(500);
        res.json(err);
        return;
      }
      if (store) {
        item.store = store;
      }
      res.json(item);
    })
    
  })
});

module.exports = router;
