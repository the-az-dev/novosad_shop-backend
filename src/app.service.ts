import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/Product';
import { Article } from './entities/Article';
import { Category } from './entities/Category';
import { TextI18n } from './entities/TextI18n';
import { ProductComment } from './entities/ProductComment';
import { ArticleImage } from './entities/ArticleImage';
import { VisitingStats } from './entities/VisitingStats';
import { ProductTitle } from './entities/ProductTitle';
import { ProductDescription } from './entities/ProductDescription';
import { ArticleTitles } from './entities/ArticleTitles';
import { ArticleDescription } from './entities/ArticleDescription';
import { CategoryTextI18n } from './entities/CategoryTextI18n';
import * as fs from 'fs';
import path, { join } from 'path';
import { CreateArticleDTO } from './dto/CreateArticleDTO';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Product) private product_repo: Repository<Product>,
    @InjectRepository(Article) private article_repo: Repository<Article>,
    @InjectRepository(Category) private category_repo: Repository<Category>,
    @InjectRepository(TextI18n) private text_i18n_repo: Repository<TextI18n>,
    @InjectRepository(ProductComment)
    private product_comment_repo: Repository<ProductComment>,
    @InjectRepository(ArticleImage)
    private article_image_repo: Repository<ArticleImage>,
    @InjectRepository(VisitingStats)
    private visiting_stats_repo: Repository<VisitingStats>,
    @InjectRepository(ProductTitle)
    private product_title_repo: Repository<ProductTitle>,
    @InjectRepository(ProductDescription)
    private product_description_repo: Repository<ProductDescription>,
    @InjectRepository(ArticleTitles)
    private article_titles_repo: Repository<ArticleTitles>,
    @InjectRepository(ArticleDescription)
    private article_description_repo: Repository<ArticleDescription>,
    @InjectRepository(CategoryTextI18n)
    private category_text_i18n_repo: Repository<CategoryTextI18n>,
  ) { }

  async get_localized_products(locale: string) {
    return this.product_repo
      .createQueryBuilder('product')
      .leftJoin('product-title', 'ptl', 'product.id = ptl.product_id')
      .leftJoin('text-i18n', 'ti', 'ptl.name_key = ti.text_key AND ti.locale = :locale', { locale })
      .leftJoin('product-description', 'pdc', 'product.id = pdc.product_id')
      .leftJoin('text-i18n', 'tii', 'pdc.name_key = tii.text_key AND tii.locale = :locale', { locale })
      .leftJoin('category', 'category', 'product.category_id = category.id')
      .leftJoin('text-i18n', 'tic', 'category.id = tic.text_key AND tic.locale = :locale', { locale })
      .select([
        'product.id AS id',
        'product.price AS price',
        'product.season AS season',
        'product.hint AS hint',
        'MAX(tic.value) AS category_name',
        'MAX(ti.value) AS title',
        'MAX(tii.value) AS description',
        'MAX(ti.locale) AS locale',
        'product.planting_start AS plant_at',
        'product.planting_end AS harvest_at'
      ])
      .groupBy('product.id')
      .getRawMany();
  }

  async get_localized_articles(locale: string) {
    return this.article_repo
      .createQueryBuilder('article')
      .leftJoin('article-titles', 'article_titles', 'article.id = article_titles.article_id')
      .leftJoin('text-i18n', 'title_text', 'article_titles.name_key = title_text.text_key AND title_text.locale = :locale', { locale })
      .leftJoin('article-description', 'article_description', 'article.id = article_description.article_id')
      .leftJoin('text-i18n', 'desc_text', 'article_description.name_key = desc_text.text_key AND desc_text.locale = :locale', { locale })
      .leftJoin('article-image', 'article_image', 'article.id = article_image.article_id')
      .select([
        'article.id AS id',
        'article.hint AS hint',
        'article.created_at AS createdAt',
        'MAX(title_text.value) AS title',
        'MAX(desc_text.value) AS description',
        'MAX(title_text.locale) AS locale',
        'JSON_ARRAYAGG(article_image.image_url) AS images'
      ])
      .groupBy('article.id')
      .getRawMany();

  }


  async createArticle(dto: CreateArticleDTO): Promise<Article> {
    const article = this.article_repo.create({
      hint: dto.title[0].value,
      createdAt: Date.now()
    });
    await this.article_repo.save(article);

    if(dto.description?.length != 0 && dto.title?.length != 0){
      dto.title?.forEach(async (e) => {
        e.text_key = `${e.value}_${Date.now()}`;
        const text = this.text_i18n_repo.create(e);
        await this.text_i18n_repo.save(text);
        const articleTitle = this.article_titles_repo.create({ articleId: article.id, nameKey: e.text_key });
        await this.article_titles_repo.save(articleTitle);
      });
      dto.description?.forEach(async (e) => {
        e.text_key = `${e.value}_${Date.now()}`;
        const text = this.text_i18n_repo.create(e);
        await this.text_i18n_repo.save(text);
        const articleDesc = this.article_description_repo.create({ articleId: article.id, nameKey: e.text_key });
        await this.article_titles_repo.save(articleDesc);
      });
    }
    else throw new Error('Tittle and Descrption mismatch!');

    if (dto.images?.length) {
      dto.images?.forEach(async (e) => {
        const imageEntities = dto.images.map((imgUrl) => this.article_image_repo.create({ articleId: article.id, imageUrl: e }));
        await this.article_image_repo.save(imageEntities);
      });
    } else throw new Error('Images mismatch!');

    return article;
  }


  findOneCategory(id: number) {
    return this.category_repo.findOneByOrFail({ id: id });
  }

  async findCategoryByLocale(locale: string): Promise<Array<Category> | null> {
    return this.category_repo
      .createQueryBuilder('category')
      .innerJoinAndSelect(
        CategoryTextI18n,
        'cti',
        'category.id = cti.category_id',
      )
      .innerJoinAndSelect(
        TextI18n,
        'ti',
        'cti.name_key = ti.text_key AND ti.locale = :locale',
        { locale },
      )
      .select([
        'category.id AS id',
        'CONCAT(:baseUrl, category.id) AS photo', // Додаємо базовий URL до фото
        'ti.value AS name',
        'ti.locale AS locale',
      ])
      .setParameter('baseUrl', process.env.BASE_URL + ':' + process.env.PORT + '/api/v1/category/get/photo/byID/' || 'http://localhost:' + process.env.PORT + '/api/v1/category/get/photo/byID/') // Беремо значення з .env
      .getRawMany();
  }

  async updateCategoryPhotoPath(id: number, file: Express.Multer.File) {
    const category = await this.category_repo.findOne({ where: { id } });
    if (!category) {
      throw new Error('Запис не знайдено');
    }
    const fileName = category.hint + '.png';
    if (!fs.existsSync(process.cwd() + '/uploads/category'))
      fs.mkdirSync(process.cwd() + '/uploads/category');
    fs.writeFileSync(
      process.cwd() + '/uploads/category/' + fileName,
      file.buffer,
    );
    category.photo = '/uploads/category/' + fileName;
    await this.category_repo.save(category);
  }

  async get_visiting_stats() {
    return this.visiting_stats_repo.find();
  }
}
