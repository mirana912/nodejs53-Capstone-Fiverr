// src/modules/categories/dto/update-category-detail.dto.ts
// ==========================================
import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDetailDto } from './create-category-detail.dto';

export class UpdateCategoryDetailDto extends PartialType(CreateCategoryDetailDto) {}

// ==========================================
