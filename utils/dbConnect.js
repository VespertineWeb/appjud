import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  // Adicionar logs para verificar a URL do MongoDB
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
  }
}

export default dbConnect;
