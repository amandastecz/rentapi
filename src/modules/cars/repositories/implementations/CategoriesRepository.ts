import { getRepository, Repository } from "typeorm";
import {Category} from "../../entities/Category";
import {ICategoriesRepository, ICategorieDTO} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository{

    private repository: Repository<Category>;
    
    //deixar como privado o construtor vai fazer com que apenas essa classe possa instanciar esse repository
    constructor(){
        this.repository = getRepository(Category);
    }

    //As rotas não precisam conhecer o model, por isso é abstraído com uma interface
    async create({ description, name }: ICategorieDTO): Promise<void>{
        const category = this.repository.create({
            description,
            name
        });

        //adiciona no "DB"    
        await this.repository.save(category)
    };

    async list(): Promise<Category[]>{
        const categories = await this.repository.find();
        return categories; 
    };

    async findByName(name: string): Promise<Category>{
        // select * from categories where name = "name" limit 1
        const category = await this.repository.findOne({ name });
        return category;
    }
}

export {CategoriesRepository};