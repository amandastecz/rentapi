import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../../../repositories/ISpecificationsRepository";

class SpecificationRepository implements ISpecificationRepository{
    private repository: Repository<Specification>;

    constructor(){
        this.repository = getRepository(Specification);
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = await this.repository.create({
            description,
            name,
        });

        await this.repository.save(specification);

        return specification;
    }

    async findByname(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({
            name,
        });
        return specification;
    }

    
    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids);

        return specifications;
    }
}

export {SpecificationRepository}