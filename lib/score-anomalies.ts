import prisma from '@/lib/prisma';

export type Anomaly = {
  teamId: string;
  teamCode: string;
  roundName: string;
  type: 'HIGH_VARIANCE' | 'MISSING_FEEDBACK' | 'IDENTICAL_SCORING';
  description: string;
  severity: 'HIGH' | 'MEDIUM';
};

export async function detectAnomalies(): Promise<Anomaly[]> {
  const anomalies: Anomaly[] = [];

  const teams = await prisma.team.findMany({
    include: {
      evaluations: {
        where: { status: { in: ['SUBMITTED', 'LOCKED'] } },
        include: {
          scores: { include: { criterion: true } },
          evaluator: { include: { PlatformUser: true } }
        }
      }
    }
  });

  for (const team of teams) {
    // Group evaluations by round
    const roundGroups = team.evaluations.reduce((acc, ev) => {
      acc[ev.roundId] = acc[ev.roundId] || [];
      acc[ev.roundId].push(ev);
      return acc;
    }, {} as Record<string, typeof team.evaluations>);

    for (const [roundId, evals] of Object.entries(roundGroups)) {
      if (evals.length < 2) continue; // Variance requires at least 2 evaluators

      const totalScores = evals.map(e => e.totalScore);
      const minScore = Math.min(...totalScores);
      const maxScore = Math.max(...totalScores);
      const variance = maxScore - minScore;

      // > 20 marks variance is considered high
      if (variance >= 20) {
        anomalies.push({
          teamId: team.id,
          teamCode: team.teamCode,
          roundName: 'Round ' + evals[0].roundId, // Will resolve name in UI
          type: 'HIGH_VARIANCE',
          description: `Evaluators gave scores with a gap of ${variance} marks (${minScore} vs ${maxScore}).`,
          severity: 'HIGH'
        });
      }

      // Check for identical scoring (suspicious if exactly the same across multiple evaluators)
      if (variance === 0 && evals.length >= 2) {
        anomalies.push({
          teamId: team.id,
          teamCode: team.teamCode,
          roundName: 'Round ' + evals[0].roundId,
          type: 'IDENTICAL_SCORING',
          description: `Multiple evaluators gave the exact same total score (${minScore} marks).`,
          severity: 'MEDIUM'
        });
      }
    }
  }

  return anomalies;
}
