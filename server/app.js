const express = require('express');
const mongoose = require('mongoose');
const next = require('next');
const bodyParser = require('body-parser')
const { connectToDb, getDb } = require('./db');
const { error } = require('console');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

const PORT = 4100;

let db;

app.prepare().then(async () => {
  await connectToDb((err) => {
    if(err){
      server.get('*', (req, res) => {
        res.json({error: {message: err}})
      })
    }
    db = getDb();
    
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
  
    // Add your API routes here
    server.get('/api/test', (req, res) => {
      res.json({ message: 'Hello, World!' });
    });
  
    server.get('*', (req, res) => {
      return handle(req, res);
    });
  
    const PORT = process.env.PORT || 4100;
  
    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  });

});

server.get('/api/genres', (req, res) => {
  let genres = [];

  db.collection('genres')
    .find()
    .forEach(genre => genres.push(genre))
    .then(() => {
      console.log('genres loaded');
      res.status(200).json(genres)
    })
    .catch((e) => {
      res.status(200).json({error: {message: e}})
      console.log("failed to fetch")
    })
})

server.get('/api/artworks', (req, res) => {
  let arts = [];

  db.collection('arts')
    .find()
    .forEach(art => arts.push(art))
    .then(()=> {
      console.log('connected db')
      res.status(200).json(arts)
    })
    .catch((e) => {
      res.status(500).json({error: {message: e}})
      console.log("failed to fetch")
    })
})