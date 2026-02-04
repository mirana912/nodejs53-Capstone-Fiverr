// src/common/interceptors/logging.interceptor.ts
// ==========================================
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { error } from 'console';
import { Observable, Observer } from 'rxjs';
import { tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, ip } = req;
    const userAgent = req.get('user-agent') || '';
    const now = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const res = context.switchToHttp().getResponse();
          const { statusCode } = res;
          const responseTime = Date.now() - now;

          this.logger.log(`${method} ${url} ${statusCode} ${responseTime}ms - ${ip} ${userAgent},`);
        },
        error: (error) => {
          const responseTime = Date.now() - now;
          this.logger.error(
            `${method} ${url} ${error.status || 500} ${responseTime}ms ${error.message}`,
          );
        },
      }),
    );
  }
}
