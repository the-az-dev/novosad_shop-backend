import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VisitingStatsService } from './visiting-stats.service';
import { CreateVisitingStatDto } from './dto/create-visiting-stat.dto';
import { UpdateVisitingStatDto } from './dto/update-visiting-stat.dto';

@Controller('/api/v1/visiting-stats')
export class VisitingStatsController {
  constructor(private readonly visitingStatsService: VisitingStatsService) {}

  @Get()
  findAll() {
    return this.visitingStatsService.findAll();
  }

  @Get(':date')
  findOne(@Param('date') date: string) {
    return this.visitingStatsService.findOne(date);
  }

  @Post()
  update() {
    return this.visitingStatsService.update();
  }
}
