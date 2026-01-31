// src/app/core/models/auth.model.ts
// ==========================================

export interface LoginDto {
  email: string;
  pass_word: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  pass_word: string;
  phone?: string;
  birth_day?: string;
  gender?: 'male' | 'female' | 'other';
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: 'user' | 'admin';
  };
}

export interface JwtPayload {
  sub: number; // userId
  email: string;
  role: string;
  iat?: number; // issued at
  exp?: number; // expiration
}

// ==========================================
