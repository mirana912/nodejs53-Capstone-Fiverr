// src/config/app.config.ts
// ==========================================
export default () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 8080,
    apiPrefix: process.env.API_PREFIX || 'api',
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    credentials: true,
  },
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 5242880, // 5MB
    uploadDir: process.env.UPLOAD_DIR || './uploads',
  },
});

// ==========================================
