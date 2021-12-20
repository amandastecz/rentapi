import {Category} from '../model/Category'

// Conceito DTO => Data transfer object
interface ICategorieDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    create({ description, name }: ICategorieDTO): void;
    list(): Category[];
    findByName(name: string): Category;
    
}

export {ICategoriesRepository, ICategorieDTO}