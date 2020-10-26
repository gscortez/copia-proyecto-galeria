import mongodb, {MongoClient} from 'mongodb'

const password = 'o5LI6Cwim61eJNu6';
const user = 'market-gallery-api';
const host = 'cluster0.z5lhx.mongodb.net'
const dbName = 'marketGalleryDB'
const uri = `mongodb+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority`

const mongoClient = new MongoClient(uri, { useUnifiedTopology: true });
mongoClient.connect((err) => {
  if (err) {
    console.log(`Failed while connecting to Mongo, cause: `, err)
    process.exit(1)
  }
});

export const client = mongoClient;