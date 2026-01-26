# docker/mysql/init.sql
# ==========================================
-- Initial database setup
CREATE DATABASE IF NOT EXISTS cyber_fiverr CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE cyber_fiverr;

-- Grant privileges
GRANT ALL PRIVILEGES ON cyber_fiverr.* TO 'fiverr_user'@'%';
FLUSH PRIVILEGES;

-- ==========================================