import { Module } from '@nestjs/common';
import { CategoryTexti18nService } from './category-texti18n.service';
import { CategoryTexti18nController } from './category-texti18n.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryTexti18n } from './entities/category-texti18n.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryTexti18n])],
  controllers: [CategoryTexti18nController],
  providers: [CategoryTexti18nService],
  exports: [CategoryTexti18nService],
})
export class CategoryTexti18nModule {}
