import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateJobDto {
  @IsString()
  ten_cong_viec: string;

  @IsNumber()
  @Min(0)
  gia_tien: number;

  @IsString()
  @IsOptional()
  hinh_anh?: string;

  @IsString()
  @IsOptional()
  mo_ta?: string;

  @IsString()
  @IsOptional()
  mo_ta_ngan?: string;

  @IsNumber()
  ma_chi_tiet_loai: number;
}

export class UpdateJobDto {
  @IsString()
  @IsOptional()
  ten_cong_viec?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  gia_tien?: number;

  @IsString()
  @IsOptional()
  hinh_anh?: string;

  @IsString()
  @IsOptional()
  mo_ta?: string;

  @IsString()
  @IsOptional()
  mo_ta_ngan?: string;

  @IsNumber()
  @IsOptional()
  ma_chi_tiet_loai?: number;
}
