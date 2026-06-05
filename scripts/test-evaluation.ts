import "dotenv/config";
import prisma from '../lib/prisma';

async function testEvaluation() {
  try {
    console.log('Testing Evaluation write...');
    // Create a mock team if none exists
    const team = await prisma.team.upsert({
      where: { teamCode: 'TEST-TEAM-1' },
      update: {},
      create: {
        teamCode: 'TEST-TEAM-1',
        teamName: 'Test Innovators',
        leaderName: 'Test Leader',
        status: 'FINALIST'
      }
    });

    // Create a mock evaluator profile
    const user = await prisma.platformUser.upsert({
      where: { email: 'eval@test.com' },
      update: {},
      create: {
        clerkUserId: 'test_eval_123',
        email: 'eval@test.com',
        role: 'EVALUATOR',
        status: 'ACTIVE'
      }
    });

    const profile = await prisma.evaluatorProfile.create({
      data: { PlatformUser: { connect: { id: user.id } } }
    });

    const evalData = await prisma.evaluation.create({
      data: {
        evaluatorProfileId: profile.id,
        teamId: team.id,
        innovationScore: 85,
        technicalScore: 90,
        designScore: 80,
        presentationScore: 88,
        totalScore: 343,
        feedback: 'Great job!',
        status: 'SUBMITTED'
      }
    });

    console.log('✅ Evaluation created:', evalData);

    // Cleanup
    await prisma.evaluation.delete({ where: { id: evalData.id } });
    await prisma.evaluatorProfile.delete({ where: { id: profile.id } });
    await prisma.platformUser.delete({ where: { id: user.id } });
    await prisma.team.delete({ where: { id: team.id } });
    
    console.log('✅ Cleanup successful.');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

testEvaluation();
