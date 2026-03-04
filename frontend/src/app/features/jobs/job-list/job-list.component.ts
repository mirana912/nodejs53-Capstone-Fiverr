// src/app/features/jobs/job-list/job-list.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../../core/services/job.service';
import { Job } from '../../../core/models';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Danh sách công việc</h1>

      <div *ngIf="isLoading" class="text-center py-12">
        <p>Đang tải...</p>
      </div>

      <div *ngIf="error" class="bg-red-50 text-red-600 p-4 rounded-md mb-4">
        {{ error }}
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          *ngFor="let job of jobs"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            [src]="job.hinh_anh || 'assets/placeholder.jpg'"
            [alt]="job.ten_cong_viec"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="font-semibold text-lg mb-2">{{ job.ten_cong_viec }}</h3>
            <p class="text-gray-600 text-sm mb-4">{{ job.mo_ta_ngan }}</p>
            <div class="flex justify-between items-center">
              <span class="text-primary font-bold">{{ job.gia_tien | currency: 'VND' }}</span>
              <div class="flex items-center">
                <span class="text-yellow-500">★</span>
                <span class="ml-1">{{ job.sao_cong_viec }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class JobListComponent implements OnInit {
  private jobService = inject(JobService);

  jobs: Job[] = [];
  isLoading = false;
  error = '';

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.isLoading = true;
    this.error = '';

    this.jobService.getAllJobs({ page: 1, limit: 20 }).subscribe({
      next: (response) => {
        this.jobs = response.content.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
      },
    });
  }
}
