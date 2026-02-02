import { IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class HireJobDto {
  @IsNumber()
  ma_cong_viec: number;
}

export class UpdateHireDto {
  @IsBoolean()
  @IsOptional()
  hoan_thanh?: boolean;
}
