import { z } from "zod";


//CRIAR AS REGRAS PARA CADASTRO (POST) E ATUALIZAÇÃO (PUT)
export const criarExercicioValidator = z.object ({
    nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres."),
    categoria: z.string().min(3, "A categoria deve ter no mínimo 3 caracteres."),
    dificuldade: z.string().min(3, "A dificuldade deve ter no mínimo 3 caracteres."),
    equipamento: z.string().min(3, "O equipamento deve ter no mínimo 3 caracteres."),
    grupo_muscular: z.string().min(3, "O grupo muscular deve ter no mínimo 3 caracteres."),
    descricao: z.string().min(10, "A descrição deve ter no mínimo 10 caracteres."),
    series: z.number().int("O número de séries deve ser um número inteiro.").max(new Date().getFullYear()),
    repeticoes: z.number().int("O número de repetições deve ser um número inteiro.").max(new Date().getFullYear()),
    cover: z
        .string()
        .url("A capa dever ser uma URL válida")
        .optional()
        .or(z.literal(""))
        .transform((val) => (val == "" ? undefined:val)),
});

export const atualizarExercicioValidator = criarExercicioValidator.partial();