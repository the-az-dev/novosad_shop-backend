import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryTexti18nService } from './category-texti18n.service';
import { CreateCategoryTexti18nDto } from './dto/create-category-texti18n.dto';
import { UpdateCategoryTexti18nDto } from './dto/update-category-texti18n.dto';

@Controller('category-texti18n')
export class CategoryTexti18nController {
  constructor(
    private readonly categoryTexti18nService: CategoryTexti18nService,
  ) {}

  @Post()
  create(@Body() createCategoryTexti18nDto: CreateCategoryTexti18nDto) {
    return this.categoryTexti18nService.create(createCategoryTexti18nDto);
  }

  @Get()
  findAll() {
    return this.categoryTexti18nService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryTexti18nService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryTexti18nDto: UpdateCategoryTexti18nDto,
  ) {
    return this.categoryTexti18nService.update(+id, updateCategoryTexti18nDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryTexti18nService.remove(+id);
  }
}
