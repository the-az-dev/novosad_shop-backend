import { Module } from '@nestjs/common';
import { LocaleService } from './locale.service';
import { LocaleController } from './locale.controller';
import { Locale } from './entities/locale.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Locale])],
  controllers: [LocaleController],
  providers: [LocaleService],
})
export class LocaleModule {}
