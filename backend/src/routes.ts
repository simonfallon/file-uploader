import { Router } from 'express';
import { uploadFile, listFiles, deleteFile, downloadFile } from './controllers';

const router = Router();

router.post('/upload', uploadFile);
router.get('/files', listFiles);
router.delete('/files/:filename', deleteFile);
router.get('/download/:filename', downloadFile);

export default router;