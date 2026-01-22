// src/modules/auth/strategies/local.strategy.ts
// ==========================================
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'pass_word',
    });
  }

  async validate(email: string, pass_word: string): Promise<any> {
    const user = await this.authService.validateUser(email, pass_word);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}

// ==========================================
