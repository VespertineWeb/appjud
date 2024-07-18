import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
  console.log('Connecting to database...');
  try {
    await dbConnect();
    console.log('Database connected.');
    res.status(200).json({ success: true, message: 'Database connected successfully.' });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ success: false, message: 'Database connection failed.', error: error.message });
  }
}
