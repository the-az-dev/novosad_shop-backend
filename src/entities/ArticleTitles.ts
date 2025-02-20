import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";
import { TextI18n } from "./TextI18n";

@Index("article_id", ["articleId"], {})
@Index("name_key", ["nameKey"], {})
@Entity("article-titles", { schema: "novosad-shop" })
export class ArticleTitles {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "article_id" })
  articleId: number;

  @Column("varchar", { name: "name_key", length: 255 })
  nameKey: string;

  @ManyToOne(() => Article, (article) => article.articleTitles, {
    onDelete: "RESTRICT",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "id" }])
  article: Article;

  @ManyToOne(() => TextI18n, (textI18n) => textI18n.articleTitles, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "name_key", referencedColumnName: "textKey" }])
  nameKey2: TextI18n;
}
