// src/modules/categories/dto/create-category.dto.ts
// ==========================================
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Programming & Tech' })
  @IsNotEmpty()
  @IsString()
  ten_loai_cong_viec: string;
}

// ==========================================
