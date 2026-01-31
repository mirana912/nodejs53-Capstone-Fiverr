// src/app/core/services/comment.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BinhLuan, ApiResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/comments`;

  /**
   * Lấy comments của job
   */
  getJobComments(jobId: number): Observable<ApiResponse<BinhLuan[]>> {
    return this.http.get<ApiResponse<BinhLuan[]>>(`${this.API_URL}/job/${jobId}`);
  }

  /**
   * Tạo comment mới
   */
  createComment(
    jobId: number,
    data: {
      noi_dung: string;
      sao_binh_luan: number;
    },
  ): Observable<ApiResponse<BinhLuan>> {
    return this.http.post<ApiResponse<BinhLuan>>(this.API_URL, {
      ma_cong_viec: jobId,
      ...data,
    });
  }

  /**
   * Xóa comment
   */
  deleteComment(commentId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/${commentId}`);
  }
}
