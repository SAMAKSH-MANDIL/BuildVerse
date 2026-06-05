import 'dotenv/config';
import prisma from '../lib/prisma';

async function main() {
  console.log('Starting evaluation reset...');

  try {
    // We will do this in a transaction to ensure everything or nothing gets reset
    await prisma.$transaction(async (tx) => {
      // 1. Delete all detailed evaluation data
      console.log('Deleting feedbacks...');
      await tx.evaluationFeedback.deleteMany({});
      
      console.log('Deleting criterion scores...');
      await tx.criterionScore.deleteMany({});
      
      console.log('Deleting score overrides...');
      await tx.scoreOverride.deleteMany({});

      // 2. Delete parent evaluations and assignments
      console.log('Deleting evaluations...');
      await tx.evaluation.deleteMany({});
      
      console.log('Deleting assignments...');
      await tx.evaluatorAssignment.deleteMany({});
      
      console.log('Deleting round results...');
      await tx.roundResult.deleteMany({});

      // 3. Delete Audit Logs to clean the slate
      console.log('Deleting audit logs...');
      await tx.auditLog.deleteMany({});

      // 4. Reset Team fields (scores, ranks, round statuses)
      console.log('Resetting team statuses and scores...');
      await tx.team.updateMany({
        data: {
          finalScore: null,
          finalRank: null,
          award: null,
          round1Status: 'NOT_STARTED',
          round2Status: 'NOT_STARTED',
          round3Status: 'NOT_STARTED',
        }
      });

      // 5. Reset EvaluationRound statuses to PENDING
      console.log('Resetting round statuses...');
      await tx.evaluationRound.updateMany({
        data: {
          status: 'PENDING',
          startTime: null,
          endTime: null,
        }
      });
    });

    console.log('✅ Successfully reset all marks, evaluations, and assignments!');
    console.log('✅ Teams, Users, Roles, Themes, and Criteria remain intact.');
  } catch (error) {
    console.error('❌ Error resetting evaluations:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
