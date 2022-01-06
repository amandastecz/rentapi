import { Specification } from "../../model/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationsRepository";

class SpecificationRepository implements ISpecificationRepository{

    private specifications: Specification[];

    constructor(){
        this.specifications = [];
    }

    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_At: new Date(),
        });

        this.specifications.push(specification);
    }

    findByname(name: string): Specification {
        const specification = this.specifications.find(specification => specification.name === name);
        return specification;
    }
}

export {SpecificationRepository}