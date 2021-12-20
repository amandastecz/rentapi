import express from "express";
import { categoriesRoutes } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specification.route";

const app = express();

app.use(express.json());

// Passando a route dessa forma, significa que todas os routers categories terão essa rota
app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationsRoutes);

app.listen(3333, () => console.log("O Server tá on!"));
