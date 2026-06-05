import { loadEnvConfig } from '@next/env';
import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const themes = [
  "SaaS & Enterprise Solutions",
  "Healthcare Innovation",
  "Education Technology (EdTech)",
  "AgriTech / Rural Innovation",
  "Smart Cities / Civic Tech",
  "FinTech"
];

const allTracks = [
  "Android / iOS Application",
  "Web Application",
  "Generative AI",
  "Machine Learning",
  "Deep Learning",
  "Windows / Mac / Linux Application",
  "Blockchain / Web3"
];

const officialTeams = [
  {
    teamCode: "BV26-001", registrationId: "UY357SQ5", teamName: "The Apex", leaderName: "Anchal Shukla", leaderEmail: "anchalshukla423@gmail.com",
    theme: "SaaS & Enterprise Solutions", tracks: ["Android / iOS Application"],
    pitchDeckUrl: "https://d8it4huxumps7.cloudfront.net/uploads/submissions/files/1485124/6a170023b0ccc_the_apex_buildverse.pdf"
  },
  {
    teamCode: "BV26-002", registrationId: "UVZ726S5", teamName: "VELZATRON", leaderName: "Parth Kushwaha", leaderEmail: "parthsinghkushwaha24@gmail.com",
    theme: "SaaS & Enterprise Solutions", tracks: ["Web Application"],
    pitchDeckUrl: "https://d8it4huxumps7.cloudfront.net/uploads/submissions/files/1485124/6a19d21dc31a8_buildverse_ppt_velzatron.pdf"
  },
  {
    teamCode: "BV26-003", registrationId: "U3WG661S", teamName: "AutoSwarmAI", leaderName: "Shubhansh Patel", leaderEmail: "patelkanha202@gmail.com",
    theme: "SaaS & Enterprise Solutions", tracks: ["Generative AI", "Machine Learning", "Deep Learning"],
    pitchDeckUrl: "https://d8it4huxumps7.cloudfront.net/uploads/submissions/files/1485124/6a19caead2b9c_autoswarmai_presentation_buildverse.pdf"
  },
  {
    teamCode: "BV26-004", registrationId: "U23K9N4H", teamName: "CodeBlooded", leaderName: "Satyam Raghuvanshi", leaderEmail: "satyamraghuvanshi220ct@gmail.com",
    theme: "SaaS & Enterprise Solutions", tracks: ["Generative AI", "Machine Learning", "Deep Learning", "Web Application", "Windows / Mac / Linux Application"],
    pitchDeckUrl: "https://d8it4huxumps7.cloudfront.net/uploads/submissions/files/1485124/6a1973e961c44_sentient_retention_engine_codeblooded.pdf"
  },
  {
    teamCode: "BV26-005", registrationId: "U0J43U3M", teamName: "Debug Dynasty", leaderName: "Harsh Audichya", leaderEmail: "harshaudichya2024@gmail.com",
    theme: "Healthcare Innovation", tracks: ["Web Application", "Generative AI", "Machine Learning", "Deep Learning"],
    pitchDeckUrl: "https://d8it4huxumps7.cloudfront.net/uploads/submissions/files/1485124/6a1696b6841c0_debug_dynastys_intellicare_ppt_for_buildverse26.pdf"
  },
  {
    teamCode: "BV26-006", registrationId: "U4958FLD", teamName: "Digital Sevaks", leaderName: "Nitin Rathore", leaderEmail: "nitinrathore56654@gmail.com",
    theme: "Healthcare Innovation", tracks: ["Web Application"],
    pitchDeckUrl: "https://d8it4huxumps7.cloudfront.net/uploads/submissions/files/1485124/6a19e0132e154_lifeline_ai.pdf"
  },
  {
    teamCode: "BV26-007", registrationId: "UWR7082M", teamName: "DevDynasty", leaderName: "Salaj Anjane", leaderEmail: "salaj9877@gmail.com",
    theme: "Education Technology (EdTech)", tracks: ["Web Application"],
    pitchDeckUrl: "https://d8it4huxumps7.cloudfront.net/uploads/submissions/files/1485124/6a19a210a0df9_devdynasty.pdf"
  },
  {
    teamCode: "BV26-008", registrationId: "U4NB804G", teamName: "Silent Syntax", leaderName: "Navneet Tripathi", leaderEmail: "navneett546@gmail.com",
    theme: "Education Technology (EdTech)", tracks: ["Web Application"],
    pitchDeckUrl: "https://d8it4huxumps7.cloudfront.net/uploads/submissions/files/1485124/6a19caf005847_silent_syntax_lnct_ppt.pdf"
  },
  {
    teamCode: "BV26-009", registrationId: "U33ZC7K9", teamName: "Syntax Squad", leaderName: "Ashish Kumar", leaderEmail: "aashukushwaha7060@gmail.com",
    theme: "Education Technology (EdTech)", tracks: ["Web Application", "Android / iOS Application"],
    pitchDeckUrl: "https://d8it4huxumps7.cloudfront.net/uploads/submissions/files/1485124/6a1915783cb6d_buildverseashish.pptx"
  },
  {
    teamCode: "BV26-010", registrationId: "UI141UT3", teamName: "FINAL COMMIT", leaderName: "Yash Barfa", leaderEmail: "yashbarfa0406@gmail.com",
    theme: "AgriTech / Rural Innovation", tracks: ["Blockchain / Web3", "Generative AI", "Machine Learning", "Deep Learning", "Android / iOS Application"],
    pitchDeckUrl: "https://d8it4huxumps7.cloudfront.net/uploads/submissions/files/1485124/6a19a62b77d33_trustchain_2.pdf"
  },
  {
    teamCode: "BV26-011", registrationId: "U3S05M1N", teamName: "The Debuggers", leaderName: "Mihir Singh", leaderEmail: "mihirsinghchouhan563@gmail.com",
    theme: "AgriTech / Rural Innovation", tracks: ["Web Application", "Generative AI", "Machine Learning", "Deep Learning"],
    pitchDeckUrl: "https://d8it4huxumps7.cloudfront.net/uploads/submissions/files/1485124/6a198f90a08b7_kisancoldchain_buildverse2026_final.pdf"
  },
  {
    teamCode: "BV26-012", registrationId: "U3VP332A", teamName: "LitSquad", leaderName: "Aman Kahar", leaderEmail: "amankaharbusiness@gmail.com",
    theme: "Smart Cities / Civic Tech", tracks: ["Web Application", "Android / iOS Application", "Generative AI", "Machine Learning", "Deep Learning"],
    pitchDeckUrl: "https://d8it4huxumps7.cloudfront.net/uploads/submissions/files/1485124/6a17a218b168c_litsquad_build_verse.pdf"
  },
  {
    teamCode: "BV26-013", registrationId: "U1M2E6Q0", teamName: "AURAGRID", leaderName: "Gunjan Gurjar", leaderEmail: "gunjangurjar9826@gmail.com",
    theme: "Smart Cities / Civic Tech", tracks: ["Web Application"],
    pitchDeckUrl: "https://d8it4huxumps7.cloudfront.net/uploads/submissions/files/1485124/6a19e132f257c_auragrid_buildverse_pdf_20260529_115808_0000.pdf"
  },
  {
    teamCode: "BV26-014", registrationId: "UKH1S727", teamName: "Cryptonites", leaderName: "Aanya Jain", leaderEmail: "aanya1407.jain@gmail.com",
    theme: "Smart Cities / Civic Tech", tracks: ["Web Application", "Blockchain / Web3", "Generative AI", "Machine Learning", "Deep Learning"],
    pitchDeckUrl: "https://d8it4huxumps7.cloudfront.net/uploads/submissions/files/1485124/6a15f59613783_citypramaan.pptx"
  },
  {
    teamCode: "BV26-015", registrationId: "U4O9K11J", teamName: "Traffic Raiders", leaderName: "Sanskar Patel", leaderEmail: "sanskar0780@gmail.com",
    theme: "Smart Cities / Civic Tech", tracks: ["Windows / Mac / Linux Application", "Generative AI", "Machine Learning", "Deep Learning"],
    pitchDeckUrl: "https://d8it4huxumps7.cloudfront.net/uploads/submissions/files/1485124/6a187fbe0d8a9_presentation1.pptx"
  },
  {
    teamCode: "BV26-016", registrationId: "UV75T2P1", teamName: "Quantum Minds", leaderName: "Akshat Shukla", leaderEmail: "garvitjaiswal12@gmail.com",
    theme: "FinTech", tracks: ["Windows / Mac / Linux Application"],
    pitchDeckUrl: "https://d8it4huxumps7.cloudfront.net/uploads/submissions/files/1485124/6a19462406065_amoghfinal.pdf"
  },
  {
    teamCode: "BV26-017", registrationId: "U8Z9Q48N", teamName: "Team Dhurandhar", leaderName: "Madhavan Singh Parihar", leaderEmail: "madhavansingh32@gmail.com",
    theme: "FinTech", tracks: ["Blockchain / Web3", "Generative AI", "Machine Learning", "Deep Learning"],
    pitchDeckUrl: "https://d8it4huxumps7.cloudfront.net/uploads/submissions/files/1686045/6a11f0e5ab87e_team_dhurandhar_buildverse_hackathon.pdf"
  },
  {
    teamCode: "BV26-018", registrationId: "UA1G63P1", teamName: "AlgoNova", leaderName: "Abhishek Sharma", leaderEmail: "abhisheksharmaa11225@gmail.com",
    theme: "FinTech", tracks: ["Web Application"],
    pitchDeckUrl: "https://d8it4huxumps7.cloudfront.net/uploads/submissions/files/1485124/6a1074a764058_lnct02.pptx"
  },
  {
    teamCode: "BV26-019", registrationId: "U087U6KM", teamName: "Mew3 India", leaderName: "Arnav Chouksey", leaderEmail: "career.arnav@gmail.com",
    theme: "FinTech", tracks: ["Blockchain / Web3"],
    pitchDeckUrl: "https://d8it4huxumps7.cloudfront.net/uploads/submissions/files/1485124/6a19e0302192d_truestamp_by_mew3_india_buildverse.pdf"
  },
  {
    teamCode: "BV26-020", registrationId: "U33XY90L", teamName: "Chai Paglu", leaderName: "Arshi Khan", leaderEmail: "arshikhan.j02@gmail.com",
    theme: "Smart Cities / Civic Tech", tracks: ["Web Application"],
    pitchDeckUrl: "https://d8it4huxumps7.cloudfront.net/uploads/submissions/files/1485124/6a194b99951de_lnct_buildverse_chaipaglu.pptx"
  }
];

const officialRounds = [
  {
    name: "ROUND_1",
    title: "Idea Evaluation",
    weighting: 0.25,
    criteria: [
      { title: "Problem / Solution", maxMarks: 5 },
      { title: "Relevance to Theme", maxMarks: 5 },
      { title: "Market Impact & Size", maxMarks: 5 },
      { title: "Project Building Roadmap", maxMarks: 5 },
      { title: "Technical Soundness & Feasibility", maxMarks: 5 }
    ]
  },
  {
    name: "ROUND_2",
    title: "Prototype Evaluation",
    weighting: 0.30,
    criteria: [
      { title: "Prototype Development", maxMarks: 5 },
      { title: "Improvement Based on Feedback", maxMarks: 5 },
      { title: "User Friendly", maxMarks: 5 },
      { title: "Team Work", maxMarks: 5 },
      { title: "System Architecture", maxMarks: 5 }
    ]
  },
  {
    name: "ROUND_3",
    title: "Final Evaluation",
    weighting: 0.45,
    criteria: [
      { title: "Performance Final Demo", maxMarks: 5 },
      { title: "Implementation or Future Scope", maxMarks: 5 }
    ]
  }
];

async function main() {
  console.log(`Starting massive official seeding ...`);

  // 1. Seed Themes
  console.log(`Seeding Themes...`);
  const themeMap = new Map();
  for (const t of themes) {
    const theme = await prisma.theme.upsert({
      where: { name: t },
      update: {},
      create: { name: t }
    });
    themeMap.set(t, theme.id);
  }

  // 2. Seed Tracks
  console.log(`Seeding Tracks...`);
  const trackMap = new Map();
  for (const t of allTracks) {
    const track = await prisma.track.upsert({
      where: { name: t },
      update: {},
      create: { name: t }
    });
    trackMap.set(t, track.id);
  }

  // 3. Seed Rounds and Criteria
  console.log(`Clearing old criteria and Seeding Evaluation Rounds...`);
  await prisma.evaluationCriterion.deleteMany({});
  for (const r of officialRounds) {
    const round = await prisma.evaluationRound.upsert({
      where: { name: r.name },
      update: {
        title: r.title,
        weighting: r.weighting,
      },
      create: {
        name: r.name,
        title: r.title,
        weighting: r.weighting,
      }
    });

    for (let i = 0; i < r.criteria.length; i++) {
      const c = r.criteria[i];
      
      const existing = await prisma.evaluationCriterion.findFirst({
        where: { roundId: round.id, title: c.title }
      });

      if (!existing) {
        await prisma.evaluationCriterion.create({
          data: {
            roundId: round.id,
            title: c.title,
            maxMarks: c.maxMarks,
            order: i
          }
        });
      } else {
        await prisma.evaluationCriterion.update({
          where: { id: existing.id },
          data: { maxMarks: c.maxMarks, order: i }
        });
      }
    }
  }

  // 4. Seed Official Finalist Teams
  console.log(`Seeding 20 Official Finalist Teams...`);
  for (const team of officialTeams) {
    const themeId = themeMap.get(team.theme);
    if (!themeId) throw new Error(`Theme not found: ${team.theme}`);

    const t = await prisma.team.upsert({
      where: { teamCode: team.teamCode },
      update: {
        registrationId: team.registrationId,
        teamName: team.teamName,
        leaderName: team.leaderName,
        leaderEmail: team.leaderEmail,
        themeId: themeId,
        pitchDeckUrl: team.pitchDeckUrl,
      },
      create: {
        teamCode: team.teamCode,
        registrationId: team.registrationId,
        teamName: team.teamName,
        leaderName: team.leaderName,
        leaderEmail: team.leaderEmail,
        themeId: themeId,
        pitchDeckUrl: team.pitchDeckUrl,
      }
    });

    // Link tracks
    for (const trackName of team.tracks) {
      const trackId = trackMap.get(trackName);
      if (trackId) {
        await prisma.teamTrack.upsert({
          where: {
            teamId_trackId: { teamId: t.id, trackId }
          },
          update: {},
          create: { teamId: t.id, trackId }
        });
      }
    }
    console.log(`Verified Team: ${t.teamCode} - ${t.teamName}`);
  }

  console.log(`Seeding finished perfectly.`);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
