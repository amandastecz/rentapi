import request from "supertest";
import { app } from "../../../../shared/infra/http/app";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";

let connection: Connection;

describe("Create Category Controller", () => {

    beforeAll(async () =>{
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidv4();
        const password = await hash("123456", 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at)
            values(
                '${id}', 'admin', 'admin@rentapi.com.br', '${password}', 'ABC123', true, 'now()'
            )`
        );

    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it("should be able to create a new category", async()=>{
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentapi.com.br",
            password: "123456"
        });

        const { refresh_token} = responseToken.body;

        const response = await request(app).post("/categories")
        .send({
            "name": "Category Supertest",
            "description": "integration test"
        }).set({
            Authorization: `Bearer ${refresh_token}`,
        });

        expect(response.status).toBe(201);
    });

    it("should not be able to create a new category if already exists", async()=>{
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentapi.com.br",
            password: "123456"
        });

        const { refresh_token} = responseToken.body;

        const response = await request(app).post("/categories")
        .send({
            "name": "Category Supertest",
            "description": "integration test"
        }).set({
            Authorization: `Bearer ${refresh_token}`,
        });

        expect(response.status).toBe(400);
    })
})