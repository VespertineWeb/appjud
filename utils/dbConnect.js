import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    console.log('Already connected to the database.');
    return;
  }

  console.log('MongoDB URI:', process.env.MONGODB_URI);

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // 5 segundos de timeout para seleção do servidor
    });

    connection.isConnected = db.connections[0].readyState;
    console.log('Database connected:', connection.isConnected);
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed.');
  }
}

export default dbConnect;
