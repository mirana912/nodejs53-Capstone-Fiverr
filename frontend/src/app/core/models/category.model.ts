// src/app/core/models/category.model.ts
// ==========================================

export interface Category {
  id: number;
  ten_loai_cong_viec: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryDetail {
  id: number;
  ten_chi_tiet: string;
  hinh_anh?: string;
  ma_loai_cong_viec: number;
  createdAt: Date;
  updatedAt: Date;
  loaiCongViec?: Category; // Optional relation
}

// ==========================================
