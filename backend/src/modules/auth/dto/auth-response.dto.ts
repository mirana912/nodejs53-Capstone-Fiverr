// src/modules/auth/dto/auth-response.dto.ts
// ==========================================
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  birth_day?: string;

  @ApiProperty({ required: false })
  gender?: string;

  @ApiProperty({ required: false })
  skill?: string;

  @ApiProperty({ required: false })
  certification?: string;
}

export class AuthResponse {
  @ApiProperty()
  user: UserResponse;

  @ApiProperty()
  access_token: string;
}

// ==========================================
