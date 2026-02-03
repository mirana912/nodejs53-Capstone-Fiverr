// src/modules/users/dto/update-user.dto.ts
// ==========================================
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(6)
  pass_word?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  birth_day?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  skill?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  certification?: string;
}

// ==========================================
