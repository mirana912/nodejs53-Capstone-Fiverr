// src/app/core/services/auth.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginDto, RegisterDto, AuthResponse, JwtPayload, ApiResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly API_URL = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'access_token';
  private readonly USER_KEY = 'current_user';

  // BehaviorSubject để theo dõi trạng thái đăng nhập
  private currentUserSubject = new BehaviorSubject<JwtPayload | null>(this.getUserFromToken());
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Kiểm tra token khi service khởi tạo
    this.checkTokenValidity();
  }

  // ==========================================
  // AUTHENTICATION METHODS
  // ==========================================

  /**
   * Đăng nhập
   */
  login(credentials: LoginDto): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.API_URL}/login`, credentials).pipe(
      tap((response) => {
        if (response.content) {
          this.setSession(response.content);
        }
      }),
      catchError(this.handleError),
    );
  }

  /**
   * Đăng ký
   */
  register(userData: RegisterDto): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.API_URL}/register`, userData).pipe(
      tap((response) => {
        if (response.content) {
          this.setSession(response.content);
        }
      }),
      catchError(this.handleError),
    );
  }

  /**
   * Đăng xuất
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  /**
   * Lấy thông tin profile
   */
  getProfile(): Observable<ApiResponse<any>> {
    return this.http
      .get<ApiResponse<any>>(`${this.API_URL}/profile`)
      .pipe(catchError(this.handleError));
  }

  // ==========================================
  // TOKEN MANAGEMENT
  // ==========================================

  /**
   * Lưu session sau khi đăng nhập/đăng ký
   */
  private setSession(authResult: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authResult.access_token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResult.user));

    const decoded = this.decodeToken(authResult.access_token);
    this.currentUserSubject.next(decoded);
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Lấy token từ localStorage
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Kiểm tra có token không
   */
  private hasToken(): boolean {
    return !!this.getToken();
  }

  /**
   * Decode JWT token
   */
  private decodeToken(token: string): JwtPayload | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /**
   * Lấy user từ token
   */
  private getUserFromToken(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;
    return this.decodeToken(token);
  }

  /**
   * Kiểm tra token còn hợp lệ không
   */
  private checkTokenValidity(): void {
    const token = this.getToken();
    if (!token) {
      this.isAuthenticatedSubject.next(false);
      return;
    }

    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      this.logout();
      return;
    }

    // Kiểm tra token đã hết hạn chưa
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      this.logout();
      return;
    }

    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Kiểm tra token có hết hạn không
   */
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }

  // ==========================================
  // USER INFO METHODS
  // ==========================================

  /**
   * Lấy thông tin user hiện tại
   */
  getCurrentUser(): JwtPayload | null {
    return this.currentUserSubject.value;
  }

  /**
   * Lấy user ID
   */
  getUserId(): number | null {
    const user = this.getCurrentUser();
    return user ? user.sub : null;
  }

  /**
   * Lấy user role
   */
  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  /**
   * Kiểm tra user có phải admin không
   */
  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  /**
   * Kiểm tra đã đăng nhập chưa
   */
  isLoggedIn(): boolean {
    return !this.isTokenExpired() && this.hasToken();
  }

  // ==========================================
  // ERROR HANDLING
  // ==========================================

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = error.error?.message || error.message || errorMessage;
    }

    console.error('Auth Service Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
