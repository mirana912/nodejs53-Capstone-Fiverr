// src/app/core/services/category.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoaiCongViec, ChiTietLoaiCongViec, ApiResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/categories`;

  /**
   * Lấy tất cả loại công việc
   */
  getAllCategories(): Observable<ApiResponse<LoaiCongViec[]>> {
    return this.http.get<ApiResponse<LoaiCongViec[]>>(this.API_URL);
  }

  /**
   * Lấy category theo ID
   */
  getCategoryById(id: number): Observable<ApiResponse<LoaiCongViec>> {
    return this.http.get<ApiResponse<LoaiCongViec>>(`${this.API_URL}/${id}`);
  }

  /**
   * Lấy chi tiết loại công việc theo category ID
   */
  getCategoryDetails(categoryId: number): Observable<ApiResponse<ChiTietLoaiCongViec[]>> {
    return this.http.get<ApiResponse<ChiTietLoaiCongViec[]>>(
      `${this.API_URL}/${categoryId}/details`,
    );
  }

  /**
   * Lấy tất cả chi tiết loại công việc
   */
  getAllCategoryDetails(): Observable<ApiResponse<ChiTietLoaiCongViec[]>> {
    return this.http.get<ApiResponse<ChiTietLoaiCongViec[]>>(`${this.API_URL}/details`);
  }
}
