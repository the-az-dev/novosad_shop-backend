/* eslint-disable prettier/prettier */
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
import { AppService } from './app.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'node:path';
import { ApiTags, ApiAcceptedResponse, ApiBadRequestResponse, ApiBadGatewayResponse, ApiAmbiguousResponse } from '@nestjs/swagger';
import { Category } from './entities/Category';

@Controller("/api/v1")
export class AppController {
  constructor(private readonly appService: AppService) { }

  /// [BEGIN]  PRODUCT SECTION

  @ApiTags("Production v1")
  @ApiAcceptedResponse({
    example: {
      "id": 1,
      "price": "10.00",
      "season": "winter",
      "hint": "Frigo Strawberry",
      "category_name": null,
      "title": "Саджанці полуниці Фріго",
      "description": "Empty",
      "locale": "ua",
      "plant_at": "2025-02-18T22:00:00.000Z",
      "harvest_at": "2025-02-27T22:00:00.000Z"
    }
  })
  @Get('/product/get/all/byLocale/:locale')
  async getLocalizedProducts(@Param('locale') locale: string) {
    return this.appService.get_localized_products(locale);
  }

  @Get('/product/get/photo/byID/:id')
  async findProductPhotosById(@Param('id') id: number, @Res() res: Response) {
    try {
      const category = await this.appService.findOneCategory(+id);
      const filePath = join(process.cwd(), category.photo); // Повертаємо шлях до файлу
      res.sendFile(filePath);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('/product/add/photo/ByID/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProductPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ): Promise<void> {
    await this.appService.updateCategoryPhotoPath(id, file);
  }

  /// [BEGIN]  ARTICLE SECTION

  @Get('/article/get/all/byLocale/:locale')
  async getLocalizedArticles(@Param('locale') locale: string) {
    return this.appService.get_localized_articles(locale);
  }

  @Get('/article/get/photo/byID/:id')
  async findArticlePhotoByID(@Param('id') id: number, @Res() res: Response) {
    try {
      const category = await this.appService.findOneCategory(+id);
      const filePath = join(process.cwd(), category.photo); // Повертаємо шлях до файлу
      res.sendFile(filePath);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('/article/add/photo/ByID/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadArticlePhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ): Promise<void> {
    await this.appService.updateCategoryPhotoPath(id, file);
  }

  /// [BEGIN]  CATEGORY SECTION

  @ApiTags("Production v1")
  @Get('/category/get/all/byLocale/:locale')
  @ApiAcceptedResponse({
    example: {
      "id": 1,
      "photo": "http://localhost:8081/api/v1/category/get/photo/byID/1",
      "name": "Полуниця",
      "locale": "ua"
    }
  })
  async getLocalizedCategories(@Param('locale') locale: string) {
    return this.appService.findCategoryByLocale(locale);
  }

  @ApiTags("Production v1")
  @Get('/category/get/photo/byID/:id')
  async findByPhoto(@Param('id') id: number, @Res() res: Response) {
    try {
      const category = await this.appService.findOneCategory(+id);
      const filePath = join(process.cwd(), category.photo); // Повертаємо шлях до файлу
      res.sendFile(filePath);
    } catch (error) {
      throw new Error(error);
    }
  }

  @ApiTags("Production v1")
  @Post('/category/add/photo/ByID/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ): Promise<void> {
    await this.appService.updateCategoryPhotoPath(id, file);
  }

  @ApiTags("Production v1")
  @Get('visiting-stats')
  async getVisitingStats() {
    return this.appService.get_visiting_stats();
  }
}
