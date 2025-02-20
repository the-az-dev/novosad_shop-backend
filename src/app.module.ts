import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { TextI18nModule } from './text-i18n/text-i18n.module';
import { LocaleModule } from './locale/locale.module';
import { VisitingStatsModule } from './visiting-stats/visiting-stats.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'node:fs';
import { FileManagerModule } from './file-manager/file-manager.module';
import { CategoryTexti18nModule } from './category-texti18n/category-texti18n.module';
import { Product } from './entities/Product';
import { CategoryTextI18n } from './entities/CategoryTextI18n';
import { ProductTitle } from './entities/ProductTitle';
import { ProductDescription } from './entities/ProductDescription';
import { ProductComment } from './entities/ProductComment';
import { Article } from './entities/Article';
import { ArticleTitles } from './entities/ArticleTitles';
import { ArticleDescription } from './entities/ArticleDescription';
import { ArticleImage } from './entities/ArticleImage';
import { VisitingStats } from './entities/VisitingStats';
import { Locale } from './entities/Locale';
import { TextI18n } from './entities/TextI18n';
import { Category } from './entities/Category';
dotenv.config({ path: __dirname + '/../.env' });

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = __dirname + '../uploads';
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath); // Створюємо папку, якщо її немає
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
    TypeOrmModule.forFeature([
      Locale,
      TextI18n,
      Category,
      CategoryTextI18n,
      Product,
      ProductTitle,
      ProductDescription,
      ProductComment,
      Article,
      ArticleTitles,
      ArticleDescription,
      ArticleImage,
      VisitingStats,
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [
        Locale,
        TextI18n,
        Category,
        CategoryTextI18n,
        Product,
        ProductTitle,
        ProductDescription,
        ProductComment,
        Article,
        ArticleTitles,
        ArticleDescription,
        ArticleImage,
        VisitingStats,
      ],
      synchronize: false,
    }),
    CategoryModule,
    TextI18nModule,
    LocaleModule,
    VisitingStatsModule,
    FileManagerModule,
    CategoryTexti18nModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
