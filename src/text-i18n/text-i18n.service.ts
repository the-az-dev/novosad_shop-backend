import { Injectable } from '@nestjs/common';
import { CreateTextI18nDto } from './dto/create-text-i18n.dto';
import { UpdateTextI18nDto } from './dto/update-text-i18n.dto';

@Injectable()
export class TextI18nService {
  create(createTextI18nDto: CreateTextI18nDto) {
    return 'This action adds a new textI18n';
  }

  findAll() {
    return `This action returns all textI18n`;
  }

  findOne(id: number) {
    return `This action returns a #${id} textI18n`;
  }

  update(id: number, updateTextI18nDto: UpdateTextI18nDto) {
    return `This action updates a #${id} textI18n`;
  }

  remove(id: number) {
    return `This action removes a #${id} textI18n`;
  }
}
