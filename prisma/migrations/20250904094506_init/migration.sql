/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Entity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UserEntity` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `UserEntity_entityId_fkey` ON `userentity`;

-- DropIndex
DROP INDEX `UserEntity_userId_fkey` ON `userentity`;

-- AlterTable
ALTER TABLE `entity` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `userentity` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `UserEntity` ADD CONSTRAINT `UserEntity_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEntity` ADD CONSTRAINT `UserEntity_entityId_fkey` FOREIGN KEY (`entityId`) REFERENCES `Entity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
