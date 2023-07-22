import { Connection, createConnection } from "typeorm";
import { app } from "../../../../shared/infra/http/app";
import request from "supertest";
import { v4 as uuidv4 } from "uuid";

let connection: Connection

describe("List Categories Controller", ()=>{
    beforeAll(async ()=>{
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidv4();

        await connection.query(
            `INSERT INTO CATEGORIES(id, name, description, created_at)
            values ('${id}', 'Integration test', 'by Stecz', 'now()')`
        )
    });

    it("should be able to list all categories", async ()=>{
        const response = await request(app).get("/categories");
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");

        console.log(response.body)
    })
    
    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })
})