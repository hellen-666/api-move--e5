import express from "express";
import type { Request, Response } from "express";
import Exercicio, { type InterExercicio } from "./models/exercicio.js";

// export interface Exercicio {
//     id: number;
//     nome: string;
//     categoria: string;
//     dificuldade: string;
// }

const app = express();


//MIDDLEWARE
app.use(express.json());
app.set("json spaces", 2);

// const exercicios = [
//     {
//         id: 1,
//         nome: "Agachamento livre",
//         categoria: "Pernas",
//         dificuldade: "Fácil"
//     },

//     {
//         id: 2,
//         nome: "Elevação lateral",
//         categoria: "Ombros",
//         dificuldade: "Médio"
//     },

//     {
//         id: 3,
//         nome: "Abdominal",
//         categoria: "Abdômen",
//         dificuldade: "Médio"
//     },
// ]


//FUNÇÕES

// function buscaExercicio(id: string | number): number {
//     return exercicios.findIndex(exercicio => {
//         return exercicio.id === Number(id);
//     });
// }


//REQUISIÇÕES

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Codificação BackEnd");
});

//REQUISIÇÃO POST (CADASTRAR NOVO EXERCICIO)
app.post("/exercicios", async (req: Request<{},{},InterExercicio>, res: Response) => {
});

// REQUISIÇÃO PUT (ATUALIZAR DADOS)
app.put("/exercicios/:id", async (req: Request<{id: string},{},InterExercicio>, res: Response) => {
});

//REQUISIÇÃO PATCH (ATUALIZAR PARCIALMENTE DADOS)
app.patch("/exercicios/:id", async (req: Request<{id: string},{},InterExercicio>, res: Response) => {
});

//REQUISIÇÃO DELETE (REMOVER DADOS)
app.delete("/exercicios/:id", async (req: Request<{id: string}>, res: Response) => {
});

export default app;