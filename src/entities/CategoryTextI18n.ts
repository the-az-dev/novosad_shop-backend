import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { TextI18n } from "./TextI18n";

@Index("category_id", ["categoryId"], {})
@Index("name_key", ["nameKey"], {})
@Entity("category-text-i18n", { schema: "novosad-shop" })
export class CategoryTextI18n {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name_key", length: 255 })
  nameKey: string;

  @Column("int", { name: "category_id" })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.categoryTextI18ns, {
    onDelete: "RESTRICT",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: Category;

  @ManyToOne(() => TextI18n, (textI18n) => textI18n.categoryTextI18ns, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "name_key", referencedColumnName: "textKey" }])
  nameKey2: TextI18n;
}
