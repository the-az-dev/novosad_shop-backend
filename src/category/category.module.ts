import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { TextI18n } from 'src/text-i18n/entities/text-i18n.entity';
import { TextI18nModule } from 'src/text-i18n/text-i18n.module';
import { CategoryTexti18nModule } from 'src/category-texti18n/category-texti18n.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, TextI18n]),
    TextI18nModule,
    CategoryTexti18nModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
