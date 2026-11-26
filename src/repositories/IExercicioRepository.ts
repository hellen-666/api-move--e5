export interface ExercicioDTO {
    id?: number;
    nome: string;
    categoria: string;
    dificuldade: string;
    equipamento: string;
    grupo_muscular: string;
    descricao: string;
    series: number;
    repeticoes: number;
    cover?: string | undefined;
}

export interface FiltroExercicioDTO {
    name?: string;
    category?: string;
    muscle_group?: string;
    difficulty?: string;
}

export interface IExercicioRepository {
    listar(): Promise<ExercicioDTO[]>;
    buscarPorId(id: string): Promise<ExercicioDTO | null>;
    buscarPorFiltro(filtros: FiltroExercicioDTO): Promise<ExercicioDTO[]>;
    cadastrar(dados: ExercicioDTO): Promise<ExercicioDTO>;
    atualizar(id: string, dados: ExercicioDTO): Promise<ExercicioDTO | null>;
    atualizarParcial(id: string, dados: Partial<ExercicioDTO>): Promise<ExercicioDTO | null>;
    deletar(id: string): Promise<boolean>;
}