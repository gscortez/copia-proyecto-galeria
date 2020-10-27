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
    })

    const combinations = db.collection('combinations');
    combinations.find({ itemId: new ObjectID(itemId) }, {}).toArray((error, combination) => {
      if (error) {
        res.status(500);
        res.json(err);
        return;
      }

      if (combination) {
        console.log(`Entro al servicio de combinations`);
        item.combination = combination;     
      }
      res.json(item);
    })
    
  })
});
router.post('/:itemId/combinations', function(req, res, next) {
  console.log(`post combinations`);
  const { params,body } = req;
  const combination = body
  const { itemId } = params;
  const db = client.db(`marketGalleryDB`);
  combination.itemId = new ObjectID(itemId);
  const combinations = db.collection('combinations');
  combinations.insertOne(combination ,(error, result) => {
    if (error) {
      res.status(500);
      res.json(err);
      return;
    }
  })
  res.end();
});
module.exports = router;
