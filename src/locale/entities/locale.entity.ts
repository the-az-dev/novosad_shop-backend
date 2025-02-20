import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'locale' })
export class Locale {
  @PrimaryGeneratedColumn({ name: 'name' })
  name: string;
}
