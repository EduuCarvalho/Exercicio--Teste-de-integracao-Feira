import supertest from "supertest";
import app from "../src/index";

const api = supertest(app);


describe("POST /fruits", () => {

    it("Post fruits", async () =>{
        const body = {
            name: "Manga",
            price:12
        };

        const testeStatus201 = await api.post("/fruits").send(body);
        expect(testeStatus201.status).toEqual(201);
        
        const testeStatus409 = await api.post("/fruits").send(body);
        expect(testeStatus409 .status).toEqual(409);

        const testeStatusSemPrice = await  api.post("/fruits").send({name:"teste"});
        expect( testeStatusSemPrice.status).toEqual(422);

        const testeStatusSemName = await  api.post("/fruits").send({price:12});
        expect(  testeStatusSemName.status).toEqual(422);
        
        const testeStatusFormatoPriceErrado = await  api.post("/fruits").send({price:"12"});
        expect( testeStatusFormatoPriceErrado.status).toEqual(422);

    })
   
})


describe("GET /fruits ", () => {

    it("return all objects ", async () => {
        const result = await api.get("/fruits");
        expect(result.status).toEqual(200);
        expect(result.body).toEqual(
            expect.arrayContaining([expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                price: expect.any(Number)
            }
            )
            ]
            )
        )
    }
    )
})

describe("GET BY ID /fruits/:id ", () => {

  it("return unique object", async () => {
        const result = await api.get("/fruits/1");
        expect(result.status).toEqual(200);
        expect(result.body).toEqual(expect.objectContaining({
            id:1,
            name:"Manga",
            price:12
        }))

        const resultNotFound = await api.get("/fruits/2");
        expect(resultNotFound.status).toEqual(404);
    })
})
