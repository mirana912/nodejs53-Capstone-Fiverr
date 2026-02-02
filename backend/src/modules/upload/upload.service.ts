// src/modules/upload/upload.service.ts
// ==========================================
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  /**
   * Upload job image
   */
  async uploadJobImage(jobId: number, userId: number, file: Express.Multer.File) {
    // Verify job exists and user is owner
    const job = await this.prisma.congViec.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      // Delete uploaded file if job not found
      this.deleteFile(file.path);
      throw new BadRequestException(`Job with ID ${jobId} not found`);
    }

    if (job.nguoi_tao !== userId) {
      this.deleteFile(file.path);
      throw new BadRequestException('You can only upload images for your own jobs');
    }

    // Delete old image if exists
    if (job.hinh_anh && job.hinh_anh.startsWith('/uploads/')) {
      const oldPath = path.join(process.cwd(), job.hinh_anh);
      this.deleteFile(oldPath);
    }

    // Update job with new image path
    const imagePath = `/uploads/jobs/${file.filename}`;
    const updatedJob = await this.prisma.congViec.update({
      where: { id: jobId },
      data: { hinh_anh: imagePath },
    });

    return {
      message: 'Image uploaded successfully',
      imagePath,
      job: updatedJob,
    };
  }

  /**
   * Upload category detail image (admin only)
   */
  async uploadCategoryImage(categoryDetailId: number, file: Express.Multer.File) {
    const categoryDetail = await this.prisma.chiTietLoaiCongViec.findUnique({
      where: { id: categoryDetailId },
    });

    if (!categoryDetail) {
      this.deleteFile(file.path);
      throw new BadRequestException(`Category detail with ID ${categoryDetailId} not found`);
    }

    // Delete old image if exists
    if (categoryDetail.hinh_anh && categoryDetail.hinh_anh.startsWith('/uploads/')) {
      const oldPath = path.join(process.cwd(), categoryDetail.hinh_anh);
      this.deleteFile(oldPath);
    }

    // Update category detail with new image path
    const imagePath = `/uploads/categories/${file.filename}`;
    const updated = await this.prisma.chiTietLoaiCongViec.update({
      where: { id: categoryDetailId },
      data: { hinh_anh: imagePath },
    });

    return {
      message: 'Category image uploaded successfully',
      imagePath,
      categoryDetail: updated,
    };
  }

  /**
   * Delete file helper
   */
  private deleteFile(filePath: string): void {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
}

// ==========================================
