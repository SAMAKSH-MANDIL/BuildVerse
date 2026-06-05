-- CreateEnum
CREATE TYPE "EvaluationStatus" AS ENUM ('DRAFT', 'SUBMITTED');

-- CreateTable
CREATE TABLE "Evaluation" (
    "id" TEXT NOT NULL,
    "evaluatorProfileId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "innovationScore" INTEGER NOT NULL,
    "technicalScore" INTEGER NOT NULL,
    "designScore" INTEGER NOT NULL,
    "presentationScore" INTEGER NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "feedback" TEXT,
    "status" "EvaluationStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Evaluation_evaluatorProfileId_teamId_key" ON "Evaluation"("evaluatorProfileId", "teamId");

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_evaluatorProfileId_fkey" FOREIGN KEY ("evaluatorProfileId") REFERENCES "EvaluatorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
