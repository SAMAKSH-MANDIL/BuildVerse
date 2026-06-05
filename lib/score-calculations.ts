import prisma from '@/lib/prisma';
import { EvaluationRound, Evaluation } from '../generated/prisma';

export type TeamScoreData = {
  teamId: string;
  teamCode: string;
  teamName: string;
  theme: string;
  roundScores: Record<string, { averageScore: number; evaluatorCount: number; maxMarks: number; rawAverage: number }>;
  finalScore: number;
  rank: number;
  isDisqualified: boolean;
};

export async function calculateLeaderboard(): Promise<TeamScoreData[]> {
  // 1. Fetch rounds for their weightings and max marks
  const rounds = await prisma.evaluationRound.findMany({
    include: { criteria: true }
  });
  
  const roundMap = new Map<string, { weighting: number, maxMarks: number, name: string }>();
  for (const r of rounds) {
    const maxMarks = r.criteria.reduce((sum, c) => sum + c.maxMarks, 0);
    roundMap.set(r.id, { weighting: r.weighting, maxMarks, name: r.name });
  }

  // 2. Fetch teams and their SUBMITTED evaluations and overrides
  const teams = await prisma.team.findMany({
    include: {
      theme: true,
      evaluations: {
        where: {
          status: { in: ['SUBMITTED', 'LOCKED'] }
        }
      }
    }
  });

  const scoreData: TeamScoreData[] = [];

  for (const team of teams) {
    if (team.disqualified) {
      scoreData.push({
        teamId: team.id,
        teamCode: team.teamCode,
        teamName: team.teamName,
        theme: team.theme?.name || 'Unspecified',
        roundScores: {},
        finalScore: 0,
        rank: 999,
        isDisqualified: true
      });
      continue;
    }

    const roundScores: Record<string, { averageScore: number; evaluatorCount: number; maxMarks: number; rawAverage: number }> = {};
    let finalScore = 0;

    // Group evaluations by round
    for (const round of rounds) {
      const roundEvals = team.evaluations.filter(e => e.roundId === round.id);
      const rData = roundMap.get(round.id)!;
      
      let averageScore = 0;
      if (roundEvals.length > 0) {
        const total = roundEvals.reduce((sum, e) => sum + e.totalScore, 0);
        averageScore = total / roundEvals.length;
      }
      
      // Calculate weighted score: (Average / Max Marks) * 100 * Weighting
      // Example: 20/25 -> 80% -> 80 * 0.25 = 20 points for final score
      let weightedScore = 0;
      if (rData.maxMarks > 0) {
        weightedScore = (averageScore / rData.maxMarks) * 100 * rData.weighting;
      }

      roundScores[round.name] = {
        averageScore: weightedScore, // Weighted portion added to final
        rawAverage: averageScore,    // Out of max marks
        evaluatorCount: roundEvals.length,
        maxMarks: rData.maxMarks
      };

      finalScore += weightedScore;
    }

    scoreData.push({
      teamId: team.id,
      teamCode: team.teamCode,
      teamName: team.teamName,
      theme: team.theme?.name || 'Unspecified',
      roundScores,
      finalScore: parseFloat(finalScore.toFixed(2)),
      rank: 0,
      isDisqualified: false
    });
  }

  // 3. Sort and assign ranks
  scoreData.sort((a, b) => {
    if (a.isDisqualified) return 1;
    if (b.isDisqualified) return -1;
    
    if (b.finalScore !== a.finalScore) {
      return b.finalScore - a.finalScore;
    }
    
    // Tie-breaker: Round 3 (Final Demo) weighted score
    const aR3 = a.roundScores['ROUND_3']?.averageScore || 0;
    const bR3 = b.roundScores['ROUND_3']?.averageScore || 0;
    if (bR3 !== aR3) return bR3 - aR3;
    
    // Tie-breaker: Round 2 (Prototype) weighted score
    const aR2 = a.roundScores['ROUND_2']?.averageScore || 0;
    const bR2 = b.roundScores['ROUND_2']?.averageScore || 0;
    if (bR2 !== aR2) return bR2 - aR2;

    return 0;
  });

  // Assign ranks
  let currentRank = 1;
  for (let i = 0; i < scoreData.length; i++) {
    if (i > 0 && scoreData[i].finalScore < scoreData[i - 1].finalScore) {
      currentRank = i + 1;
    }
    scoreData[i].rank = scoreData[i].isDisqualified ? 999 : currentRank;
  }

  return scoreData;
}
