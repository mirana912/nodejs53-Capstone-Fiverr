// prisma/seed.ts - Seed Data
// ==========================================
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...\n');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.binhLuan.deleteMany();
  await prisma.thueCongViec.deleteMany();
  await prisma.congViec.deleteMany();
  await prisma.chiTietLoaiCongViec.deleteMany();
  await prisma.loaiCongViec.deleteMany();
  await prisma.nguoiDung.deleteMany();
  console.log('✅ Data cleared\n');

  // Create users
  console.log('👥 Creating users...');
  const hashedPassword = await bcrypt.hash('123456', 10);

  const users = await Promise.all([
    prisma.nguoiDung.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        pass_word: hashedPassword,
        phone: '0123456789',
        birth_day: '1990-01-01',
        gender: 'male',
        role: 'user',
        skill: 'JavaScript, TypeScript, React, Node.js',
        certification: 'AWS Certified Developer',
      },
    }),
    prisma.nguoiDung.create({
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        pass_word: hashedPassword,
        phone: '0987654321',
        birth_day: '1992-05-15',
        gender: 'female',
        role: 'user',
        skill: 'Python, Django, Machine Learning',
        certification: 'Google Cloud Professional',
      },
    }),
    prisma.nguoiDung.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        pass_word: hashedPassword,
        role: 'admin',
      },
    }),
  ]);
  console.log(`✅ Created ${users.length} users\n`);

  // Create categories
  console.log('📂 Creating categories...');
  const categories = await Promise.all([
    prisma.loaiCongViec.create({
      data: {
        ten_loai_cong_viec: 'Programming & Tech',
      },
    }),
    prisma.loaiCongViec.create({
      data: {
        ten_loai_cong_viec: 'Graphics & Design',
      },
    }),
    prisma.loaiCongViec.create({
      data: {
        ten_loai_cong_viec: 'Digital Marketing',
      },
    }),
    prisma.loaiCongViec.create({
      data: {
        ten_loai_cong_viec: 'Writing & Translation',
      },
    }),
  ]);
  console.log(`✅ Created ${categories.length} categories\n`);

  // Create category details
  console.log('📋 Creating category details...');
  const categoryDetails = await Promise.all([
    // Programming & Tech
    prisma.chiTietLoaiCongViec.create({
      data: {
        ten_chi_tiet: 'Website Development',
        hinh_anh: 'https://via.placeholder.com/300x200?text=Web+Dev',
        ma_loai_cong_viec: categories[0].id,
      },
    }),
    prisma.chiTietLoaiCongViec.create({
      data: {
        ten_chi_tiet: 'Mobile App Development',
        hinh_anh: 'https://via.placeholder.com/300x200?text=Mobile+Dev',
        ma_loai_cong_viec: categories[0].id,
      },
    }),
    // Graphics & Design
    prisma.chiTietLoaiCongViec.create({
      data: {
        ten_chi_tiet: 'Logo Design',
        hinh_anh: 'https://via.placeholder.com/300x200?text=Logo',
        ma_loai_cong_viec: categories[1].id,
      },
    }),
    prisma.chiTietLoaiCongViec.create({
      data: {
        ten_chi_tiet: 'UI/UX Design',
        hinh_anh: 'https://via.placeholder.com/300x200?text=UI+UX',
        ma_loai_cong_viec: categories[1].id,
      },
    }),
    // Digital Marketing
    prisma.chiTietLoaiCongViec.create({
      data: {
        ten_chi_tiet: 'SEO Services',
        hinh_anh: 'https://via.placeholder.com/300x200?text=SEO',
        ma_loai_cong_viec: categories[2].id,
      },
    }),
    // Writing & Translation
    prisma.chiTietLoaiCongViec.create({
      data: {
        ten_chi_tiet: 'Content Writing',
        hinh_anh: 'https://via.placeholder.com/300x200?text=Writing',
        ma_loai_cong_viec: categories[3].id,
      },
    }),
  ]);
  console.log(`✅ Created ${categoryDetails.length} category details\n`);

  // Create jobs
  console.log('💼 Creating jobs...');
  const jobs = await Promise.all([
    prisma.congViec.create({
      data: {
        ten_cong_viec: 'Build a Full-Stack E-commerce Website',
        danh_gia: 15,
        gia_tien: 5000,
        hinh_anh: 'https://via.placeholder.com/400x300?text=E-commerce',
        mo_ta:
          'I will build a complete e-commerce website with React, Node.js, and MongoDB. Including admin panel, payment integration, and order management.',
        mo_ta_ngan: 'Full-stack e-commerce development',
        sao_cong_viec: 5,
        ma_chi_tiet_loai: categoryDetails[0].id,
        nguoi_tao: users[0].id,
      },
    }),
    prisma.congViec.create({
      data: {
        ten_cong_viec: 'Create Mobile App for iOS and Android',
        danh_gia: 8,
        gia_tien: 8000,
        hinh_anh: 'https://via.placeholder.com/400x300?text=Mobile+App',
        mo_ta:
          'Cross-platform mobile app development using React Native. Clean UI and smooth animations.',
        mo_ta_ngan: 'React Native mobile development',
        sao_cong_viec: 5,
        ma_chi_tiet_loai: categoryDetails[1].id,
        nguoi_tao: users[0].id,
      },
    }),
    prisma.congViec.create({
      data: {
        ten_cong_viec: 'Professional Logo Design',
        danh_gia: 25,
        gia_tien: 500,
        hinh_anh: 'https://via.placeholder.com/400x300?text=Logo',
        mo_ta:
          'Custom logo design with unlimited revisions. Delivery includes vector files and brand guidelines.',
        mo_ta_ngan: 'Custom logo with unlimited revisions',
        sao_cong_viec: 5,
        ma_chi_tiet_loai: categoryDetails[2].id,
        nguoi_tao: users[1].id,
      },
    }),
    prisma.congViec.create({
      data: {
        ten_cong_viec: 'Modern UI/UX Design for Web App',
        danh_gia: 12,
        gia_tien: 3000,
        hinh_anh: 'https://via.placeholder.com/400x300?text=UI+UX',
        mo_ta: 'Complete UI/UX design including wireframes, mockups, and prototypes using Figma.',
        mo_ta_ngan: 'UI/UX design with Figma',
        sao_cong_viec: 4,
        ma_chi_tiet_loai: categoryDetails[3].id,
        nguoi_tao: users[1].id,
      },
    }),
  ]);
  console.log(`✅ Created ${jobs.length} jobs\n`);

  // Create hires
  console.log('🤝 Creating hire records...');
  const hires = await Promise.all([
    prisma.thueCongViec.create({
      data: {
        ma_cong_viec: jobs[0].id,
        ma_nguoi_thue: users[1].id,
        ngay_thue: new Date('2024-01-15'),
        hoan_thanh: true,
      },
    }),
    prisma.thueCongViec.create({
      data: {
        ma_cong_viec: jobs[2].id,
        ma_nguoi_thue: users[0].id,
        ngay_thue: new Date('2024-01-20'),
        hoan_thanh: false,
      },
    }),
  ]);
  console.log(`✅ Created ${hires.length} hire records\n`);

  // Create comments
  console.log('💬 Creating comments...');
  const comments = await Promise.all([
    prisma.binhLuan.create({
      data: {
        ma_cong_viec: jobs[0].id,
        ma_nguoi_binh_luan: users[1].id,
        noi_dung: 'Excellent work! Very professional and delivered on time.',
        sao_binh_luan: 5,
      },
    }),
    prisma.binhLuan.create({
      data: {
        ma_cong_viec: jobs[0].id,
        ma_nguoi_binh_luan: users[2].id,
        noi_dung: 'Great communication and quality work. Highly recommend!',
        sao_binh_luan: 5,
      },
    }),
    prisma.binhLuan.create({
      data: {
        ma_cong_viec: jobs[2].id,
        ma_nguoi_binh_luan: users[0].id,
        noi_dung: 'Amazing logo design! Exceeded my expectations.',
        sao_binh_luan: 5,
      },
    }),
  ]);
  console.log(`✅ Created ${comments.length} comments\n`);

  console.log('📊 SEEDING SUMMARY:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`   👥 Users:              ${users.length}`);
  console.log(`   📂 Categories:         ${categories.length}`);
  console.log(`   📋 Category Details:   ${categoryDetails.length}`);
  console.log(`   💼 Jobs:               ${jobs.length}`);
  console.log(`   🤝 Hires:              ${hires.length}`);
  console.log(`   💬 Comments:           ${comments.length}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('🎉 Database seeding completed successfully!\n');
  console.log('📝 Test credentials:');
  console.log('   User: john@example.com / 123456');
  console.log('   User: jane@example.com / 123456');
  console.log('   Admin: admin@example.com / 123456\n');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// ==========================================
