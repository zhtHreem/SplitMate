import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js'; 
import corsMiddleware from './middleware/cors.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB();


app.use(corsMiddleware);
app.use(express.json());

// // Routes
// app.get('/api/health', (req, res) => {
//   res.json({ message: 'SplitMate API is running!' });
// });
// app.use('/api/share', require('./routes/share'));
// app.use('/api/email', require('./routes/email'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
