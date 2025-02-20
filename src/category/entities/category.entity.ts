import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;
  @Column({ name: 'hint_name' })
  hint_name: string;
  @Column({ name: 'photo' })
  photo: string;
}
