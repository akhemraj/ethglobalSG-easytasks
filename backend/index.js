import express from 'express';
import cors from 'cors';
const app = express();
import connectDB from './src/config/db.js';
import userRoutes from'./src/routes/UserRoutes.js';
import 'dotenv/config';

// const connectDB = require('./src/config/db'); 
app.use(cors()); 
app.use(express.json());
connectDB();
app.get('/', (req, res) => {
  res.send('<h1>Welcome to my Express web server!</h1>');
});

app.use('/api', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express webserver listening on port ${port}...`);
});
