import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import path, { join } from 'path';
import { TextI18n } from 'src/text-i18n/entities/text-i18n.entity';
import { CategoryTexti18n } from 'src/category-texti18n/entities/category-texti18n.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(TextI18n)
    private readonly textI18nRepository: Repository<TextI18n>,
  ) {}

  async findAll(): Promise<Array<Category> | null> {
    return await this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.findOneByOrFail({id: id});
  }

  async findByLocale(locale: string): Promise<Array<Category> | null> {
    return this.categoryRepository
      .createQueryBuilder('category')
      .innerJoinAndSelect(
        CategoryTexti18n,
        'cti',
        'category.id = cti.categroy_id',
      )
      .innerJoinAndSelect(
        TextI18n,
        'ti',
        'cti.name_key = ti.text_key AND ti.locale = :locale',
        { locale },
      )
      .select([
        'category.id AS id',
        'CONCAT(:baseUrl, category.id) AS photo', // Додаємо базовий URL до фото
        'ti.value AS name',
        'ti.locale AS locale',
      ])
      .setParameter('baseUrl', process.env.BASE_URL + ':' + process.env.PORT + '/api/v1/category/get/photo/byID/' || 'http://localhost:' + process.env.PORT + '/api/v1/category/get/photo/byID/') // Беремо значення з .env
      .getRawMany();
  }

  async updatePhotoPath(id: number, file: Express.Multer.File) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new Error('Запис не знайдено');
    }
    const fileName = category.hint_name + '.png';
    if (!fs.existsSync(process.cwd() + '/uploads/category'))
      fs.mkdirSync(process.cwd() + '/uploads/category');
    fs.writeFileSync(
      process.cwd() + '/uploads/category/' + fileName,
      file.buffer,
    );
    category.photo = '/uploads/category/' + fileName;
    await this.categoryRepository.save(category);
  }

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
