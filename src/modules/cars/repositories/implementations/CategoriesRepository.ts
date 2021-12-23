import {Category} from "../../model/Category";
import {ICategoriesRepository, ICategorieDTO} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository{
    private categories: Category[];

    private static INSTANCE: CategoriesRepository;

    //deixar como privado o construtor vai fazer com que apenas essa classe possa instanciar esse repository
    private constructor(){
        this.categories = [];
    }

    //singleton
    public static getInstance(): CategoriesRepository{
        if(!CategoriesRepository.INSTANCE){
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }

        return CategoriesRepository.INSTANCE;
    }

    //As rotas não precisam conhecer o model, por isso é abstraído com uma interface
    create({ description, name }: ICategorieDTO): void{
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