import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryTextI18n } from "./CategoryTextI18n";
import { Product } from "./Product";

@Entity("category", { schema: "novosad-shop" })
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "hint", length: 255 })
  hint: string;

  @Column("text", { name: "photo", nullable: true })
  photo: string | null;

  @OneToMany(
    () => CategoryTextI18n,
    (categoryTextI18n) => categoryTextI18n.category
  )
  categoryTextI18ns: CategoryTextI18n[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
