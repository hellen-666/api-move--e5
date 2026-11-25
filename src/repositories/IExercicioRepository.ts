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
    listar(): Promise<any[]>;
    buscarPorId(id: string): Promise<any | null>;
    buscarPorFiltro(filtros: FiltroExercicioDTO): Promise<any[]>;
    cadastrar(dados: ExercicioDTO): Promise<any[]>;
    atualizar(id: string, dados: ExercicioDTO): Promise<any[]>;
    atualizarParcial(id: string, dados: Partial<ExercicioDTO>): Promise<any[] | null>;
    deletar(id: string): Promise<boolean>;
}