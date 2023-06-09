-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_routes" (
    "routeID" TEXT NOT NULL PRIMARY KEY,
    "horarioSaida" TEXT NOT NULL,
    "horarioChegada" TEXT NOT NULL,
    "saida" TEXT NOT NULL,
    "chegada" TEXT NOT NULL,
    "distanciaKm" REAL NOT NULL,
    "PrecoPassageiro" REAL NOT NULL,
    "PrecoCarga" REAL NOT NULL,
    "IDTopic" TEXT NOT NULL,
    "quantAcentosOcupados" INTEGER NOT NULL,
    CONSTRAINT "routes_IDTopic_fkey" FOREIGN KEY ("IDTopic") REFERENCES "topics" ("topicID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_routes" ("IDTopic", "PrecoCarga", "PrecoPassageiro", "chegada", "distanciaKm", "horarioChegada", "horarioSaida", "quantAcentosOcupados", "routeID", "saida") SELECT "IDTopic", "PrecoCarga", "PrecoPassageiro", "chegada", "distanciaKm", "horarioChegada", "horarioSaida", "quantAcentosOcupados", "routeID", "saida" FROM "routes";
DROP TABLE "routes";
ALTER TABLE "new_routes" RENAME TO "routes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
