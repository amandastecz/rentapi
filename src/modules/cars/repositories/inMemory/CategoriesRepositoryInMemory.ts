import { Category } from "../../infra/typeorm/entities/Category";
import { ICategorieDTO, ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository{

    categories: Category[] = [];

    async create({ name, description }: ICategorieDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, {
            name, description
        });

        this.categories.push(category);
    }
    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(category => category.name === name);
        return category;
    }
    async list(): Promise<Category[]> {
        const all = this.categories;
        return all;
    }

}

export { CategoriesRepositoryInMemory };