// src/app/core/models/user.model.ts
// ==========================================

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  birth_day?: string;
  gender?: 'male' | 'female' | 'other';
  role: 'user' | 'admin';
  skill?: string;
  certification?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  // Có thể extend thêm fields cho profile page
}

export interface UpdateUserDto {
  name?: string;
  phone?: string;
  birth_day?: string;
  gender?: 'male' | 'female' | 'other';
  skill?: string;
  certification?: string;
}

// ==========================================
