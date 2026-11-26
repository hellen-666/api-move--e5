import Exercicio from "../models/exercicio.js";
import type {
    IExercicioRepository,
    ExercicioDTO,
    FiltroExercicioDTO
} from "../repositories/IExercicioRepository.js";

export class MongoExercicioRepository implements IExercicioRepository {

    async listar(): Promise<ExercicioDTO[]> {
        return await Exercicio.find({}).lean<ExercicioDTO[]>();
    }

    async buscarPorId(id: string): Promise<ExercicioDTO | null> {
        return await Exercicio.findById(id).lean<ExercicioDTO>();
    }

    async buscarPorFiltro(filtros: FiltroExercicioDTO): Promise<ExercicioDTO[]> {
        const filtro: Record<string, any> = {};

        if (filtros.name) {
            filtro.nome = { $regex: filtros.name, $options: "i" };
        }

        if (filtros.category) {
            filtro.categoria = filtros.category;
        }

        if (filtros.muscle_group) {
            filtro.grupo_muscular = {
                $regex: filtros.muscle_group,
                $options: "i"
            };
        }

        if (filtros.difficulty) {
            filtro.dificuldade = {
                $regex: filtros.difficulty,
                $options: "i"
            };
        }

        return await Exercicio.find(filtro).lean<ExercicioDTO[]>();
    }

async cadastrar(dados: ExercicioDTO): Promise<ExercicioDTO> {
    const exercicio = await Exercicio.create({
        nome: dados.nome,
        categoria: dados.categoria,
        dificuldade: dados.dificuldade,
        equipamento: dados.equipamento,
        grupo_muscular: dados.grupo_muscular,
        descricao: dados.descricao,
        series: Number(dados.series),
        repeticoes: Number(dados.repeticoes),
        ...(dados.cover !== undefined ? { cover: dados.cover } : {}),
    });

    return {
        nome: dados.nome,
        categoria: dados.categoria,
        dificuldade: dados.dificuldade,
        equipamento: dados.equipamento,
        grupo_muscular: dados.grupo_muscular,
        descricao: dados.descricao,
        series: Number(dados.series),
        repeticoes: Number(dados.repeticoes),
        ...(dados.cover !== undefined ? { cover: dados.cover } : {}),
    };
}

    async atualizar(id: string, dados: ExercicioDTO): Promise<ExercicioDTO | null> {
        return await Exercicio.findByIdAndUpdate(
            id,
            { $set: dados },
            { new: true }
        ).lean<ExercicioDTO>();
    }

    async atualizarParcial(
        id: string,
        dados: Partial<ExercicioDTO>
    ): Promise<ExercicioDTO | null> {
        return await Exercicio.findByIdAndUpdate(
            id,
            { $set: dados },
            { new: true }
        ).lean<ExercicioDTO>();
    }

    async deletar(id: string): Promise<boolean> {
        const exercicioDeletado = await Exercicio.findByIdAndDelete(id);
        return Boolean(exercicioDeletado);
    }
}
