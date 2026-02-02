// src/modules/categories/categories.controller.ts
// ==========================================
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Public } from '../../common/decorators/public.decorator';

@Controller('categories')
@Public()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Get(':id/details')
  getCategoryDetails(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.getCategoryDetails(id);
  }

  @Get('details/all')
  getAllDetails() {
    return this.categoriesService.getAllDetails();
  }
}

// ==========================================
