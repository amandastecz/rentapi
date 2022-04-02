import {Category} from '../entities/Category'

// Conceito DTO => Data transfer object
interface ICategorieDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    create({ name, description }: ICategorieDTO): Promise<void>;
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    
}

export {ICategoriesRepository, ICategorieDTO}