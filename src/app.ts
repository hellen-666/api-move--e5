import express from "express";
import type { Request, Response } from "express";
import exercicioRoutes from "./routes/exercicioRoutes.js"

const app = express();

//MIDDLEWARE
app.use(express.json());
app.set("json spaces", 2);

//ROTA BASE
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Move+ - Academy");
});

//REGISTRAR AS ROTAS DE "EXERCÍCIOS" NA APLICAÇÃO
app.use(exercicioRoutes);

export default app;