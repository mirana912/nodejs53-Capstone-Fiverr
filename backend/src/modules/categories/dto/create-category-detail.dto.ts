// src/modules/categories/dto/create-category-detail.dto.ts
// ==========================================
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateCategoryDetailDto {
  @ApiProperty({ example: 'Website Development' })
  @IsNotEmpty()
  @IsString()
  ten_chi_tiet: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  hinh_anh?: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  ma_loai_cong_viec: number;
}

// ==========================================
