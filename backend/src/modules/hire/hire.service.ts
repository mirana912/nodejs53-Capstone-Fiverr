// src/modules/hire/hire.service.ts
// ==========================================
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { HireJobDto, UpdateHireDto } from './dto/hire-job.dto';

@Injectable()
export class HireService {
  constructor(private prisma: PrismaService) {}

  /**
   * Hire job
   */
  async hireJob(userId: number, hireJobDto: HireJobDto) {
    // Verify job exists
    const job = await this.prisma.congViec.findUnique({
      where: { id: hireJobDto.ma_cong_viec },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${hireJobDto.ma_cong_viec} not found`);
    }

    // Check if user already hired this job
    const existingHire = await this.prisma.thueCongViec.findFirst({
      where: {
        ma_cong_viec: hireJobDto.ma_cong_viec,
        ma_nguoi_thue: userId,
      },
    });

    if (existingHire) {
      throw new BadRequestException('You have already hired this job');
    }

    // Create hire record
    return this.prisma.thueCongViec.create({
      data: {
        ma_cong_viec: hireJobDto.ma_cong_viec,
        ma_nguoi_thue: userId,
      },
      include: {
        congViec: {
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
        },
      },
    });
  }

  /**
   * Get hired jobs by user
   */
  async getMyHiredJobs(userId: number) {
    return this.prisma.thueCongViec.findMany({
      where: { ma_nguoi_thue: userId },
      include: {
        congViec: {
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
        },
      },
      orderBy: {
        ngay_thue: 'desc',
      },
    });
  }

  /**
   * Get 1 hire record
   */
  async getHireDetail(id: number, userId: number) {
    const hire = await this.prisma.thueCongViec.findUnique({
      where: { id },
      include: {
        congViec: {
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

    if (!hire) {
      throw new NotFoundException(`Hire record with ID ${id} not found`);
    }

    // Only owner can view
    if (hire.ma_nguoi_thue !== userId) {
      throw new ForbiddenException('You can only view your own hire records');
    }

    return hire;
  }

  /**
   * Markdown a complete hire job
   */
  async completeJob(id: number, userId: number, updateHireDto: UpdateHireDto) {
    const hire = await this.prisma.thueCongViec.findUnique({
      where: { id },
    });

    if (!hire) {
      throw new NotFoundException(`Hire record with ID ${id} not found`);
    }

    // Only owner can update
    if (hire.ma_nguoi_thue !== userId) {
      throw new ForbiddenException('You can only update your own hire records');
    }

    return this.prisma.thueCongViec.update({
      where: { id },
      data: updateHireDto,
      include: {
        congViec: {
          include: {
            chiTietLoaiCongViec: {
              include: {
                loaiCongViec: true,
              },
            },
          },
        },
      },
    });
  }

  /**
   * Cancel hire job
   */
  async cancelHire(id: number, userId: number) {
    const hire = await this.prisma.thueCongViec.findUnique({
      where: { id },
    });

    if (!hire) {
      throw new NotFoundException(`Hire record with ID ${id} not found`);
    }

    // Only owner can delete
    if (hire.ma_nguoi_thue !== userId) {
      throw new ForbiddenException('You can only cancel your own hire records');
    }

    await this.prisma.thueCongViec.delete({
      where: { id },
    });

    return { message: 'Hire cancelled successfully' };
  }

  /**
   * Get list of Job Hires Users
   */
  async getJobHires(jobId: number, userId: number) {
    // Verify job exists and user is owner
    const job = await this.prisma.congViec.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${jobId} not found`);
    }

    if (job.nguoi_tao !== userId) {
      throw new ForbiddenException('You can only view hires for your own jobs');
    }

    return this.prisma.thueCongViec.findMany({
      where: { ma_cong_viec: jobId },
      include: {
        nguoiDung: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: {
        ngay_thue: 'desc',
      },
    });
  }
}

// ==========================================
