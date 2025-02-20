import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';
import { ProductComment } from './ProductComment';
import { ProductDescription } from './ProductDescription';
import { ProductTitle } from './ProductTitle';

@Index('category_id', ['categoryId'], {})
@Entity('product', { schema: 'novosad-shop' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('decimal', { name: 'price', precision: 10, scale: 2 })
  price: string;

  @Column('date', { name: 'planting_start', nullable: true })
  plantingStart: string | null;

  @Column('date', { name: 'planting_end', nullable: true })
  plantingEnd: string | null;

  @Column('varchar', { name: 'season', nullable: true, length: 50 })
  season: string | null;

  @Column('int', { name: 'category_id' })
  categoryId: number;

  @Column('varchar', { name: 'hint', length: 255 })
  hint: string;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Category;

  @OneToMany(() => ProductComment, (productComment) => productComment.product)
  productComments: ProductComment[];

  @OneToMany(
    () => ProductDescription,
    (productDescription) => productDescription.product,
  )
  productDescriptions: ProductDescription[];

  @OneToMany(() => ProductTitle, (productTitle) => productTitle.product)
  productTitles: ProductTitle[];
}
