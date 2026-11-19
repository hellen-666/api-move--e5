export const swaggerDocument = {
openapi: "3.0.0",
info: {
    title: "API de Exercícios",
    version: "1.0.0",
    description: "Documentação completa da API RESTful para gerenciamento de exercícios físicos.",
},
servers: [
    {
    url: "http://localhost:3000",
    description: "Servidor de Desenvolvimento",
    },
],
tags: [
    {
    name: "Exercícios",
    description: "Operações de CRUD e filtragem de exercícios",
    },
],
components: {
    schemas: {
    ExercicioInput: {
        type: "object",
        required: [
        "nome",
        "categoria",
        "dificuldade",
        "equipamento",
        "grupo_muscular",
        "descricao",
        "series",
        "repeticoes",
        ],
        properties: {
        nome: {
            type: "string",
            minLength: 3,
            description: "Nome do exercício (mínimo 3 caracteres)",
            example: "Supino Reto com Barra",
        },
        categoria: {
            type: "string",
            minLength: 3,
            description: "Categoria do treino (mínimo 3 caracteres)",
            example: "Musculação",
        },
        dificuldade: {
            type: "string",
            minLength: 3,
            description: "Nível de dificuldade (mínimo 3 caracteres)",
            example: "Intermediário",
        },
        equipamento: {
            type: "string",
            minLength: 3,
            description: "Equipamento necessário (mínimo 3 caracteres)",
            example: "Barra e Banco Reto",
        },
        grupo_muscular: {
            type: "string",
            minLength: 3,
            description: "Grupo muscular principal trabalhado (mínimo 3 caracteres)",
            example: "Peitoral",
        },
        descricao: {
            type: "string",
            minLength: 10,
            description: "Instruções detalhadas de execução (mínimo 10 caracteres)",
            example: "Deite-se no banco reto, segure a barra na largura dos ombros e desça até tocar o peito.",
        },
        series: {
            type: "integer",
            maximum: new Date().getFullYear(),
            description: "Quantidade de séries recomendadas",
            example: 4,
        },
        repeticoes: {
            type: "integer",
            maximum: new Date().getFullYear(),
            description: "Quantidade de repetições por série",
            example: 12,
        },
        cover: {
            type: "string",
            format: "uri",
            nullable: true,
            description: "URL válida para imagem de capa do exercício (opcional ou string vazia)",
            example: "https://exemplo.com/imagens/supino-reto.jpg",
        },
        },
    },
    ExercicioPartialInput: {
        type: "object",
        properties: {
        nome: {
            type: "string",
            minLength: 3,
            example: "Supino Inclinado com Halteres",
        },
        categoria: {
            type: "string",
            minLength: 3,
            example: "Hipertrofia",
        },
        dificuldade: {
            type: "string",
            minLength: 3,
            example: "Avançado",
        },
        equipamento: {
            type: "string",
            minLength: 3,
            example: "Halteres e Banco Inclinado",
        },
        grupo_muscular: {
            type: "string",
            minLength: 3,
            example: "Peitoral Superior",
        },
        descricao: {
            type: "string",
            minLength: 10,
            example: "Ajuste o banco a 45 graus e empurre os halteres para cima controlando a descida.",
        },
        series: {
            type: "integer",
            maximum: new Date().getFullYear(),
            example: 3,
        },
        repeticoes: {
            type: "integer",
            maximum: new Date().getFullYear(),
            example: 10,
        },
        cover: {
            type: "string",
            format: "uri",
            nullable: true,
            example: "https://exemplo.com/imagens/supino-inclinado.jpg",
        },
        },
    },
    ExercicioResponse: {
        allOf: [
        {
            type: "object",
            properties: {
            _id: {
                type: "string",
                description: "Identificador único gerado pelo MongoDB",
                example: "665f1a2b3c4d5e6f7a8b9c0d",
            },
            },
        },
        { $ref: "#/components/schemas/ExercicioInput" },
        {
            type: "object",
            properties: {
            __v: {
                type: "integer",
                example: 0,
            },
            },
        },
        ],
    },
    MensagemErro: {
        type: "object",
        properties: {
        mensagem: {
            type: "string",
        },
        },
    },
    ErroValidacao: {
        type: "object",
        properties: {
        mensagem: {
            type: "string",
            example: "Erro de validação nos dados enviados.",
        },
        erros: {
            type: "array",
            items: {
            type: "object",
            properties: {
                campo: {
                type: "string",
                example: "nome",
                },
                mensagem: {
                type: "string",
                example: "O nome deve ter no mínimo 3 caracteres.",
                },
            },
            },
        },
        },
    },
    },
    parameters: {
    ExercicioIdParam: {
        name: "id",
        in: "path",
        required: true,
        description: "ID do exercício no banco de dados (MongoDB ObjectId)",
        schema: {
        type: "string",
        example: "665f1a2b3c4d5e6f7a8b9c0d",
        },
    },
    },
},
paths: {
    "/exercicio": {
    get: {
        tags: ["Exercícios"],
        summary: "Listar todos os exercícios",
        description: "Retorna uma lista com todos os exercícios cadastrados no banco de dados.",
        responses: {
        "200": {
            description: "Lista de exercícios retornada com sucesso.",
            content: {
            "application/json": {
                schema: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/ExercicioResponse",
                },
                },
            },
            },
        },
        "500": {
            description: "Erro interno do servidor ao listar exercícios.",
            content: {
            "application/json": {
                schema: {
                $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                mensagem: "Erro ao buscar exercício",
                },
            },
            },
        },
        },
    },
    post: {
        tags: ["Exercícios"],
        summary: "Cadastrar um novo exercício",
        description: "Valida os dados com Zod e cria um novo registro de exercício no banco de dados.",
        requestBody: {
        required: true,
        content: {
            "application/json": {
            schema: {
                $ref: "#/components/schemas/ExercicioInput",
            },
            },
        },
        },
        responses: {
        "201": {
            description: "Exercício cadastrado com sucesso.",
            content: {
            "application/json": {
                schema: {
                type: "object",
                properties: {
                    mensagem: {
                    type: "string",
                    example: "Exercício cadastrado com sucesso!",
                    },
                    exercicio: {
                    $ref: "#/components/schemas/ExercicioResponse",
                    },
                },
                },
            },
            },
        },
        "400": {
            description: "Dados inválidos enviados no corpo da requisição.",
            content: {
            "application/json": {
                schema: {
                $ref: "#/components/schemas/ErroValidacao",
                },
            },
            },
        },
        "500": {
            description: "Erro interno do servidor ao cadastrar exercício.",
            content: {
            "application/json": {
                schema: {
                $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Erro ao cadastrar exercício.",
                },
              },
            },
          },
        },
      },
    },
    "/exercicio/busca": {
      get: {
        tags: ["Exercícios"],
        summary: "Buscar exercícios por filtros",
        description:
          "Filtra exercícios com base nos parâmetros opcionais fornecidos na query string. Busca exata para nome e categoria; busca parcial case-insensitive para grupo muscular e dificuldade.",
        parameters: [
          {
            name: "name",
            in: "query",
            required: false,
            description: "Filtra pelo nome exato do exercício",
            schema: {
              type: "string",
              example: "Supino Reto com Barra",
            },
          },
          {
            name: "category",
            in: "query",
            required: false,
            description: "Filtra pela categoria exata do exercício",
            schema: {
              type: "string",
              example: "Musculação",
            },
          },
          {
            name: "muscle_group",
            in: "query",
            required: false,
            description: "Filtra por grupo muscular (busca parcial, case-insensitive)",
            schema: {
              type: "string",
              example: "peito",
            },
          },
          {
            name: "difficulty",
            in: "query",
            required: false,
            description: "Filtra pelo nível de dificuldade (busca parcial, case-insensitive)",
            schema: {
              type: "string",
              example: "intermediário",
            },
          },
        ],
        responses: {
          "200": {
            description: "Lista de exercícios filtrados retornada com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/ExercicioResponse",
                  },
                },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor ao aplicar filtros.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Erro ao filtrar.",
                },
              },
            },
          },
        },
      },
    },
    "/exercicio/{id}": {
      get: {
        tags: ["Exercícios"],
        summary: "Buscar exercício por ID",
        description: "Retorna os detalhes de um exercício específico a partir de seu ID.",
        parameters: [
          {
            $ref: "#/components/parameters/ExercicioIdParam",
          },
        ],
        responses: {
          "200": {
            description: "Exercício encontrado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ExercicioResponse",
                },
              },
            },
          },
          "404": {
            description: "Exercício não encontrado para o ID informado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Exercício não encontrado.",
                },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor ao buscar o exercício por ID.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Erro ao buscar o exercício por ID.",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Exercícios"],
        summary: "Atualizar exercício por completo",
        description: "Substitui todos os campos de um exercício existente com validação completa via Zod.",
        parameters: [
          {
            $ref: "#/components/parameters/ExercicioIdParam",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ExercicioInput",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Exercício atualizado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: {
                      type: "string",
                      example: "Exercício atualizado com sucesso!",
                    },
                    exercicio: {
                      $ref: "#/components/schemas/ExercicioResponse",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Dados inválidos enviados no corpo da requisição.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacao",
                },
              },
            },
          },
          "404": {
            description: "Exercício não encontrado para o ID informado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Exercício não encontrado.",
                },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor ao atualizar o exercício.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Erro ao atualizar exercício.",
                },
              },
            },
          },
        },
      },
      patch: {
        tags: ["Exercícios"],
        summary: "Atualizar exercício parcialmente",
        description: "Atualiza apenas os campos enviados no corpo da requisição, validados parcialmente pelo Zod.",
        parameters: [
          {
            $ref: "#/components/parameters/ExercicioIdParam",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ExercicioPartialInput",
              },
              example: {
                series: 5,
                repeticoes: 8,
                dificuldade: "Avançado",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Exercício atualizado parcialmente com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: {
                      type: "string",
                      example: "Exercício atualizado com sucesso!",
                    },
                    exercicio: {
                      $ref: "#/components/schemas/ExercicioResponse",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Dados inválidos enviados no corpo da requisição.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacao",
                },
              },
            },
          },
          "404": {
            description: "Exercício não encontrado para o ID informado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Exercício não encontrado!",
                },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor ao atualizar parcialmente o exercício.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Erro ao atualizar parcialmente o exercício.",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Exercícios"],
        summary: "Remover exercício",
        description: "Remove permanentemente um exercício do banco de dados a partir de seu ID.",
        parameters: [
          {
            $ref: "#/components/parameters/ExercicioIdParam",
          },
        ],
        responses: {
          "200": {
            description: "Exercício removido com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: {
                      type: "string",
                      example: "Exercício removido com sucesso!",
                    },
                },
                },
            },
            },
        },
        "404": {
            description: "Exercício não encontrado para o ID informado.",
            content: {
            "application/json": {
                schema: {
                $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                mensagem: "Exercício não encontrado!",
                },
            },
            },
        },
        "500": {
            description: "Erro interno do servidor ao remover o exercício.",
            content: {
            "application/json": {
                schema: {
                $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                mensagem: "Erro ao remover exercício.",
                },
            },
            },
        },
        },
    },
    },
},
} as const;