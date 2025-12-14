/*
  Warnings:

  - You are about to drop the column `quantity` on the `Sweet` table. All the data in the column will be lost.
  - Added the required column `description` to the `Sweet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Sweet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sweet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL
);
INSERT INTO "new_Sweet" ("category", "id", "name", "price") SELECT "category", "id", "name", "price" FROM "Sweet";
DROP TABLE "Sweet";
ALTER TABLE "new_Sweet" RENAME TO "Sweet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
