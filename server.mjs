import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const uri = process.env.MONGODB_URI || 'mongodb+srv://bilguunmunkhzul:XzXIdBxQyKhCE6ad@artwork.phixocu.mongodb.net/?retryWrites=true&w=majority&appName=artwork'

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB connected : ${uri} 🌱`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

app.prepare().then(async () => {
  await connectDB();

  const server = express();
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