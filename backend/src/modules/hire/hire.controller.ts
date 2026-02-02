// src/modules/hire/hire.controller.ts
// ==========================================
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { HireService } from './hire.service';
import { HireJobDto, UpdateHireDto } from './dto/hire-job.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('hire')
@UseGuards(JwtAuthGuard)
export class HireController {
  constructor(private readonly hireService: HireService) {}

  @Post()
  hireJob(@Request() req, @Body() hireJobDto: HireJobDto) {
    return this.hireService.hireJob(req.user.userId, hireJobDto);
  }

  @Get('my-hires')
  getMyHiredJobs(@Request() req) {
    return this.hireService.getMyHiredJobs(req.user.userId);
  }

  @Get(':id')
  getHireDetail(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.hireService.getHireDetail(id, req.user.userId);
  }

  @Patch(':id/complete')
  completeJob(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() updateHireDto: UpdateHireDto,
  ) {
    return this.hireService.completeJob(id, req.user.userId, updateHireDto);
  }

  @Delete(':id')
  cancelHire(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.hireService.cancelHire(id, req.user.userId);
  }

  @Get('job/:jobId/hires')
  getJobHires(@Param('jobId', ParseIntPipe) jobId: number, @Request() req) {
    return this.hireService.getJobHires(jobId, req.user.userId);
  }
}

// ==========================================
