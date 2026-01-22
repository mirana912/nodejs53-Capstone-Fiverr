// FILE: src/modules/auth/auth.service.ts
// ==========================================
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Check if email already exists
    const existingUser = await this.prisma.nguoiDung.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.pass_word, 10);

    // Create user
    const user = await this.prisma.nguoiDung.create({
      data: {
        name: registerDto.name,
        email: registerDto.email,
        pass_word: hashedPassword,
        phone: registerDto.phone,
        birth_day: registerDto.birth_day,
        gender: registerDto.gender,
        skill: registerDto.skill,
        certification: registerDto.certification,
        role: 'user',
      },
    });

    // Generate JWT token
    const token = this.generateToken(user);

    return {
      user: this.sanitizeUser(user),
      access_token: token,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.pass_word);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.generateToken(user);

    return {
      user: this.sanitizeUser(user),
      access_token: token,
    };
  }

  async validateUser(email: string, pass_word: string) {
    const user = await this.prisma.nguoiDung.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(pass_word, user.pass_word);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async getProfile(userId: number) {
    const user = await this.prisma.nguoiDung.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.sanitizeUser(user);
  }

  private generateToken(user: any): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }

  private sanitizeUser(user: any) {
    const { pass_word, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

// ==========================================
