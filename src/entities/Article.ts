import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ArticleDescription } from "./ArticleDescription";
import { ArticleImage } from "./ArticleImage";
import { ArticleTitles } from "./ArticleTitles";

@Entity("article", { schema: "novosad-shop" })
export class Article {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "hint", length: 255 })
  hint: string;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @OneToMany(
    () => ArticleDescription,
    (articleDescription) => articleDescription.article
  )
  articleDescriptions: ArticleDescription[];

  @OneToMany(() => ArticleImage, (articleImage) => articleImage.article)
  articleImages: ArticleImage[];

  @OneToMany(() => ArticleTitles, (articleTitles) => articleTitles.article)
  articleTitles: ArticleTitles[];
}
