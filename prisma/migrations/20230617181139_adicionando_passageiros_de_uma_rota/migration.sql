-- CreateTable
CREATE TABLE "_RouteToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_RouteToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "routes" ("routeID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RouteToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users" ("userID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_RouteToUser_AB_unique" ON "_RouteToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RouteToUser_B_index" ON "_RouteToUser"("B");
