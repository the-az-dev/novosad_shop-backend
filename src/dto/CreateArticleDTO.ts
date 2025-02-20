import { CreateTextI18NDTO } from "./CreateTexti18nDTO";

export class CreateArticleDTO { 
    title: CreateTextI18NDTO[];
    description: CreateTextI18NDTO[]; 
    locale: string; 
    images?: string[];
}