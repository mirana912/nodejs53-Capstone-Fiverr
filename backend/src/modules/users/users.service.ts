// src/modules/users/users.service.ts
// ==========================================
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Find all user
  async findAll(query: QueryUserDto) {
    const { name, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = name
      ? {
          name: {
            contains: name,
          },
        }
      : {};

    const [users, total] = await Promise.all([
      this.prisma.nguoiDung.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          birth_day: true,
          gender: true,
          role: true,
          skill: true,
          certification: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.nguoiDung.count({ where }),
    ]);

    return {
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
  // Search user by ID
  async findOne(id: number) {
    const user = await this.prisma.nguoiDung.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        birth_day: true,
        gender: true,
        role: true,
        skill: true,
        certification: true,
        createdAt: true,
        updatedAt: true,
        congViec: {
          select: {
            id: true,
            ten_cong_viec: true,
            gia_tien: true,
            hinh_anh: true,
            sao_cong_viec: true,
            danh_gia: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
  // Search user by name
  async searchByName(name: string) {
    return this.prisma.nguoiDung.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        skill: true,
        certification: true,
      },
    });
  }

  // Update user
  async update(id: number, updateUserDto: UpdateUserDto) {
    // Check if user exists
    const existingUser = await this.prisma.nguoiDung.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Check email uniqueness if email is being updated
    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const emailExists = await this.prisma.nguoiDung.findUnique({
        where: { email: updateUserDto.email },
      });

      if (emailExists) {
        throw new ConflictException('Email already exists');
      }
    }

    // Hash password if being updated
    if (updateUserDto.pass_word) {
      updateUserDto.pass_word = await bcrypt.hash(updateUserDto.pass_word, 10);
    }

    const updatedUser = await this.prisma.nguoiDung.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        birth_day: true,
        gender: true,
        role: true,
        skill: true,
        certification: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.prisma.nguoiDung.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.prisma.nguoiDung.delete({
      where: { id },
    });

    return { message: 'User deleted successfully' };
  }

  // Get user's created jobs
  async getUserJobs(userId: number, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [jobs, total] = await Promise.all([
      this.prisma.congViec.findMany({
        where: { nguoi_tao: userId },
        skip,
        take: limit,
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
      }),
      this.prisma.congViec.count({ where: { nguoi_tao: userId } }),
    ]);

    return {
      data: jobs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get user's hired jobs
  async getUserHiredJobs(userId: number) {
    return this.prisma.thueCongViec.findMany({
      where: { ma_nguoi_thue: userId },
      include: {
        congViec: {
          include: {
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
}

// ==========================================
