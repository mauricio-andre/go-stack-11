import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';
import path from 'path';

interface IUploadConfig {
  driver: 's3' | 'disk';
  tempFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    disk: {
      uploadsFolder: string;
    };
    aws: {
      bucket: string;
    };
  };
}

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  driver: 'disk',
  tempFolder,

  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;

        return callback(null, filename);
      },
    }),
  },

  config: {
    disk: {
      uploadsFolder: path.resolve(tempFolder, 'uploads'),
    },
    aws: {
      bucket: process.env.STORAGE_S3_BUCKET,
    },
  },
} as IUploadConfig;
