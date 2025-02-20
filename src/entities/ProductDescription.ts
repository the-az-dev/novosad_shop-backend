import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { TextI18n } from "./TextI18n";

@Index("product_id", ["productId"], {})
@Index("name_key", ["nameKey"], {})
@Entity("product-description", { schema: "novosad-shop" })
export class ProductDescription {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "product_id" })
  productId: number;

  @Column("varchar", { name: "name_key", length: 255 })
  nameKey: string;

  @ManyToOne(() => Product, (product) => product.productDescriptions, {
    onDelete: "RESTRICT",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Product;

  @ManyToOne(() => TextI18n, (textI18n) => textI18n.productDescriptions, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "name_key", referencedColumnName: "textKey" }])
  nameKey2: TextI18n;
}
