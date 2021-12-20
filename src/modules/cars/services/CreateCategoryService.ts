import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface IRequest {
    name: string;
    description: string;
}

/**
 * [X] - Definir tipo de retorno
 * [X] - Alterar o retorno de erro
 * [X] - Acessar o repositório
 */

class CreateCategoryService{

    // abstrai repository pra dar o NEW pra quem chama o service!
    constructor(private categoriesRepository: ICategoriesRepository){}

    execute({description, name}: IRequest): void{
        const categoryAlreadyExists = this.categoriesRepository.findByName(name);

        if(categoryAlreadyExists){
            // Service não conhece o request, response!
            //return response.status(400).json({error: "Category already exists!"})
            throw new Error("Category already exists!")
        };
    
        this.categoriesRepository.create({ 
            name, description 
        });
    }
}

export { CreateCategoryService };