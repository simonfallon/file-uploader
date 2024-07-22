import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes';
import path from 'path';
import fs from 'fs'; // Add this line to import the 'fs' module

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

// Create the uploads directory if it doesn't exist
const uploadPath = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
