-- DropForeignKey
ALTER TABLE `course` DROP FOREIGN KEY `Course_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `courseenrollment` DROP FOREIGN KEY `CourseEnrollment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `quiz` DROP FOREIGN KEY `Quiz_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `quizattempt` DROP FOREIGN KEY `QuizAttempt_userId_fkey`;

-- DropForeignKey
ALTER TABLE `wiki` DROP FOREIGN KEY `Wiki_authorId_fkey`;

-- DropIndex
DROP INDEX `Course_authorId_fkey` ON `course`;

-- DropIndex
DROP INDEX `Project_authorId_fkey` ON `project`;

-- DropIndex
DROP INDEX `Quiz_authorId_fkey` ON `quiz`;

-- DropIndex
DROP INDEX `QuizAttempt_userId_fkey` ON `quizattempt`;

-- DropIndex
DROP INDEX `Wiki_authorId_fkey` ON `wiki`;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wiki` ADD CONSTRAINT `Wiki_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseEnrollment` ADD CONSTRAINT `CourseEnrollment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuizAttempt` ADD CONSTRAINT `QuizAttempt_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
