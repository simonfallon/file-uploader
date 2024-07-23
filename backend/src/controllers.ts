import { Request, Response } from 'express';
import multer from 'multer';
import pool from './db';
import path from 'path';
import fs from 'fs';

// Function to get a unique filename
const getUniqueFilename = (filename: string, destination: string) => {
  const fileExt = path.extname(filename);
  const fileBase = path.basename(filename, fileExt);
  let newFilename = filename;
  let counter = 1;

  // Check if file exists and generate a unique name
  while (fs.existsSync(path.join(destination, newFilename))) {
    newFilename = `${fileBase}(${counter})${fileExt}`;
    counter++;
  }

  return newFilename;
};

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueFilename = getUniqueFilename(file.originalname, 'uploads/');
    cb(null, uniqueFilename); // Use the unique filename
  },
});

const upload = multer({ storage }).single('file');
const MILLIS_IN_MINUTE = 60000;

export const uploadFile = (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('File upload error:', err); // Log error details
      return res.status(500).json({ message: 'File upload failed', err });
    }
    if (!req.file) {
      console.error('No file provided');
      return res.status(400).json({ message: 'No file provided' });
    }
    const { filename } = req.file;
    const utcDate = new Date();
    const timeZoneOffset = utcDate.getTimezoneOffset() * MILLIS_IN_MINUTE;
    const uploadDate = new Date(utcDate.getTime() - timeZoneOffset).toISOString();
    await pool.query(`INSERT INTO files (filename, upload_date) VALUES ('${filename}', '${uploadDate}')`);
    res.status(200).json({ message: `File ${filename} uploaded successfully`, filename: filename });
  });
};

export const listFiles = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM files');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error });
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  const { filename } = req.params;
  await pool.query(`DELETE FROM files WHERE filename = '${filename}'`);
  fs.unlink(path.join(__dirname, '..', 'uploads', filename), (err) => {
    if (err) {
      return res.status(500).json({ message: 'File deletion failed', err });
    }
    res.status(200).json({ message: 'File deleted successfully' });
  });
};

export const downloadFile = (req: Request, res: Response) => {
  const { filename } = req.params;
  const file = path.join(__dirname, '..', 'uploads', filename);
  res.download(file, (err) => {
    if (err) {
      console.error('File download error:', err);
      res.status(500).json({ message: 'File download failed', err });
    }
  });
};