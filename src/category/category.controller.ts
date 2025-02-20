import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Head,
  Headers,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'node:path';

@Controller('/api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Get('/get/byLocaleKey/:locale_key')
  async findByLocale(
    @Param('locale_key') locale: string,
  ): Promise<Array<Category> | null> {
    return await this.categoryService.findByLocale(locale);
  }

  @Get('/get/photo/byID/:id')
  async findByPhoto(@Param('id') id: number, @Res() res: Response) {
    try {
      const category = await this.categoryService.findOne(+id);
      const filePath = join(process.cwd(), category.photo); // Повертаємо шлях до файлу
      res.sendFile(filePath);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('/add/:id/photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ): Promise<void> {
    await this.categoryService.updatePhotoPath(id, file);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
