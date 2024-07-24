"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = exports.deleteFile = exports.listFiles = exports.uploadFile = void 0;
const multer_1 = __importDefault(require("multer"));
const db_1 = __importDefault(require("./db"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Function to get a unique filename
const getUniqueFilename = (filename, destination) => {
    const fileExt = path_1.default.extname(filename);
    const fileBase = path_1.default.basename(filename, fileExt);
    let newFilename = filename;
    let counter = 1;
    // Check if file exists and generate a unique name
    while (fs_1.default.existsSync(path_1.default.join(destination, newFilename))) {
        newFilename = `${fileBase}(${counter})${fileExt}`;
        counter++;
    }
    return newFilename;
};
// Configure multer storage
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        const uniqueFilename = getUniqueFilename(file.originalname, 'uploads/');
        cb(null, uniqueFilename); // Use the unique filename
    },
});
const upload = (0, multer_1.default)({ storage }).single('file');
const MILLIS_IN_MINUTE = 60000;
const uploadFile = (req, res) => {
    upload(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield db_1.default.query(`INSERT INTO files (filename, upload_date) VALUES ('${filename}', '${uploadDate}')`);
        res.status(200).json({ message: `File ${filename} uploaded successfully`, filename: filename });
    }));
};
exports.uploadFile = uploadFile;
const listFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query('SELECT * FROM files');
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Database error', error: error });
    }
});
exports.listFiles = listFiles;
const deleteFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename } = req.params;
    yield db_1.default.query(`DELETE FROM files WHERE filename = '${filename}'`);
    fs_1.default.unlink(path_1.default.join(__dirname, '..', 'uploads', filename), (err) => {
        if (err) {
            return res.status(500).json({ message: 'File deletion failed', err });
        }
        res.status(200).json({ message: 'File deleted successfully' });
    });
});
exports.deleteFile = deleteFile;
const downloadFile = (req, res) => {
    const { filename } = req.params;
    const file = path_1.default.join(__dirname, '..', 'uploads', filename);
    res.download(file, (err) => {
        if (err) {
            console.error('File download error:', err);
            res.status(500).json({ message: 'File download failed', err });
        }
    });
};
exports.downloadFile = downloadFile;
