import { PartialType } from '@nestjs/mapped-types';
import { CreateTextI18nDto } from './create-text-i18n.dto';

export class UpdateTextI18nDto extends PartialType(CreateTextI18nDto) {
  text_key: string;
  value: string;
  locale: string;
}
