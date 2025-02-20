import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TextI18nService } from './text-i18n.service';
import { CreateTextI18nDto } from './dto/create-text-i18n.dto';
import { UpdateTextI18nDto } from './dto/update-text-i18n.dto';

@Controller('text-i18n')
export class TextI18nController {
  constructor(private readonly textI18nService: TextI18nService) {}

  @Post()
  create(@Body() createTextI18nDto: CreateTextI18nDto) {
    return this.textI18nService.create(createTextI18nDto);
  }

  @Get()
  findAll() {
    return this.textI18nService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.textI18nService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTextI18nDto: UpdateTextI18nDto,
  ) {
    return this.textI18nService.update(+id, updateTextI18nDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.textI18nService.remove(+id);
  }
}
