// backend/prisma/prisma.service.ts
// ==========================================

import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super();
  }
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected successfully');

    await this.seedIfEmpty();
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Database disconnected');
  }

  // Seed database nếu chưa có data
  private async seedIfEmpty() {
    try {
      const userCount = await this.nguoiDung.count();

      if (userCount > 0) {
        this.logger.log(`Database already seeded (${userCount} users found)`);
        return;
      }

      this.logger.log('Database is empty. Starting auto-seed...');

      const hashedPassword = await bcrypt.hash('123456', 12);

      // 1. SEED USERS
      this.logger.log('Seeding users...');
      await this.nguoiDung.createMany({
        data: [
          {
            name: 'Admin User',
            email: 'admin@fiverr.com',
            pass_word: hashedPassword,
            phone: '0901234567',
            birth_day: '1990-01-15',
            gender: 'male',
            role: 'admin',
            skill: 'System Administration',
            certification: 'AWS Certified Solutions Architect',
          },
          {
            name: 'John Doe',
            email: 'john@example.com',
            pass_word: hashedPassword,
            phone: '0912345678',
            birth_day: '1995-03-20',
            gender: 'male',
            role: 'user',
            skill: 'React, Node.js, TypeScript',
            certification: 'Meta Frontend Developer',
          },
          {
            name: 'Jane Smith',
            email: 'jane@example.com',
            pass_word: hashedPassword,
            phone: '0923456789',
            birth_day: '1992-07-10',
            gender: 'female',
            role: 'user',
            skill: 'UI/UX Design, Figma, Adobe XD',
            certification: 'Google UX Design Certificate',
          },
          {
            name: 'Michael Chen',
            email: 'michael@example.com',
            pass_word: hashedPassword,
            phone: '0934567890',
            birth_day: '1988-11-25',
            gender: 'male',
            role: 'user',
            skill: 'Python, Django, Machine Learning',
            certification: 'AWS Machine Learning Specialty',
          },
          {
            name: 'Sarah Wilson',
            email: 'sarah@example.com',
            pass_word: hashedPassword,
            phone: '0945678901',
            birth_day: '1994-05-30',
            gender: 'female',
            role: 'user',
            skill: 'Content Writing, SEO, Copywriting',
            certification: 'HubSpot Content Marketing',
          },
          {
            name: 'David Lee',
            email: 'david@example.com',
            pass_word: hashedPassword,
            phone: '0956789012',
            birth_day: '1991-09-14',
            gender: 'male',
            role: 'user',
            skill: 'Video Editing, After Effects',
            certification: 'Adobe Certified Professional',
          },
          {
            name: 'Emily Brown',
            email: 'emily@example.com',
            pass_word: hashedPassword,
            phone: '0967890123',
            birth_day: '1993-12-08',
            gender: 'female',
            role: 'user',
            skill: 'Mobile App Development, Flutter',
            certification: 'Google Associate Android Developer',
          },
          {
            name: 'Tom Anderson',
            email: 'tom@example.com',
            pass_word: hashedPassword,
            phone: '0978901234',
            birth_day: '1989-04-22',
            gender: 'male',
            role: 'user',
            skill: 'DevOps, Docker, Kubernetes',
            certification: 'Kubernetes Administrator',
          },
          {
            name: 'Lisa Martinez',
            email: 'lisa@example.com',
            pass_word: hashedPassword,
            phone: '0989012345',
            birth_day: '1996-08-17',
            gender: 'female',
            role: 'user',
            skill: 'Graphic Design, Photoshop',
            certification: 'Adobe Certified Expert',
          },
          {
            name: 'James Taylor',
            email: 'james@example.com',
            pass_word: hashedPassword,
            phone: '0990123456',
            birth_day: '1987-02-28',
            gender: 'male',
            role: 'user',
            skill: 'Data Analysis, SQL, Power BI',
            certification: 'Microsoft Data Analyst',
          },
        ],
      });

      // 2. SEED JOB CATEGORIES
      this.logger.log('Seeding job categories...');
      await this.loaiCongViec.createMany({
        data: [
          { ten_loai_cong_viec: 'Programming & Tech' },
          { ten_loai_cong_viec: 'Graphics & Design' },
          { ten_loai_cong_viec: 'Digital Marketing' },
          { ten_loai_cong_viec: 'Writing & Translation' },
          { ten_loai_cong_viec: 'Video & Animation' },
          { ten_loai_cong_viec: 'Music & Audio' },
          { ten_loai_cong_viec: 'Business' },
          { ten_loai_cong_viec: 'Data' },
        ],
      });

      // 3. SEED CATEGORY DETAILS
      this.logger.log('Seeding category details...');
      await this.chiTietLoaiCongViec.createMany({
        data: [
          // Programming & Tech (1)
          {
            ten_chi_tiet: 'Web Development',
            hinh_anh: 'https://via.placeholder.com/300x200?text=Web+Dev',
            ma_loai_cong_viec: 1,
          },
          {
            ten_chi_tiet: 'Mobile App Development',
            hinh_anh: 'https://via.placeholder.com/300x200?text=Mobile',
            ma_loai_cong_viec: 1,
          },
          {
            ten_chi_tiet: 'Database Development',
            hinh_anh: 'https://via.placeholder.com/300x200?text=Database',
            ma_loai_cong_viec: 1,
          },
          {
            ten_chi_tiet: 'DevOps & Cloud',
            hinh_anh: 'https://via.placeholder.com/300x200?text=DevOps',
            ma_loai_cong_viec: 1,
          },

          // Graphics & Design (2)
          {
            ten_chi_tiet: 'Logo Design',
            hinh_anh: 'https://via.placeholder.com/300x200?text=Logo',
            ma_loai_cong_viec: 2,
          },
          {
            ten_chi_tiet: 'UI/UX Design',
            hinh_anh: 'https://via.placeholder.com/300x200?text=UIUX',
            ma_loai_cong_viec: 2,
          },
          {
            ten_chi_tiet: 'Illustration',
            hinh_anh: 'https://via.placeholder.com/300x200?text=Illustration',
            ma_loai_cong_viec: 2,
          },

          // Digital Marketing (3)
          {
            ten_chi_tiet: 'SEO',
            hinh_anh: 'https://via.placeholder.com/300x200?text=SEO',
            ma_loai_cong_viec: 3,
          },
          {
            ten_chi_tiet: 'Social Media Marketing',
            hinh_anh: 'https://via.placeholder.com/300x200?text=Social',
            ma_loai_cong_viec: 3,
          },
          {
            ten_chi_tiet: 'Content Marketing',
            hinh_anh: 'https://via.placeholder.com/300x200?text=Content',
            ma_loai_cong_viec: 3,
          },

          // Writing & Translation (4)
          {
            ten_chi_tiet: 'Content Writing',
            hinh_anh: 'https://via.placeholder.com/300x200?text=Writing',
            ma_loai_cong_viec: 4,
          },
          {
            ten_chi_tiet: 'Translation',
            hinh_anh: 'https://via.placeholder.com/300x200?text=Translation',
            ma_loai_cong_viec: 4,
          },

          // Video & Animation (5)
          {
            ten_chi_tiet: 'Video Editing',
            hinh_anh: 'https://via.placeholder.com/300x200?text=Video',
            ma_loai_cong_viec: 5,
          },
          {
            ten_chi_tiet: 'Animation',
            hinh_anh: 'https://via.placeholder.com/300x200?text=Animation',
            ma_loai_cong_viec: 5,
          },

          // Data (8)
          {
            ten_chi_tiet: 'Data Analysis',
            hinh_anh: 'https://via.placeholder.com/300x200?text=Analysis',
            ma_loai_cong_viec: 8,
          },
          {
            ten_chi_tiet: 'Data Visualization',
            hinh_anh: 'https://via.placeholder.com/300x200?text=Visualization',
            ma_loai_cong_viec: 8,
          },
        ],
      });

      // 4. SEED JOBS
      this.logger.log('💼 Seeding jobs...');
      await this.congViec.createMany({
        data: [
          {
            ten_cong_viec: 'I will develop a full-stack web application with React and Node.js',
            danh_gia: 156,
            gia_tien: 500000,
            hinh_anh: 'https://via.placeholder.com/400x300?text=Web+App',
            mo_ta:
              'Professional full-stack web application using React, Node.js, Express, and MongoDB',
            mo_ta_ngan: 'Professional full-stack web development',
            sao_cong_viec: 5,
            ma_chi_tiet_loai: 1,
            nguoi_tao: 2,
          },
          {
            ten_cong_viec: 'I will design a modern minimalist logo',
            danh_gia: 567,
            gia_tien: 150000,
            hinh_anh: 'https://via.placeholder.com/400x300?text=Logo',
            mo_ta: 'Professional logo design with unlimited revisions. Vector files included.',
            mo_ta_ngan: 'Modern minimalist logo design',
            sao_cong_viec: 5,
            ma_chi_tiet_loai: 5,
            nguoi_tao: 9,
          },
          {
            ten_cong_viec: 'I will create a professional mobile app using Flutter',
            danh_gia: 89,
            gia_tien: 800000,
            hinh_anh: 'https://via.placeholder.com/400x300?text=Flutter',
            mo_ta: 'Cross-platform mobile app development using Flutter',
            mo_ta_ngan: 'Flutter mobile app development',
            sao_cong_viec: 5,
            ma_chi_tiet_loai: 2,
            nguoi_tao: 7,
          },
        ],
      });

      // Get final counts
      const finalUserCount = await this.nguoiDung.count();
      const categoryCount = await this.loaiCongViec.count();
      const detailCount = await this.chiTietLoaiCongViec.count();
      const jobCount = await this.congViec.count();

      this.logger.log('Database seeded successfully!');
      this.logger.log(`Users: ${finalUserCount}`);
      this.logger.log(`Categories: ${categoryCount}`);
      this.logger.log(`Category Details: ${detailCount}`);
      this.logger.log(`Jobs: ${jobCount}`);
    } catch (error) {
      this.logger.error('Auto-seed failed:', error);
      // Không throw error để app vẫn chạy được
    }
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Cannot clean database in production!');
    }

    const models = Reflect.ownKeys(this).filter((key) => key[0] !== '_');
    return Promise.all(models.map((modelKey) => this[modelKey].deleteMany()));
  }
}
