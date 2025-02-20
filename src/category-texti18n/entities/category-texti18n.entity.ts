import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'category-text-i18n' })
export class CategoryTexti18n {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;
  @Column({ name: 'name_key' })
  name_key: string;
  @Column({ name: 'category_id' })
  categroy_id: number;
}
