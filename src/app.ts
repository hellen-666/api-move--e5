import express from "express";
import type { Request, Response } from "express";

export interface Exercicio {
    id: number;
    nome: string;
    categoria: string;
    dificuldade: string;
}

const app = express();


//MIDDLEWARE
app.use(express.json());

const exercicios = [
    {
        id: 1,
        nome: "Agachamento livre",
        categoria: "Pernas",
        dificuldade: "Fácil"
    },

    {
        id: 2,
        nome: "Elevação lateral",
        categoria: "Ombros",
        dificuldade: "Médio"
    },

    {
        id: 3,
        nome: "Abdominal",
        categoria: "Abdômen",
        dificuldade: "Médio"
    },
]


//FUNÇÕES
function buscaExercicio(id: string | number): number {
    return exercicios.findIndex(exercicio => {
        return exercicio.id === Number(id);
    });
}


//REQUISIÇÕES
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Codificação BackEnd");
});

app.get("/exercicios", (req: Request, res: Response) => {
    res.status(200).json(exercicios);
});


//REQUISIÇÃO POST (CADASTRAR NOVO EXERCICIO)
app.post("/exercicios", (req: Request, res: Response) => {
    const { id, nome, categoria, dificuldade } = req.body;

    const novoExercicio: Exercicio = {
        id: Number(id),
        nome,
        categoria,
        dificuldade,
    };

    exercicios.push(novoExercicio);

    res.status(201).json({
        mensagem: "Exercício cadastrado com sucesso!",
        exercicio: novoExercicio
    });
});


// REQUISIÇÃO PUT (ATUALIZAR DADOS)
app.put("/exercicios/:id", (req: Request, res: Response) => {
    const index = buscaExercicio(String(req.params.id));

    if (index === -1) {
        res.status(404).json({ mensagem: "Exercício não encontrado!" });
        return;
    }

    const { nome, categoria, dificuldade } = req.body;

    exercicios[index] = {
        ...exercicios[index]!,
        nome,
        categoria,
        dificuldade,
    };

    res.status(200).json({
        mensagem: "Exercício atualizado com sucesso!",
        exercicio: exercicios[index]
    });
});


//REQUISIÇÃO PATCH (ATUALIZAR PARCIALMENTE DADOS)
app.patch("/exercicios/:id", (req: Request, res: Response) => {
    const index = buscaExercicio(String(req.params.id));

    if(index === -1){
        res.status(404).json({mensagem: "Exercício não encontrado!"});
        return;
    }

    const { nome, categoria, dificuldade } = req.body;

    exercicios[index] = {
        ...exercicios[index]!,
        ...(nome !== undefined && { nome }),
        ...(categoria !== undefined && { categoria }),
        ...(dificuldade !== undefined && { dificuldade })
    };

    res.status(200).json({
        mensagem: "Exercício atualizado com sucesso!",
        exercicio: exercicios[index]
    });
});

//REQUISIÇÃO DELETE (REMOVER DADOS)
app.delete("/exercicios/:id", (req: Request, res: Response) => {
    const index = buscaExercicio(String(req.params.id));

    if (index === -1){
        res.status(404).json({mensagem: "Exercício não encontrado!"});
        return;
    }

    //Remove o exercicio do array base (exercicio) com base no índice (id)
    exercicios.splice(index,1);

    res.status(200).json({
        mensagem: "Exercício removido com sucesso!",
    });
});

export default app;