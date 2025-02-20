import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ArticleDescription } from "./ArticleDescription";
import { ArticleTitles } from "./ArticleTitles";
import { CategoryTextI18n } from "./CategoryTextI18n";
import { ProductDescription } from "./ProductDescription";
import { ProductTitle } from "./ProductTitle";
import { Locale } from "./Locale";

@Index("locale", ["locale"], {})
@Entity("text-i18n", { schema: "novosad-shop" })
export class TextI18n {
  @Column("varchar", { primary: true, name: "text_key", length: 255 })
  textKey: string;

  @Column("text", { name: "value" })
  value: string;

  @Column("varchar", { name: "locale", length: 10 })
  locale: string;

  @OneToMany(
    () => ArticleDescription,
    (articleDescription) => articleDescription.nameKey2
  )
  articleDescriptions: ArticleDescription[];

  @OneToMany(() => ArticleTitles, (articleTitles) => articleTitles.nameKey2)
  articleTitles: ArticleTitles[];

  @OneToMany(
    () => CategoryTextI18n,
    (categoryTextI18n) => categoryTextI18n.nameKey2
  )
  categoryTextI18ns: CategoryTextI18n[];

  @OneToMany(
    () => ProductDescription,
    (productDescription) => productDescription.nameKey2
  )
  productDescriptions: ProductDescription[];

  @OneToMany(() => ProductTitle, (productTitle) => productTitle.nameKey2)
  productTitles: ProductTitle[];

  @ManyToOne(() => Locale, (locale) => locale.textI18ns, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "locale", referencedColumnName: "name" }])
  locale2: Locale;
}
