import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";
import { createConnection } from "typeorm";

async function create(){
    const connection = await createConnection("database");

    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at)
        values(
            '${id}', 'admin', 'admin@rentapi.com.br', 'ABC5577', '${password}', true, 'now()'
        )`
    );

    await connection.close();
}

create().then(() => console.log("user admin created by seed"));
