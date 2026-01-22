import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './../prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import appConfig from './config/app.config';

// Import modules (will create later)
// import { UsersModule } from './modules/users/users.module';
// import { JobsModule } from './modules/jobs/jobs.module';
// import { CategoriesModule } from './modules/categories/categories.module';
// import { HiresModule } from './modules/hires/hires.module';
// import { CommentsModule } from './modules/comments/comments.module';
// import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    // UsersModule,
    // JobsModule,
    // CategoriesModule,
    // HiresModule,
    // CommentsModule,
    // UploadModule,
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
