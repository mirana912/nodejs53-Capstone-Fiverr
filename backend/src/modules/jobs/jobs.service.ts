// src/modules/jobs/job.service.ts
// ==========================================
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateJobDto, UpdateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Lấy tất cả jobs với pagination và filter
   */
  async findAll(query: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    // Search by name
    if (query.search) {
      where.ten_cong_viec = {
        contains: query.search,
      };
    }

    // Filter by category
    if (query.categoryId) {
      where.ma_chi_tiet_loai = query.categoryId;
    }

    // Filter by price range
    if (query.minPrice || query.maxPrice) {
      where.gia_tien = {};
      if (query.minPrice) where.gia_tien.gte = query.minPrice;
      if (query.maxPrice) where.gia_tien.lte = query.maxPrice;
    }

    const [jobs, total] = await Promise.all([
      this.prisma.congViec.findMany({
        where,
        skip,
        take: limit,
        include: {
          chiTietLoaiCongViec: {
            include: {
              loaiCongViec: true,
            },
          },
          nguoiDung: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.congViec.count({ where }),
    ]);

    return {
      data: jobs,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Lấy job theo ID
   */
  async findOne(id: number) {
    const job = await this.prisma.congViec.findUnique({
      where: { id },
      include: {
        chiTietLoaiCongViec: {
          include: {
            loaiCongViec: true,
          },
        },
        nguoiDung: {
          select: {
            id: true,
            name: true,
            email: true,
            skill: true,
            certification: true,
          },
        },
        binhLuan: {
          include: {
            nguoiDung: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    return job;
  }

  /**
   * Tạo job mới
   */
  async create(userId: number, createJobDto: CreateJobDto) {
    // Verify category detail exists
    const categoryDetail = await this.prisma.chiTietLoaiCongViec.findUnique({
      where: { id: createJobDto.ma_chi_tiet_loai },
    });

    if (!categoryDetail) {
      throw new NotFoundException(
        `Category detail with ID ${createJobDto.ma_chi_tiet_loai} not found`,
      );
    }

    return this.prisma.congViec.create({
      data: {
        ...createJobDto,
        nguoi_tao: userId,
      },
      include: {
        chiTietLoaiCongViec: {
          include: {
            loaiCongViec: true,
          },
        },
        nguoiDung: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  /**
   * Cập nhật job
   */
  async update(id: number, userId: number, updateJobDto: UpdateJobDto) {
    const job = await this.prisma.congViec.findUnique({
      where: { id },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    // Only owner can update
    if (job.nguoi_tao !== userId) {
      throw new ForbiddenException('You can only update your own jobs');
    }

    return this.prisma.congViec.update({
      where: { id },
      data: updateJobDto,
      include: {
        chiTietLoaiCongViec: {
          include: {
            loaiCongViec: true,
          },
        },
        nguoiDung: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  /**
   * Xóa job
   */
  async remove(id: number, userId: number) {
    const job = await this.prisma.congViec.findUnique({
      where: { id },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    // Only owner can delete
    if (job.nguoi_tao !== userId) {
      throw new ForbiddenException('You can only delete your own jobs');
    }

    await this.prisma.congViec.delete({
      where: { id },
    });

    return { message: 'Job deleted successfully' };
  }

  /**
   * Lấy jobs của user
   */
  async getMyJobs(userId: number) {
    return this.prisma.congViec.findMany({
      where: { nguoi_tao: userId },
      include: {
        chiTietLoaiCongViec: {
          include: {
            loaiCongViec: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

// ==========================================
