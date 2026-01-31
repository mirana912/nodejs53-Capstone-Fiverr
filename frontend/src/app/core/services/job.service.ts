// src/app/core/services/job.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CongViec, CreateJobDto, UpdateJobDto, ApiResponse, PaginatedResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/jobs`; // Adjust theo route backend

  /**
   * Lấy danh sách tất cả jobs
   */
  getAllJobs(params?: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: number;
  }): Observable<ApiResponse<PaginatedResponse<CongViec>>> {
    let httpParams = new HttpParams();

    if (params) {
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.limit) httpParams = httpParams.set('limit', params.limit.toString());
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.categoryId)
        httpParams = httpParams.set('categoryId', params.categoryId.toString());
    }

    return this.http.get<ApiResponse<PaginatedResponse<CongViec>>>(this.API_URL, {
      params: httpParams,
    });
  }

  /**
   * Lấy job theo ID
   */
  getJobById(id: number): Observable<ApiResponse<CongViec>> {
    return this.http.get<ApiResponse<CongViec>>(`${this.API_URL}/${id}`);
  }

  /**
   * Tạo job mới
   */
  createJob(jobData: CreateJobDto): Observable<ApiResponse<CongViec>> {
    return this.http.post<ApiResponse<CongViec>>(this.API_URL, jobData);
  }

  /**
   * Cập nhật job
   */
  updateJob(id: number, jobData: UpdateJobDto): Observable<ApiResponse<CongViec>> {
    return this.http.patch<ApiResponse<CongViec>>(`${this.API_URL}/${id}`, jobData);
  }

  /**
   * Xóa job
   */
  deleteJob(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/${id}`);
  }

  /**
   * Thuê job
   */
  hireJob(jobId: number): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.API_URL}/${jobId}/hire`, {});
  }

  /**
   * Lấy jobs của user hiện tại
   */
  getMyJobs(): Observable<ApiResponse<CongViec[]>> {
    return this.http.get<ApiResponse<CongViec[]>>(`${this.API_URL}/my-jobs`);
  }

  /**
   * Upload hình ảnh cho job
   */
  uploadJobImage(jobId: number, file: File): Observable<ApiResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<ApiResponse<any>>(`${this.API_URL}/${jobId}/upload-image`, formData);
  }
}
