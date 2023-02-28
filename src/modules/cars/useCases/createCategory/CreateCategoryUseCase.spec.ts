import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/inMemory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategory: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", ()=>{

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategory = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    })
    
    it("Should be able to create a new category", async ()=>{
        const category = {
            name: "Amanda", 
            description: "The creator"
        }
        await createCategory.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");

    });

    it("Should not be able to create a new category with same name", async ()=>{
        expect(async () => {
            const category = {
                name: "Amanda", 
                description: "The creator"
            }
            await createCategory.execute({
                name: category.name,
                description: category.description
            });
    
            await createCategory.execute({
                name: category.name,
                description: category.description
            });
        }).rejects.toBeInstanceOf(AppError);
    });

})