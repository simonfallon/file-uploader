import { Router } from 'express';
import { uploadFile, listFiles, deleteFile, getFile } from './controllers';

const router = Router();

router.post('/upload', uploadFile);
router.get('/files', listFiles);
router.delete('/files/:filename', deleteFile);
router.get('/download/:filename', getFile);

export default router;