import {Category} from '../model/Category'

// Conceito DTO => Data transfer object
interface ICategorieDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    create({ name, description }: ICategorieDTO): void;
    findByName(name: string): Category;
    list(): Category[];
    
}

export {ICategoriesRepository, ICategorieDTO}