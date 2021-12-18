import { v4 as uuidv4 } from "uuid";

class Category {
    id?: string;
    name: string;
    description: string;
    created_at: Date;

    //cria ID no construtor, para reutilizar em uma edição, por exemplo e não criar um ID novo sempre que chamar o category
    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export { Category };
