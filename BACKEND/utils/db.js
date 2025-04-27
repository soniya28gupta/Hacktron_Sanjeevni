import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

let db;

const connectDB = async () => {
  try {
    if (!db) {
      await client.connect();
      db = client.db('hacktron_sanjeevni'); // Replace with your database name
      console.log('Connected to the database');
    }
    return db;
  } catch (err) {
    console.error('Failed to connect to the database:', err.message || err);
    throw err;
  }
};

export default await connectDB();
