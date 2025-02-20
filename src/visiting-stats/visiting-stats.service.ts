import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitingStat } from './entities/visiting-stat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VisitingStatsService {
  constructor(
    @InjectRepository(VisitingStat)
    private visitorRepository: Repository<VisitingStat>,
  ) {}

  async findAll(): Promise<Array<VisitingStat> | null> {
    return await this.visitorRepository.find();
  }

  async findOne(date: string): Promise<VisitingStat | null> {
    const stat: VisitingStat = await this.visitorRepository.findOneByOrFail({
      date: date,
    });
    return stat;
  }

  async update(): Promise<void> {
    const today = new Date().toISOString().split('T')[0]; // Отримуємо поточну дату

    // Шукаємо запис за поточну дату
    let visitorRecord = await this.visitorRepository.findOne({
      where: { date: today },
    });

    if (!visitorRecord) {
      // Якщо запису немає, створюємо новий
      visitorRecord = this.visitorRepository.create({
        date: today,
        visitors_count: 1,
      });
    } else {
      // Якщо запис є, збільшуємо лічильник
      visitorRecord.visitors_count += 1;
    }

    await this.visitorRepository.save(visitorRecord); // Зберігаємо зміни
  }
}
