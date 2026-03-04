// src/app/core/services/category.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category, CategoryDetail } from '../models';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/categories`;

  /**
   * Lấy tất cả loại công việc
   */
  getAllCategories(): Observable<ApiResponse<Category[]>> {
    return this.http.get<ApiResponse<Category[]>>(this.API_URL);
  }

  /**
   * Lấy category theo ID
   */
  getCategoryById(id: number): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(`${this.API_URL}/${id}`);
  }

  /**
   * Lấy chi tiết loại công việc theo category ID
   */
  getCategoryDetails(categoryId: number): Observable<ApiResponse<CategoryDetail[]>> {
    return this.http.get<ApiResponse<CategoryDetail[]>>(`${this.API_URL}/${categoryId}/details`);
  }

  /**
   * Lấy tất cả chi tiết loại công việc
   */
  getAllCategoryDetails(): Observable<ApiResponse<CategoryDetail[]>> {
    return this.http.get<ApiResponse<CategoryDetail[]>>(`${this.API_URL}/details`);
  }
}
