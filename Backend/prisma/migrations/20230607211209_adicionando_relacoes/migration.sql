-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_topics" (
    "topicID" TEXT NOT NULL PRIMARY KEY,
    "motoristaID" TEXT NOT NULL,
    "cobradorId" TEXT NOT NULL,
    "quantidadeAcentos" INTEGER NOT NULL,
    CONSTRAINT "topics_motoristaID_fkey" FOREIGN KEY ("motoristaID") REFERENCES "users" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "topics_cobradorId_fkey" FOREIGN KEY ("cobradorId") REFERENCES "users" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_topics" ("cobradorId", "motoristaID", "quantidadeAcentos", "topicID") SELECT "cobradorId", "motoristaID", "quantidadeAcentos", "topicID" FROM "topics";
DROP TABLE "topics";
ALTER TABLE "new_topics" RENAME TO "topics";
CREATE TABLE "new_routes" (
    "routeID" TEXT NOT NULL PRIMARY KEY,
    "horarioSaida" DATETIME NOT NULL,
    "horarioChegada" DATETIME NOT NULL,
    "saida" TEXT NOT NULL,
    "chegada" TEXT NOT NULL,
    "distanciaKm" REAL NOT NULL,
    "PrecoPassageiro" REAL NOT NULL,
    "PrecoCarga" REAL NOT NULL,
    "IDTopic" TEXT NOT NULL,
    CONSTRAINT "routes_IDTopic_fkey" FOREIGN KEY ("IDTopic") REFERENCES "topics" ("topicID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_routes" ("IDTopic", "PrecoCarga", "PrecoPassageiro", "chegada", "distanciaKm", "horarioChegada", "horarioSaida", "routeID", "saida") SELECT "IDTopic", "PrecoCarga", "PrecoPassageiro", "chegada", "distanciaKm", "horarioChegada", "horarioSaida", "routeID", "saida" FROM "routes";
DROP TABLE "routes";
ALTER TABLE "new_routes" RENAME TO "routes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
