// src/app/core/models/job.model.ts
// ==========================================

import { User } from './user.model';
import { CategoryDetail } from './category.model';

export interface Job {
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
  chiTietLoaiCongViec?: CategoryDetail;
  nguoiDung?: User;
  binhLuan?: Comments[];
}

export interface Comments {
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
  congViec?: Job;
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

export interface JobsResponse {
  statusCode: number;
  message: string;
  data: {
    data: Job[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

export interface UpdateJobDto extends Partial<CreateJobDto> {}

// ==========================================
