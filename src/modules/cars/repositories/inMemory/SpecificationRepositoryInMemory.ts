import { Specification } from "../../infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationRepository{

    specifications: Specification[] = [];

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description
        });

        this.specifications.push(specification);

        return specification;
    }

    async findByname(name: string): Promise<Specification> {
        const specification = this.specifications.find(specification => specification.name === name);

        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter(specification => ids.includes(specification.id));

        return allSpecifications;
    }

}

export { SpecificationRepositoryInMemory }