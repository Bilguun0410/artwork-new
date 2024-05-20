const { MongoClient } = require('mongodb');

let dbConnection

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/artworks';
// const uri = process.env.MONGO_URI || 'mongodb+srv://bilguunmunkhzul:XzXIdBxQyKhCE6ad@artwork.phixocu.mongodb.net/?retryWrites=false&w=majority&appName=artwork';

module.exports = {
    connectToDb: async (cb) => {
      console.log(`Connecting to MongoDB at ${uri}`);
      MongoClient.connect(uri)
        .then((client) => {
          console.log(`✅ MongoDB connected 🌱`);
          dbConnection = client.db();
          return cb();
        })
        .catch((err) => {
          console.log(err);
          return cb(err);
        });
    },
    getDb: () => dbConnection,
  };