-- CreateTable
CREATE TABLE "Exercicio" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "dificuldade" TEXT NOT NULL,
    "equipamento" TEXT NOT NULL,
    "grupo_muscular" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "series" INTEGER NOT NULL,
    "repeticoes" INTEGER NOT NULL,
    "cover" TEXT NOT NULL DEFAULT 'https://placehold.co/300x450?text=No+Cover',

    CONSTRAINT "Exercicio_pkey" PRIMARY KEY ("id")
);
