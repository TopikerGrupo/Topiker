-- CreateTable
CREATE TABLE "users" (
    "userID" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "routes" (
    "routeID" TEXT NOT NULL PRIMARY KEY,
    "horarioSaida" DATETIME NOT NULL,
    "horarioChegada" DATETIME NOT NULL,
    "saida" TEXT NOT NULL,
    "chegada" TEXT NOT NULL,
    "distanciaKm" REAL NOT NULL,
    "PrecoPassageiro" REAL NOT NULL,
    "PrecoCarga" REAL NOT NULL,
    "IDTopic" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "topics" (
    "topicID" TEXT NOT NULL PRIMARY KEY,
    "motoristaID" TEXT NOT NULL,
    "cobradorId" TEXT NOT NULL,
    "quantidadeAcentos" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");
