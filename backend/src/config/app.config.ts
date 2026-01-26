// src/config/app.config.ts
// ==========================================

import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  app: {
    port: parseInt(process.env.PORT ?? '8080', 10),
    apiPrefix: process.env.API_PREFIX ?? 'api',
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    credentials: true,
  },
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE ?? '5242880', 10),
    uploadDir: process.env.UPLOAD_DIR ?? './uploads',
  },
}));

// ==========================================
