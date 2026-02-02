// src/modules/comments/dto/create-comment.dto.ts
// ==========================================
import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  ma_cong_viec: number;

  @IsString()
  noi_dung: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  sao_binh_luan: number;
}

// ==========================================
