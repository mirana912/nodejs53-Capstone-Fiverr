import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './../prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import appConfig from './config/app.config';

import { JobsModule } from './modules/jobs/jobs.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { HireModule } from './modules/hire/hire.module';
import { CommentsModule } from './modules/comments/comments.module';
import { UploadModule } from './modules/upload/upload.module';
// import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    CategoriesModule,
    JobsModule,
    CommentsModule,
    HireModule,
    UploadModule,
    // UsersModule,
    JobsModule,
    CategoriesModule,
    HireModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [
    // Global JWT Guard - All routes are protected by default
    // Use @Public() decorator to make routes public
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
