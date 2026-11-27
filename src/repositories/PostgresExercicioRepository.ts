import prisma from "../config/db_ConnectPostgre.js";
import type {
    IExercicioRepository,
    ExercicioDTO,
    FiltroExercicioDTO,
} from "./IExercicioRepository.js";

interface ExercicioUpdateInput {
    nome?: string;
    categoria?: string;
    dificuldade?: string;
    equipamento?: string;
    grupo_muscular?: string;
    descricao?: string;
    series?: number;
    repeticoes?: number;
    cover?: string;
}

function isRecordNotFoundError(error: unknown): boolean {
    return (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code?: string }).code === "P2025"
    );
}

export class PostgresExercicioRepository implements IExercicioRepository {
    async listar(): Promise<ExercicioDTO[]> {
        return await prisma.exercicio.findMany();
    }

    async buscarPorId(id: string): Promise<ExercicioDTO | null> {
        return await prisma.exercicio.findUnique({
            where: { id },
        });
    }

    async buscarPorFiltro(filtros: FiltroExercicioDTO): Promise<ExercicioDTO[]> {
        const where: {
            nome?: string;
            categoria?: string;
            dificuldade?: string;
            grupo_muscular?: string;
        } = {};

        if (filtros.name) {
            where.nome = filtros.name;
        }

        if (filtros.category) {
            where.categoria = filtros.category;
        }

        if (filtros.muscle_group) {
            where.grupo_muscular = {
                contains: filtros.muscle_group,
                mode: "insensitive",
            };
        }

        if (filtros.difficulty) {
            where.dificuldade = {
                contains: filtros.difficulty,
                mode: "insensitive",
            };
        }

        return await prisma.exercicio.findMany({ where });
    }

    async cadastrar(dados: ExercicioDTO): Promise<ExercicioDTO> {
        return await prisma.exercicio.create({
            data: {
                nome: dados.nome,
                categoria: dados.categoria,
                dificuldade: dados.dificuldade,
                equipamento: dados.equipamento,
                grupo_muscular: dados.grupo_muscular,
                descricao: dados.descricao,
                series: Number(dados.series),
                repeticoes: Number(dados.repeticoes),
                ...(dados.cover !== undefined ? { cover: dados.cover } : {}),
            },
        });
    }

    async atualizar(id: string, dados: ExercicioDTO): Promise<ExercicioDTO | null> {
        try {
            return await prisma.exercicio.update({
                where: { id },
                data: {
                    nome: dados.nome,
                    categoria: dados.categoria,
                    dificuldade: dados.dificuldade,
                    equipamento: dados.equipamento,
                    grupo_muscular: dados.grupo_muscular,
                    descricao: dados.descricao,
                    series: Number(dados.series),
                    repeticoes: Number(dados.repeticoes),
                    ...(dados.cover !== undefined ? { cover: dados.cover } : {}),
                },
            });
        } catch (error) {
            if (isRecordNotFoundError(error)) {
                return null;
            }
            throw error;
        }
    }

    async atualizarParcial(id: string, dados: Partial<ExercicioDTO>): Promise<ExercicioDTO | null> {
        const data: ExercicioUpdateInput = {};

        if (dados.nome !== undefined) data.nome = dados.nome;
        if (dados.categoria !== undefined) data.categoria = dados.categoria;
        if (dados.dificuldade !== undefined) data.dificuldade = dados.dificuldade;
        if (dados.equipamento !== undefined) data.equipamento = dados.equipamento;
        if (dados.grupo_muscular !== undefined) data.grupo_muscular = dados.grupo_muscular;
        if (dados.descricao !== undefined) data.descricao = dados.descricao;
        if (dados.series !== undefined) data.series = Number(dados.series);
        if (dados.repeticoes !== undefined) data.repeticoes = Number(dados.repeticoes);
        if (dados.cover !== undefined) data.cover = dados.cover;

        try {
            return await prisma.exercicio.update({
                where: { id },
                data,
            });
        } catch (error) {
            if (isRecordNotFoundError(error)) {
                return null;
            }
            throw error;
        }
    }

    async deletar(id: string): Promise<boolean> {
        try {
            await prisma.exercicio.delete({
                where: { id },
            });
            return true;
        } catch (error) {
            if (isRecordNotFoundError(error)) {
                return false;
            }
            throw error;
        }
    }
}