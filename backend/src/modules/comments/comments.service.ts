import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Lấy comments của job
   */
  async getJobComments(jobId: number) {
    const job = await this.prisma.congViec.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${jobId} not found`);
    }

    return this.prisma.binhLuan.findMany({
      where: { ma_cong_viec: jobId },
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
    });
  }

  /**
   * Tạo comment mới
   */
  async create(userId: number, createCommentDto: CreateCommentDto) {
    // Verify job exists
    const job = await this.prisma.congViec.findUnique({
      where: { id: createCommentDto.ma_cong_viec },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${createCommentDto.ma_cong_viec} not found`);
    }

    const comment = await this.prisma.binhLuan.create({
      data: {
        ...createCommentDto,
        ma_nguoi_binh_luan: userId,
      },
      include: {
        nguoiDung: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Update job rating
    await this.updateJobRating(createCommentDto.ma_cong_viec);

    return comment;
  }

  /**
   * Xóa comment
   */
  async remove(id: number, userId: number) {
    const comment = await this.prisma.binhLuan.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    // Only owner can delete
    if (comment.ma_nguoi_binh_luan !== userId) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    const jobId = comment.ma_cong_viec;

    await this.prisma.binhLuan.delete({
      where: { id },
    });

    // Update job rating after delete
    await this.updateJobRating(jobId);

    return { message: 'Comment deleted successfully' };
  }

  /**
   * Cập nhật rating trung bình của job
   */
  private async updateJobRating(jobId: number) {
    const comments = await this.prisma.binhLuan.findMany({
      where: { ma_cong_viec: jobId },
      select: { sao_binh_luan: true },
    });

    if (comments.length === 0) {
      await this.prisma.congViec.update({
        where: { id: jobId },
        data: {
          sao_cong_viec: 0,
          danh_gia: 0,
        },
      });
      return;
    }

    const avgRating = comments.reduce((sum, c) => sum + c.sao_binh_luan, 0) / comments.length;

    await this.prisma.congViec.update({
      where: { id: jobId },
      data: {
        sao_cong_viec: Math.round(avgRating * 10) / 10,
        danh_gia: comments.length,
      },
    });
  }
}
