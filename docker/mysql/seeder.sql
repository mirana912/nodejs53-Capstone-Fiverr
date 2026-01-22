-- ==========================================
-- FILE: docker/mysql/seeder.sql
-- Seed data for Cyber Fiverr
-- ==========================================

USE cyber_fiverr;

-- ==========================================
-- 1. SEED USERS (NguoiDung)
-- ==========================================
-- Password cho tất cả user: 123456
-- Hashed password: $2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5NU1gY1I4Rvzi

INSERT INTO nguoi_dung (name, email, pass_word, phone, birth_day, gender, role, skill, certification, createdAt, updatedAt) VALUES
-- Admin users
('Admin User', 'admin@fiverr.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5NU1gY1I4Rvzi', '0901234567', '1990-01-15', 'male', 'admin', 'System Administration', 'AWS Certified Solutions Architect', NOW(), NOW()),

-- Regular users (Freelancers)
('John Doe', 'john@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5NU1gY1I4Rvzi', '0912345678', '1995-03-20', 'male', 'user', 'React, Node.js, TypeScript', 'Meta Frontend Developer', NOW(), NOW()),
('Jane Smith', 'jane@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5NU1gY1I4Rvzi', '0923456789', '1992-07-10', 'female', 'user', 'UI/UX Design, Figma, Adobe XD', 'Google UX Design Certificate', NOW(), NOW()),
('Michael Chen', 'michael@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5NU1gY1I4Rvzi', '0934567890', '1988-11-25', 'male', 'user', 'Python, Django, Machine Learning', 'AWS Machine Learning Specialty', NOW(), NOW()),
('Sarah Wilson', 'sarah@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5NU1gY1I4Rvzi', '0945678901', '1994-05-30', 'female', 'user', 'Content Writing, SEO, Copywriting', 'HubSpot Content Marketing', NOW(), NOW()),
('David Lee', 'david@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5NU1gY1I4Rvzi', '0956789012', '1991-09-14', 'male', 'user', 'Video Editing, After Effects, Premiere Pro', 'Adobe Certified Professional', NOW(), NOW()),
('Emily Brown', 'emily@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5NU1gY1I4Rvzi', '0967890123', '1993-12-08', 'female', 'user', 'Mobile App Development, Flutter, React Native', 'Google Associate Android Developer', NOW(), NOW()),
('Tom Anderson', 'tom@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5NU1gY1I4Rvzi', '0978901234', '1989-04-22', 'male', 'user', 'DevOps, Docker, Kubernetes, CI/CD', 'Kubernetes Administrator', NOW(), NOW()),
('Lisa Martinez', 'lisa@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5NU1gY1I4Rvzi', '0989012345', '1996-08-17', 'female', 'user', 'Graphic Design, Photoshop, Illustrator', 'Adobe Certified Expert', NOW(), NOW()),
('James Taylor', 'james@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5NU1gY1I4Rvzi', '0990123456', '1987-02-28', 'male', 'user', 'Data Analysis, SQL, Power BI, Tableau', 'Microsoft Data Analyst Associate', NOW(), NOW());

-- ==========================================
-- 2. SEED JOB CATEGORIES (LoaiCongViec)
-- ==========================================
INSERT INTO loai_cong_viec (ten_loai_cong_viec, createdAt, updatedAt) VALUES
('Programming & Tech', NOW(), NOW()),
('Graphics & Design', NOW(), NOW()),
('Digital Marketing', NOW(), NOW()),
('Writing & Translation', NOW(), NOW()),
('Video & Animation', NOW(), NOW()),
('Music & Audio', NOW(), NOW()),
('Business', NOW(), NOW()),
('Data', NOW(), NOW());

-- ==========================================
-- 3. SEED CATEGORY DETAILS (ChiTietLoaiCongViec)
-- ==========================================
INSERT INTO chi_tiet_loai_cong_viec (ten_chi_tiet, hinh_anh, ma_loai_cong_viec, createdAt, updatedAt) VALUES
-- Programming & Tech (1)
('Web Development', 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156477/website%20development.png', 1, NOW(), NOW()),
('Mobile App Development', 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156494/mobile%20app.png', 1, NOW(), NOW()),
('Database Development', 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156488/database.png', 1, NOW(), NOW()),
('DevOps & Cloud', 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156495/devops.png', 1, NOW(), NOW()),

-- Graphics & Design (2)
('Logo Design', 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156473/logo%20design.png', 2, NOW(), NOW()),
('UI/UX Design', 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156476/ui%20ux.png', 2, NOW(), NOW()),
('Illustration', 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156474/illustration.png', 2, NOW(), NOW()),
('Brand Style Guides', 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156490/brand%20style.png', 2, NOW(), NOW()),

-- Digital Marketing (3)
('SEO', 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156499/seo.png', 3, NOW(), NOW()),
('Social Media Marketing', 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156481/social%20media.png', 3, NOW(), NOW()),
('Email Marketing', 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156479/email%20marketing.png', 3, NOW(), NOW()),
('Content Marketing', 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156492/content%20marketing.png', 3, NOW(), NOW()),

-- Writing & Translation (4)
('Content Writing', 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156493/content%20writing.png', 4, NOW(), NOW()),
('Translation', 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156496/translation.png', 4, NOW(), NOW()),
('Copywriting', 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156491/copywriting.png', 4, NOW(), NOW()),

-- Video & Animation (5)
('Video Editing', 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156480/video%20editing.png', 5, NOW(), NOW()),
('Animation', 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156497/animation.png', 5, NOW(), NOW()),
('Motion Graphics', 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156498/motion%20graphics.png', 5, NOW(), NOW()),

-- Data (8)
('Data Analysis', 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156482/data%20analysis.png', 8, NOW(), NOW()),
('Data Visualization', 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156483/data%20visualization.png', 8, NOW(), NOW());

-- ==========================================
-- 4. SEED JOBS (CongViec)
-- ==========================================
INSERT INTO cong_viec (ten_cong_viec, danh_gia, gia_tien, hinh_anh, mo_ta, mo_ta_ngan, sao_cong_viec, ma_chi_tiet_loai, nguoi_tao, createdAt, updatedAt) VALUES
-- Web Development Jobs
('I will develop a full-stack web application with React and Node.js', 156, 500000, 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/298692832/original/0b8b506f6b5d3b3b5e2d3e3e3e3e3e3e3e3e3e3e.png', 'I will create a professional full-stack web application using modern technologies like React, Node.js, Express, and MongoDB. Includes responsive design, API development, and database integration.', 'Professional full-stack web app development', 5, 1, 2, NOW(), NOW()),
('I will build a responsive WordPress website', 243, 300000, 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/245890123/original/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p.png', 'Professional WordPress website development with custom theme, SEO optimization, and mobile responsiveness. Perfect for businesses and portfolios.', 'Custom WordPress website development', 5, 1, 2, NOW(), NOW()),

-- Mobile App Development
('I will create a professional mobile app using Flutter', 89, 800000, 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/312456789/original/2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q.png', 'Cross-platform mobile app development using Flutter. Includes UI/UX design, API integration, state management, and app store deployment.', 'Flutter mobile app development', 5, 2, 7, NOW(), NOW()),

-- Logo Design
('I will design a modern minimalist logo', 567, 150000, 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/198765432/original/3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r.png', 'Professional logo design with unlimited revisions. You will receive vector files (AI, EPS, PDF) and high-resolution PNG/JPG formats. Modern, minimalist, and timeless designs.', 'Modern minimalist logo design', 5, 5, 9, NOW(), NOW()),
('I will create a unique brand identity package', 324, 500000, 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/287654321/original/4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s.png', 'Complete brand identity including logo, business card, letterhead, and brand guidelines. Professional and unique designs tailored to your business.', 'Complete brand identity package', 5, 5, 9, NOW(), NOW()),

-- UI/UX Design
('I will design a modern UI/UX for your website or app', 178, 400000, 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/345678901/original/5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t.png', 'User-centered UI/UX design using Figma. Includes wireframes, mockups, prototypes, and design system. Focus on usability and aesthetics.', 'Professional UI/UX design services', 5, 6, 3, NOW(), NOW()),

-- SEO Services
('I will provide complete SEO optimization for your website', 412, 350000, 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/234567890/original/6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u.png', 'Comprehensive SEO services including keyword research, on-page optimization, technical SEO, and link building. Guaranteed improvement in search rankings.', 'Complete SEO optimization service', 5, 9, 5, NOW(), NOW()),

-- Content Writing
('I will write SEO-optimized blog posts and articles', 289, 200000, 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/456789012/original/7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v.png', 'High-quality, SEO-optimized content writing for blogs, websites, and articles. Well-researched, engaging, and plagiarism-free content.', 'SEO-optimized content writing', 4, 13, 5, NOW(), NOW()),

-- Video Editing
('I will professionally edit your videos', 198, 300000, 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/567890123/original/8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w.png', 'Professional video editing using Adobe Premiere Pro and After Effects. Includes color grading, transitions, effects, and audio mixing.', 'Professional video editing service', 5, 16, 6, NOW(), NOW()),

-- Data Analysis
('I will analyze your data and create visualizations', 134, 450000, 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/678901234/original/9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x.png', 'Data analysis and visualization using Python, SQL, and Power BI. Includes statistical analysis, dashboards, and actionable insights.', 'Data analysis and visualization', 5, 19, 10, NOW(), NOW()),

-- DevOps
('I will set up CI/CD pipeline and DevOps infrastructure', 76, 600000, 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/789012345/original/0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y.png', 'Complete DevOps setup including Docker, Kubernetes, CI/CD pipelines (Jenkins/GitLab), and cloud infrastructure (AWS/Azure/GCP).', 'DevOps and CI/CD setup', 5, 4, 8, NOW(), NOW());

-- ==========================================
-- 5. SEED HIRED JOBS (ThueCongViec)
-- ==========================================
INSERT INTO thue_cong_viec (ma_cong_viec, ma_nguoi_thue, ngay_thue, hoan_thanh, createdAt, updatedAt) VALUES
(1, 3, '2025-01-15 10:30:00', true, NOW(), NOW()),
(1, 5, '2025-01-16 14:20:00', true, NOW(), NOW()),
(2, 4, '2025-01-17 09:15:00', false, NOW(), NOW()),
(3, 2, '2025-01-18 11:45:00', true, NOW(), NOW()),
(4, 6, '2025-01-19 16:00:00', false, NOW(), NOW()),
(5, 7, '2025-01-20 13:30:00', true, NOW(), NOW()),
(6, 8, '2025-01-21 10:00:00', false, NOW(), NOW());

-- ==========================================
-- 6. SEED COMMENTS (BinhLuan)
-- ==========================================
INSERT INTO binh_luan (ma_cong_viec, ma_nguoi_binh_luan, ngay_binh_luan, noi_dung, sao_binh_luan, createdAt, updatedAt) VALUES
(1, 3, '2025-01-16 11:00:00', 'Excellent work! The developer delivered exactly what I needed. Very professional and responsive to feedback. Highly recommended!', 5, NOW(), NOW()),
(1, 5, '2025-01-17 15:00:00', 'Great quality work and fast delivery. Will definitely hire again for future projects.', 5, NOW(), NOW()),
(2, 4, '2025-01-18 10:00:00', 'The WordPress website looks amazing! Very satisfied with the design and functionality.', 5, NOW(), NOW()),
(3, 2, '2025-01-19 12:00:00', 'Beautiful mobile app with smooth performance. The developer was very helpful throughout the process.', 5, NOW(), NOW()),
(4, 6, '2025-01-20 14:00:00', 'Perfect logo design! Captured exactly what I envisioned for my brand. Love it!', 5, NOW(), NOW()),
(5, 7, '2025-01-21 11:00:00', 'Comprehensive brand identity package. Very professional and creative work.', 5, NOW(), NOW()),
(6, 8, '2025-01-22 09:00:00', 'The UI/UX design is modern and user-friendly. Great attention to detail!', 5, NOW(), NOW());

-- ==========================================
-- Success Message
-- ==========================================
SELECT '✅ Database seeded successfully!' AS Status;
SELECT COUNT(*) AS 'Total Users' FROM nguoi_dung;
SELECT COUNT(*) AS 'Total Job Categories' FROM loai_cong_viec;
SELECT COUNT(*) AS 'Total Category Details' FROM chi_tiet_loai_cong_viec;
SELECT COUNT(*) AS 'Total Jobs' FROM cong_viec;
SELECT COUNT(*) AS 'Total Hired Jobs' FROM thue_cong_viec;
SELECT COUNT(*) AS 'Total Comments' FROM binh_luan;