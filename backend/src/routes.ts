import { Router } from 'express';
import { uploadFile, listFiles, deleteFile } from './controllers';

const router = Router();

router.post('/upload', uploadFile);
router.get('/files', listFiles);
router.delete('/files/:filename', deleteFile);

export default router;