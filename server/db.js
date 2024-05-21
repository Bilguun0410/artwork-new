const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/artworks';

module.exports = {
    connectToDb: async (cb) => {
        console.log(`Connecting to MongoDB at ${uri}`);
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log(`✅ MongoDB connected 🌱`);
                return cb();
            })
            .catch((err) => {
                console.log(err);
                return cb(err);
            });
    },
    getDb: () => mongoose.connection,
};
