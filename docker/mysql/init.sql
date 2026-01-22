# docker/mysql/init.sql
# ==========================================
-- Initial database setup
CREATE DATABASE IF NOT EXISTS cyber_fiverr CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE cyber_fiverr;

-- Grant privileges
GRANT ALL PRIVILEGES ON cyber_fiverr.* TO 'fiverr_user'@'%';
FLUSH PRIVILEGES;

-- ==========================================
-- FILE: backend/Dockerfile
-- ==========================================
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install production dependencies only
RUN npm ci --only=production

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 8080

# Start application
CMD ["node", "dist/main"]

# ==========================================