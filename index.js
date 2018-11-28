const app = require('./app');
const Publication = require('./models/Publication');
const initDB = require('./initDB.json');

app.listen(3050, () => {
  console.log('Listening on port 3050');
});

Publication.countDocuments().then(count => {
  if (count < 10) {
    // Add default publications
    Publication.collection.deleteMany({}); // Remove existing documents to ensure only initDB is written
    Publication.collection.insertMany(initDB);
  }
});
