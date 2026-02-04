// src/modules/jobs/job.service.ts
// ==========================================
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateJobDto, UpdateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find all jobs with pagination & filter
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
    const limit = Math.min(query.limit || 10, 100);
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
        select: {
          id: true,
          ten_cong_viec: true,
          gia_tien: true,
          hinh_anh: true,
          mo_ta_ngan: true,
          sao_cong_viec: true,
          danh_gia: true,
          createdAt: true,
          nguoiDung: {
            select: {
              id: true,
              name: true,
            },
          },
          chiTietLoaiCongViec: {
            select: {
              id: true,
              ten_chi_tiet: true,
              loaiCongViec: {
                select: {
                  id: true,
                  ten_loai_cong_viec: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.congViec.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: jobs,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  /**
   * Search job by ID
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
          take: 10,
        },
      },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    return job;
  }

  /**
   * Create job
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
   * Update job
   */
  async update(id: number, userId: number, updateJobDto: UpdateJobDto) {
    const job = await this.prisma.congViec.findUnique({
      where: { id },
      select: { id: true, nguoi_tao: true },
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
   * Delete job
   */
  async remove(id: number, userId: number) {
    const job = await this.prisma.congViec.findUnique({
      where: { id },
      select: { id: true, nguoi_tao: true },
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
   * Get jobs by user
   */
  async getMyJobs(userId: number) {
    return this.prisma.congViec.findMany({
      where: { nguoi_tao: userId },
      select: {
        id: true,
        ten_cong_viec: true,
        gia_tien: true,
        hinh_anh: true,
        mo_ta_ngan: true,
        sao_cong_viec: true,
        danh_gia: true,
        createdAt: true,
        chiTietLoaiCongViec: {
          select: {
            id: true,
            ten_chi_tiet: true,
            loaiCongViec: {
              select: {
                id: true,
                ten_loai_cong_viec: true,
              },
            },
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
