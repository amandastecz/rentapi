import request from "supertest";
import { app } from "../../../../shared/infra/http/app";

describe("Create Category Controller", () => {
    it("hello world!", async()=>{
        await request(app).get("/cars/available").expect(200);
    })
})