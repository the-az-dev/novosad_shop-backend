import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryTexti18nDto } from './create-category-texti18n.dto';

export class UpdateCategoryTexti18nDto extends PartialType(
  CreateCategoryTexti18nDto,
) {}
