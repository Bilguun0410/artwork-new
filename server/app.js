const express = require('express');
const mongoose = require('mongoose');
const next = require('next');
const bodyParser = require('body-parser')
const { connectToDb, getDb } = require('./db');
const { error } = require('console');
const { ObjectId } = require('mongodb');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../lib/models/user');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

server.use(cors());
server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

let db;

// Middleware to check authentication
const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  console.log(token)

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};


app.prepare().then(async () => {
  await connectToDb((err) => {
    if(err){
      server.get('*', (req, res) => {
        res.json({error: {message: err}})
      })
    }
    db = getDb();
  
    // Add your API routes here
    server.get('/api/test', (req, res) => {
      res.json({ message: 'Hello, World!' });
    });

    // User registration
    server.post('/api/register', async (req, res) => {
      const { username, password } = req.body;
    
      try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    });

    
    // User login
    server.post('/api/login', async (req, res) => {
      const { username, password } = req.body;
    
      try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(400).json({ error: 'Invalid username or password' });
        }
    
        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ error: 'Invalid username or password' });
        }
    
        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
        res.status(200).json({ message: 'Login successful', token });
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    });

    server.get('/api/current-user', authenticate, (req, res) => {
      // Access the decoded user object from the request
      const currentUser = req.user;
      res.json({ currentUser });
    });

    // Add a route to update user profile information
    server.put('/api/user/profile/:id', async (req, res) => {
      try {
        const { userId, lastName, firstName, email, phone } = req.body;
        await db.collection('users').updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body }
        );
        res.status(200).json({ message: 'User profile updated successfully' });
      } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Failed to update user profile' });
      }
    });


  
    server.get('*', (req, res) => {
      return handle(req, res);
    });
  
    const PORT = process.env.PORT || 4900;
  
    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  });

});

server.get('/api/protected', authenticate, (req, res) => {
  res.status(200).json({ message: 'This is a protected route' });
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
server.get('/api/genres/:id', async (req, res) => {
  try {
    const genre = await db.collection('genres').findOne({ _id: new ObjectId(req.params.id) });
    if (genre) {
      res.status(200).json(genre);
    } else {
      res.status(404).json({ error: { message: 'Genre not found' } });
    }
  } catch (e) {
    res.status(500).json({ error: { message: e.message } });
  }
});


server.get('/api/artworks', (req, res) => {
  let arts = [];

  db.collection('artworks')
    .find()
    .forEach(art => arts.push(art))
    .then(()=> {
      console.log('artwork data fetched')
      res.status(200).json(arts)
    })
    .catch((e) => {
      res.status(500).json({error: {message: e}})
      console.log("failed to fetch")
    })
})

server.get('/api/creators', (req, res) => {
  let arts = [];

  db.collection('artists')
    .find()
    .forEach(art => arts.push(art))
    .then(()=> {
      console.log('artist data fetched')
      res.status(200).json(arts)
    })
    .catch((e) => {
      res.status(500).json({error: {message: e}})
      console.log("failed to fetch")
    })
})

// Add a new artist
server.post('/api/creators', async (req, res) => {
  try {
    const result = await db.collection('artists').insertOne(req.body).then((data) =>
      res.status(201).json(data)
  )
  } catch (e) {
    res.status(500).json({ error: { message: e } });
  }
});
// Update an artist by ID
server.put('/api/creators/:id', async (req, res) => {
  try {
    console.log(req.body);
    const result = await db.collection('artists').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: { message: e.message } });
  }
});
// Delete an artist by ID
server.delete('/api/creators/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const result = await db.collection('artists').deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    res.status(204).send(); // Successfully deleted
  } catch (e) {
    res.status(500).json({ error: { message: e.message } });
  }
});

// Add a new artwork
server.post('/api/artworks', async (req, res) => {
  try {
    const result = await db.collection('artworks').insertOne(req.body).then((data) =>
      res.status(201).json(data)
  )
  } catch (e) {
    res.status(500).json({ error: { message: e } });
  }
});

// Update an artwork by ID
server.put('/api/artworks/:id', async (req, res) => {
  try {
    console.log(req.body);
    const result = await db.collection('artworks').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: { message: e.message } });
  }
});

// Delete an artwork by ID
server.delete('/api/artworks/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const result = await db.collection('artworks').deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    res.status(204).send(); // Successfully deleted
  } catch (e) {
    res.status(500).json({ error: { message: e.message } });
  }
});

server.get('/api/users/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    } else{
      const userId = req.params.id;
      const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Get all users
server.get('/api/users', async (req, res) => {
  try {
    const users = await db.collection('users').find().toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update a user
server.put('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: req.body }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});
