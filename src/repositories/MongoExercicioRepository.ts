import Exercicio from "../models/exercicio.js";
import type { IExercicioRepository, ExercicioDTO, FiltroExercicioDTO } from "../repositories/IExercicioRepository.js";


export class MongoExercicioRepository implements IExercicioRepository {

    async listar(){
        return await Exercicio.find({});
    }

    async buscarPorId(id: string){
        return await Exercicio.findById(id);
    }

    async buscarPorFiltro(filtros: FiltroExercicioDTO){
        const filtro: Record<string, any> = {};

        if(filtros.name) filtro.nome = filtros.name;
        if(filtros.category) filtro.categoria = filtros.category;
        if(filtros.muscle_group) {
            filtro.grupo_muscular = { $regex: filtros.muscle_group, $options: "i" }
        };

        if(filtros.difficulty) {
            filtro.dificuldade = { $regex: filtros.difficulty, $options: "i" }
        };
        
        return await Exercicio.find(filtro);
    }

    async cadastrar(dados: ExercicioDTO){
        return await Exercicio.create({
                nome: dados.nome,
                categoria: dados.categoria,
                dificuldade: dados.dificuldade,
                equipamento: dados.equipamento,
                grupo_muscular: dados.grupo_muscular,
                descricao: dados.descricao,
                series: Number(dados.series),
                repeticoes: Number(dados.repeticoes),
                ...(dados.cover !== undefined ? { cover: dados.cover }: {}),
            });
    }

    async atualizar(id: string, dados: ExercicioDTO){
        return await Exercicio.findByIdAndUpdate(
            id,
            { $set: dados},
            { new: true }
        );
    }

    async deletar(id: string){
        const exercicioDeletado = await Exercicio.findByIdAndDelete(id);
        return Boolean(exercicioDeletado);
    }
}
