import { Module } from '@nestjs/common';
import { TextI18nService } from './text-i18n.service';
import { TextI18nController } from './text-i18n.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TextI18n } from './entities/text-i18n.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TextI18n])],
  controllers: [TextI18nController],
  providers: [TextI18nService],
  exports: [TextI18nService],
})
export class TextI18nModule {}
