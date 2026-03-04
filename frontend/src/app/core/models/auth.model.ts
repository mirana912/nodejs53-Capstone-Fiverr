// src/app/core/models/auth.model.ts
// ==========================================

export interface JwtPayload {
  sub: number; // userId
  email: string;
  role: string;
  iat?: number; // issued at
  exp?: number; // expiration
}

// ==========================================
