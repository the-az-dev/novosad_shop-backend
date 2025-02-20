import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";

@Index("product_id", ["productId"], {})
@Entity("product-comment", { schema: "novosad-shop" })
export class ProductComment {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "product_id" })
  productId: number;

  @Column("text", { name: "comment" })
  comment: string;

  @Column("varchar", { name: "username", length: 100 })
  username: string;

  @ManyToOne(() => Product, (product) => product.productComments, {
    onDelete: "RESTRICT",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Product;
}
