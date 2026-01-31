// src/app/core/models/api-response.model.ts
// ==========================================

export interface ApiResponse<T = any> {
  statusCode: number;
  message: string;
  content: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}

// ==========================================
