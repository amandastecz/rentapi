import {Category} from "../model/Category";

// Conceito DTO => Data transfer object
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

class CategoriesRepository{
    private categories: Category[];

    constructor(){
        this.categories = [];
    }

    //As rotas não precisam conhecer o model, por isso é abstraído com uma interface
    create({ description, name }: ICreateCategoryDTO): void{
        const category = new Category();

        //função no javascript para adicionar valores em objetos
        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        })

        //adiciona no "DB"    
        this.categories.push(category);
    };

    list(): Category[]{
        return this.categories;
    };

    findByName(name: string): Category{
        const category = this.categories.find(category => category.name === name);

        return category;
    }
}

export {CategoriesRepository};