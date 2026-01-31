// src/app/core/models/job.model.ts
// ==========================================

import { User } from './user.model';
import { ChiTietLoaiCongViec } from './category.model';

export interface CongViec {
  id: number;
  ten_cong_viec: string;
  danh_gia: number;
  gia_tien: number;
  hinh_anh?: string;
  mo_ta?: string;
  mo_ta_ngan?: string;
  sao_cong_viec: number;
  ma_chi_tiet_loai: number;
  nguoi_tao: number;
  createdAt: Date;
  updatedAt: Date;

  // Optional relations
  chiTietLoaiCongViec?: ChiTietLoaiCongViec;
  nguoiDung?: User;
  binhLuan?: BinhLuan[];
}

export interface BinhLuan {
  id: number;
  ma_cong_viec: number;
  ma_nguoi_binh_luan: number;
  ngay_binh_luan: Date;
  noi_dung: string;
  sao_binh_luan: number;
  createdAt: Date;
  updatedAt: Date;

  // Optional relations
  nguoiDung?: User;
}

export interface ThueCongViec {
  id: number;
  ma_cong_viec: number;
  ma_nguoi_thue: number;
  ngay_thue: Date;
  hoan_thanh: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Optional relations
  congViec?: CongViec;
  nguoiDung?: User;
}

export interface CreateJobDto {
  ten_cong_viec: string;
  gia_tien: number;
  hinh_anh?: string;
  mo_ta?: string;
  mo_ta_ngan?: string;
  ma_chi_tiet_loai: number;
}

export interface UpdateJobDto extends Partial<CreateJobDto> {}

// ==========================================
