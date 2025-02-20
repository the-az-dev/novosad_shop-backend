import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";

@Index("article_id", ["articleId"], {})
@Entity("article-image", { schema: "novosad-shop" })
export class ArticleImage {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "article_id" })
  articleId: number;

  @Column("text", { name: "image_url" })
  imageUrl: string;

  @ManyToOne(() => Article, (article) => article.articleImages, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "id" }])
  article: Article;
}
