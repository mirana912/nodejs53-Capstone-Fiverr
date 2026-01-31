// src/app/core/models/category.model.ts
// ==========================================

export interface LoaiCongViec {
  id: number;
  ten_loai_cong_viec: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChiTietLoaiCongViec {
  id: number;
  ten_chi_tiet: string;
  hinh_anh?: string;
  ma_loai_cong_viec: number;
  createdAt: Date;
  updatedAt: Date;
  loaiCongViec?: LoaiCongViec; // Optional relation
}

// ==========================================
