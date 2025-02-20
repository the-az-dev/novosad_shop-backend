import { Injectable } from '@nestjs/common';
import { CreateCategoryTexti18nDto } from './dto/create-category-texti18n.dto';
import { UpdateCategoryTexti18nDto } from './dto/update-category-texti18n.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryTexti18n } from './entities/category-texti18n.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryTexti18nService {
  constructor(
    @InjectRepository(CategoryTexti18n)
    categoryTextRepository: Repository<CategoryTexti18n>,
  ) {}

  create(createCategoryTexti18nDto: CreateCategoryTexti18nDto) {
    return 'This action adds a new categoryTexti18n';
  }

  findAll() {
    return `This action returns all categoryTexti18n`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoryTexti18n`;
  }

  update(id: number, updateCategoryTexti18nDto: UpdateCategoryTexti18nDto) {
    return `This action updates a #${id} categoryTexti18n`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryTexti18n`;
  }
}
