// src/modules/categories/categories.service.ts
// ==========================================
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find all categories
   */
  async findAll() {
    return this.prisma.loaiCongViec.findMany({
      include: {
        chiTietLoaiCongViec: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  /**
   * Find category by ID
   */
  async findOne(id: number) {
    const category = await this.prisma.loaiCongViec.findUnique({
      where: { id },
      include: {
        chiTietLoaiCongViec: true,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  /**
   * Get detail category ID
   */
  async getCategoryDetails(categoryId: number) {
    const category = await this.prisma.loaiCongViec.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    return this.prisma.chiTietLoaiCongViec.findMany({
      where: { ma_loai_cong_viec: categoryId },
      include: {
        loaiCongViec: true,
        congViec: {
          take: 5,
        },
      },
    });
  }

  /**
   * Find all detail categories
   */
  async getAllDetails() {
    return this.prisma.chiTietLoaiCongViec.findMany({
      include: {
        loaiCongViec: true,
      },
      orderBy: {
        ma_loai_cong_viec: 'asc',
      },
    });
  }
}

// ==========================================
