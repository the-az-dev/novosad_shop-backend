import { Module } from '@nestjs/common';
import { VisitingStatsService } from './visiting-stats.service';
import { VisitingStatsController } from './visiting-stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitingStat } from './entities/visiting-stat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VisitingStat])],
  controllers: [VisitingStatsController],
  providers: [VisitingStatsService],
})
export class VisitingStatsModule {}
