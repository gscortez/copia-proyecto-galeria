import express from 'express';
import { client } from '../utils/mongo-utils'
import { ObjectID } from 'mongodb'
const router = express.Router();
router.get('/:storeId', function(req, res, next) {
  console.log(`Getting store`);
  const { params } = req;
  const { storeId } = params;
  console.log(`storeId: ${storeId}`)
  const db = client.db(`marketGalleryDB`);
  
  const stores = db.collection('stores');
  stores.findOne({ _id: new ObjectID(storeId) }, {}, (error, store) => {
    if (error) {
      res.status(500);
      res.json(err);
      return;
    }
    if (!store) {
      res.status(404);
      res.end();
      return;
    }
    
    const stores = db.collection('stores');
    stores.findOne({ _id: stores.storeId }, {}, (error, store) => {
      if (error) {
        res.status(500);
        res.json(err);
        return;
      }
      if (store) {
        item.store = store;
      }
      res.json(store);
    })
    
  })
});

module.exports = router;
