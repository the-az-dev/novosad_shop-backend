import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitingStatDto } from './create-visiting-stat.dto';

export class UpdateVisitingStatDto extends PartialType(CreateVisitingStatDto) {}
