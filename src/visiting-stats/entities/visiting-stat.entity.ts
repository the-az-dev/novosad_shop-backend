import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'visiting-stats' })
export class VisitingStat {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;
  @Column({ name: 'visitors-count' })
  visitors_count: number;
  @Column({ name: 'date' })
  date: string;
}
