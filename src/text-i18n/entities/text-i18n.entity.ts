import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'text-i18n' })
export class TextI18n {
  @PrimaryGeneratedColumn({ name: 'text_key' })
  text_key: string;
  @Column({ name: 'value' })
  value: string;
  @Column({ name: 'locale' })
  locale: string;
}
