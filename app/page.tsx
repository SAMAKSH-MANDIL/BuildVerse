"use client";

import Image from "next/image";
import { Box, BriefcaseBusiness, Coffee, MessageCircle, Network } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const img = {
  hero: "/conclave-assets/tfNtqsRwAfctVDeT3doARvKh410.png",
  about: "/conclave-assets/v5jCUO9x38vrQ3wlrsdzdkgG1A.png",
  group: "/conclave-assets/6lmSb8H78mt1qWXl46zggtzzxg.webp",
  day1: "/conclave-assets/schedule-day1.jpg",
  overnight: "/conclave-assets/schedule-overnight.jpg",
  day2: "/conclave-assets/schedule-day2.jpg",
  footer: "/conclave-assets/oPKkR9QsDfdiv2Yb8TLUMcVFCAw.png",
};



const topicCards = [
  {
    title: "Web Development",
    points: [
      "Real-Time Systems: Collaborative apps like docs, whiteboards, coding platforms.",
      "API Gateway: Routing, rate limiting, monitoring for microservices.",
      "Edge Performance: CDN-like delivery and SSR optimization.",
    ],
    image: "/conclave-assets/track-webdev.svg",
  },
  {
    title: "App Development",
    points: [
      "Offline-First: Apps that work offline and sync later.",
      "Real-Time Sync: Chat and live collaboration systems.",
      "Notifications: Smart alerts and background processing.",
    ],
    image: "/conclave-assets/track-appdev.svg",
  },
  {
    title: "AI/ML/Data Science",
    points: [
      "RAG Systems: AI assistants using document retrieval.",
      "Multi-Agent AI: Agents automating workflows collaboratively.",
      "Time-Series: Prediction systems for finance/weather/sales.",
    ],
    image: "/conclave-assets/track-aiml.svg",
  },
  {
    title: "Web3/Blockchain",
    points: [
      "Decentralized Identity: Wallet-based authentication systems.",
      "Smart Contracts: Voting, escrow, marketplaces.",
      "DAO Governance: Community voting and proposals.",
    ],
    image: "/conclave-assets/track-web3.svg",
  },
  {
    title: "Cybersecurity",
    points: [
      "Authentication: Secure login and MFA systems.",
      "Threat Detection: Log analysis and intrusion detection.",
      "Zero Trust: Access control and verification systems.",
    ],
    image: "/conclave-assets/track-cybersecurity.svg",
  },
  {
    title: "Agritech/Rural",
    points: [
      "Crop Intelligence: Yield prediction and advisory systems.",
      "Supply Chain: Farm-to-market logistics platforms.",
      "Climate Systems: Weather and risk dashboards.",
    ],
    image: "/conclave-assets/track-agritech.svg",
  },
  {
    title: "FinTech",
    points: [
      "Fraud Detection: Transaction monitoring and alerts.",
      "Payments: Gateway and transaction systems.",
      "Financial Analytics: Expense and investment tracking.",
    ],
    image: "/conclave-assets/track-fintech.svg",
  },
];

const benefits = [
  {
    title: "National Visibility",
    text: "Compete on a pan-India platform designed to position LNCT as a serious innovation hub for student builders.",
    image: "/conclave-assets/u5c9rS2D9jxVYshv4mMkP46PKRs.png",
  },
  {
    title: "Product-First Culture",
    text: "Move beyond surface-level prototypes and build solutions judged on architecture, feasibility, user value, and execution.",
    image: "/conclave-assets/ebkqOzQSvmNNVy1aqjKv3EpP8.png",
  },
  {
    title: "Mentor Access",
    text: "Get feedback through mentor interactions, technical reviews, jury evaluations, and final presentation rounds.",
    image: "/conclave-assets/t0vpT8B89e0xatWYn6Fl5i4SOc0.png",
  },
  {
    title: "Startup Pathways",
    text: "Create opportunities for internships, placements, startup visibility, and industry-academia collaboration.",
    image: "/conclave-assets/TN9s6FEBD5MaqfIaUCTBeswP7i8.png",
  },
  {
    title: "BuildVerse Community",
    text: "Join a long-term builder community built around deep-tech, product thinking, and real-world problem solving.",
    image: "/conclave-assets/MlVWyIPrFox3DCCUiye3C1HN9o.png",
  },
];

// const speakers = [
//   { name: "Mentor Interactions", role: "Technical and product guidance during the finale", day: "Finale", src: "/conclave-assets/kHOliUQkUgvUAJBekDzgmN50gFk.png" },
//   { name: "Jury Evaluation", role: "Deep review of innovation, feasibility, and execution", day: "Review", src: "/conclave-assets/bReA71l9zVg2hi0QgY9QO14aqI.png" },
//   { name: "Architecture Review", role: "Assessment of scalability and system design quality", day: "Tech", src: "/conclave-assets/D92zq2C2w8732WRhjpZCXpTJZk.png" },
//   { name: "Product Thinking", role: "Evaluation of user value, usability, and market relevance", day: "Build", src: "/conclave-assets/iEp6Mt51uskR9tE0fviElyBa4.png" },
//   { name: "Final Presentation", role: "Pitching, communication, and demo quality", day: "Pitch", src: "/conclave-assets/LyUlSCxo3eta46pjxHdZvdmoM.png" },
//   { name: "Builder Community", role: "BuildVerse network for long-term collaboration", day: "Grow", src: "/conclave-assets/LeKOIw1X3DkOtnGXpObXXvNlE.png" },
// ];

const scheduleDays = [
  {
    day: "DAY 1",
    date: "6TH JUNE",
    place: "LNCT Campus",
    image: img.day1,
    events: [
      ["08:00", "08:30", "Registration & Reporting", "Teams arrive at LNCT Campus, complete reporting, and get ready for the opening block."],
      ["09:00", "09:30", "Inauguration Ceremony", "The national-level hackathon begins with the event vision, structure, and welcome address."],
      ["09:30", "10:00", "Rules Briefing & Instructions", "Participants receive the rules, judging flow, submission expectations, and execution guidelines."],
      ["10:00", "13:15", "Hackathon Begins", "Teams start building their solutions across deep-tech tracks."],
      ["14:00", "17:30", "Development Session", "Focused product building, architecture decisions, and prototype development."],
      ["18:00", "20:00", "Judging & Mentorship Round 1", "Mentors and evaluators review progress, guide teams, and test early execution depth."],
    ],
  },
  {
    day: "OVERNIGHT",
    date: "7TH JUNE",
    place: "Build Sprint",
    image: img.overnight,
    events: [
      ["01:15", "02:00", "Jamming / Entertainment", "A short energy reset before the overnight development push."],
      ["02:00", "04:30", "Development Continues", "Teams keep building, debugging, and validating their prototypes through the night."],
      ["04:30", "06:00", "Judging Round 2", "A second technical review checks progress, clarity, feasibility, and execution under pressure."],
      ["07:00", "07:45", "Breakfast", "Teams regroup before entering the final development block."],
    ],
  },
  {
    day: "DAY 2",
    date: "7TH JUNE",
    place: "Finale",
    image: img.day2,
    events: [
      ["07:45", "12:00", "Final Development Session", "Teams refine features, fix issues, and prepare the final product submission."],
      ["13:00", "15:00", "Final Preparation & Submission", "Submission window for pitch material, prototype links, architecture, and team details."],
      ["15:00", "17:00", "Final Judging Round", "Jury evaluates innovation, technical depth, product thinking, scalability, and presentation quality."],
      ["17:00", "18:00", "Results & Prize Distribution", "Final results, recognitions, and closing ceremony for the top-performing teams."],
    ],
  },
];

const joiners = [
  ["Student Builders", "Students ready to solve real-world problems with serious technical execution."],
  ["Developers & Designers", "Teams who can build usable products, interfaces, systems, and working prototypes."],
  ["Startup-Minded Teams", "Participants thinking beyond demos toward scalability, market value, and adoption."],
  ["Problem Solvers", "Builders interested in AI, web, apps, cybersecurity, blockchain, agritech, healthcare, and games."],
];

const privileges = [
  ["Hybrid Selection Process", "Round 1 filters serious, technically capable teams through online submissions before the offline finale."],
  ["30-Hour Offline Finale", "Top 20 shortlisted teams build live at LNCT Campus in a continuous high-pressure environment."],
  ["Mentor & Jury Access", "Participants receive feedback through mentor interactions, technical reviews, and final judging rounds."],
  ["Deep Evaluation", "Teams are judged on innovation, problem impact, architecture, feasibility, scalability, UI/UX, and presentation."],
  ["Opportunities & Community", "The event supports internships, networking, startup visibility, and long-term BuildVerse builder growth."],
];

type EventStat =
  | {
      kind: "number";
      value: number;
      suffix?: string;
      label: string;
    }
  | {
      kind: "text";
      value: string;
      label: string;
    };

const eventStats: EventStat[] = [
  { kind: "number", value: 250, suffix: "+", label: "Expected Participation" },
  { kind: "number", value: 20, label: "Finalist Teams" },
  { kind: "number", value: 30, label: "Continuous Hours" },
  { kind: "text", value: "India", label: "Pan India Reach" },
];

const faqs = [
  ["Who can participate in the hackathon?", "Students, developers, designers, and builder teams from across India can participate through the online selection process."],
  ["What is the event format?", "The hackathon has an online submission round followed by a 30-hour offline grand finale for shortlisted teams."],
  ["What should teams submit in Round 1?", "Teams should submit a problem statement, pitch deck, proposed solution, prototype or MVP if available, technical architecture, and team details."],
  ["How many teams reach the offline finale?", "The final shortlisted pool is planned for the Top 20 teams."],
  ["Where will the grand finale happen?", "The 30-hour offline grand finale will take place at LNCT Campus, Bhopal."],
  ["Is a female team member compulsory?", "No, having a female member in the team is not compulsory."],
  ["Is Aadhaar card required for registration?", "Yes, Aadhaar card is compulsory for registration. Participants must bring it with them."],
  ["Is solo participation allowed?", "No, solo participation is not allowed. Teams must have 2 - 4 members."],
  ["Will participants get a place to stay?", "Yes, participant stay will be arranged for the hackathon duration, from 6th to 7th June."],
];

const partners = [
  ["KLIC-AIIC", "Kalchuri Incubation Centre and Anupam Incubation and Innovation Centre lead the organising body."],
  ["LNCT Hackathon Club", "The collaboration partner supporting hackathon execution, community, and builder outreach."],
  ["HighKernel", "The technology collaboration partner supporting scalable software, AI-driven systems, and deep-tech solutions for real-world problems."],
];

const pricePlans = [
  {
    name: "Registration",
    price: "₹500",
    image: "/conclave-assets/TN9s6FEBD5MaqfIaUCTBeswP7i8.png",
    code: "FINALE-20",
    features: ["Team Size : 2 - 4 Members", "Meals provided during the event", "Registration Fees : ₹500 Per Team"],
  },
];

const privilegeIcons = [BriefcaseBusiness, MessageCircle, Box, Network, Coffee];
const barcodeBars = [3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2, 2, 1, 4, 3, 1, 2, 1, 4, 2, 3];

function Button({ className = "" }: { className?: string }) {
  return (
    <motion.a 
      href="#register" 
      className={`ticket-button ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Register Now
    </motion.a>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <motion.p 
      className="section-kicker"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.p>
  );
}

function CountUpStat({ stat, index }: { stat: EventStat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center 55%"],
  });
  const [displayValue, setDisplayValue] = useState(
    stat.kind === "number" ? `0${stat.suffix ?? ""}` : stat.value
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (stat.kind !== "number") {
      return;
    }

    setDisplayValue(`${Math.round(stat.value * latest)}${stat.suffix ?? ""}`);
  });

  return (
    <motion.div
      ref={ref}
      className="stat"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <strong>{displayValue}</strong>
      <span>{stat.label}</span>
    </motion.div>
  );
}

function FeatureCard({
  item,
  index,
}: {
  item: { title: string; text?: string; points?: string[]; image: string };
  index: number;
}) {
  return (
    <motion.article 
      className="image-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Image src={item.image} alt="City Pixel background image" fill sizes="(max-width: 768px) 100vw, 33vw" />
      <div className="noise" />
      <div className="image-card-copy">
        <h3>{item.title}</h3>
        {item.points ? (
          <ul className="track-points">
            {item.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        ) : (
          <p>{item.text}</p>
        )}
      </div>
    </motion.article>
  );
}

export default function Home() {
  const [showNav, setShowNav] = useState(false);
  const privilegesListRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: privilegesLineProgress } = useScroll({
    target: privilegesListRef,
    offset: ["start 80%", "end 45%"],
  });

  useEffect(() => {
    const handleScroll = () => setShowNav(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main>
      <section className="hero" id="navigation">
        <Image src={img.hero} alt="Young people looking at a portal" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-image-effect" aria-hidden="true" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-meta">
            <span>LNCT CAMPUS, BHOPAL</span>
            <span>6 - 7 JUNE</span>
          </div>
          <h1 className="hero-title">BUILDVERSE</h1>
          <Button />
        </div>
        <div className="trusted-strip" aria-label="Trusted partners">
          <p>Trusted By World&apos;s Biggest Startups:</p>
          <div className="trusted-marquee">
            <div className="trusted-logo-row">
              {["Nietzsche", "GlobalBank", "Fulcon", "NURI", "Orbit"].map((name) => (
                <span className={`trusted-wordmark trusted-wordmark-${name.toLowerCase()}`} key={name}>
                  <i aria-hidden="true" />
                  {name}
                </span>
              ))}
              {["Nietzsche", "GlobalBank", "Fulcon", "NURI", "Orbit"].map((name) => (
                <span className={`trusted-wordmark trusted-wordmark-${name.toLowerCase()}`} key={`${name}-copy`}>
                  <i aria-hidden="true" />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="statement-section">
        <h2 className="scroll-fill-text">30 HOURS. TOP 20 TEAMS. ONE MISSION: BUILDING DEEP-TECH PRODUCTS THAT SOLVE REAL-WORLD PROBLEMS</h2>
        <div className="stats-grid">
          {eventStats.map((stat, index) => (
            <CountUpStat stat={stat} index={index} key={stat.label} />
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="about-image-bg">
          <Image src={img.about} alt="People listening to an event, illustrative" fill sizes="100vw" priority />
          <div className="about-overlay" />
        </div>
        <div className="about-shell">
          <div className="about-left">
            <Kicker>ABOUT THE SUMMIT</Kicker>
            <h2>30-HOUR IMMERSION INTO DEEP-TECH</h2>
          </div>
          <div className="about-right">
            <p>Buildverse &apos;26 brings the brightest minds to the frontier of innovation to master the Trinity: Artificial Intelligence as the brain, Robotics as the body, and Space as the destination.</p>
            <p>We are here to ensure that the builders of today become the architects of tomorrow.</p>
          </div>
        </div>
      </section>

      <section className="content-section highlights-section">
          <div className="section-heading">
            <Kicker>HIGHLIGHTS</Kicker>
            <h2>HACKATHON TRACKS</h2>
            <p>High-impact themes selected for current industry relevance</p>
          </div>
          <div className="feature-grid">
            <article className="feature-lead">
              <Image src={img.footer} alt="Golden Gate bridge, illustrative" fill sizes="(max-width: 900px) 100vw, 25vw" />
              <div className="feature-lead-copy">
                <h3>CORE THEMES / TRACKS</h3>
              </div>
          </article>
          {topicCards.map((item, index) => (
            <FeatureCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </section>

      <section className="join-section">
        <Image src={img.group} alt="Builders gathered under a glowing sky" fill sizes="100vw" />
        <div className="join-overlay" />
        <div className="join-shell">
          <div className="section-heading">
            <Kicker>THE BUILDERS</Kicker>
            <h2>WHO SHOULD JOIN</h2>
            <p>For teams ready to build, validate, and present real solutions</p>
          </div>
          <div className="join-grid">
            {joiners.map(([title, text], index) => (
              <motion.article 
                key={title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="speakers-section" id="speakers">
        <div className="speaker-heading">
          <div>
            <Kicker>MENTORS & JURY</Kicker>
            <h2>DEEP EVALUATION FOR SERIOUS BUILDERS</h2>
          </div>
          <p>Every team is evaluated on innovation, architecture, feasibility, scalability, usability, and presentation quality</p>
        </div>
        <div className="speakers-grid">
          {speakers.map((speaker) => (
            <article className="speaker-card" key={speaker.name}>
              <div className="speaker-image">
                <Image src={speaker.src} alt={`Portrait of ${speaker.name}`} fill sizes="(max-width: 768px) 50vw, 16vw" />
                <span className="speaker-day-badge">{speaker.day.replaceAll(" ", "")}</span>
              </div>
              <h3>{speaker.name}</h3>
              <span>{speaker.role}</span>
            </article>
          ))}
        </div>
      </section> */}

      <section className="schedule-section" id="schedule">
        <div className="section-heading">
          <Kicker>SCHEDULE</Kicker>
          <h2>30 HOURS OF BUILDING, REVIEW, AND FINAL PITCHES</h2>
          <p>Offline grand finale structure for shortlisted teams</p>
        </div>
        <div className="schedule-list">
          {scheduleDays.map((day, index) => (
            <motion.article 
              className="schedule-day" 
              key={day.day}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="schedule-image">
                <Image src={day.image} alt={day.place} fill sizes="(max-width: 900px) 100vw, 32vw" />
              </div>
              <div className="schedule-copy">
                <div className="schedule-head">
                  <div>
                    <h3>{day.day}</h3>
                    <strong>{day.date}</strong>
                  </div>
                  <span>{day.place}</span>
                </div>
                <div className="event-list">
                  {day.events.map(([start, end, title, text]) => (
                    <div className="event-row" key={`${day.day}-${title}`}>
                      <div className="event-time">
                        <span>{start}</span>
                        <span>-</span>
                        <span>{end}</span>
                      </div>
                      <div>
                        <h4>{title}</h4>
                        <p>{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="pricing-section" id="register">
        <div className="section-heading">
          <Kicker>SELECTION PROCESS</Kicker>
          <h2>HOW TEAMS ENTER THE FINALE</h2>
          <p>Hybrid selection process followed by a 30-hour offline grand finale for shortlisted teams</p>
        </div>
        <div className="price-grid">
          {pricePlans.map((plan, index) => (
            <motion.article 
              className="price-card" 
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="price-card-media">
                <Image src={plan.image} alt="" fill sizes="(max-width: 768px) 100vw, 320px" />
              </div>
              <h3>{plan.name}</h3>
              <strong>{plan.price}</strong>
              <p className="price-unit">Per Team</p>
              <p>Includes:</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Button />
              <div className="barcode" aria-hidden="true">
                {barcodeBars.map((width, index) => (
                  <i key={`${plan.code}-${index}`} style={{ width }} />
                ))}
              </div>
              <div className="ticket-meta">
                <span>LNCT BHOPAL</span>
                <span>{plan.code}</span>
                <span>6 - 7 JUNE</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="privileges-section">
        <div className="privileges-intro">
          <Kicker>EVENT STRUCTURE</Kicker>
          <h2>What teams experience</h2>
          <p>A serious builder environment designed for real product development, deep technical review, and long-term innovation outcomes.</p>
            </div>
            <div className="privileges-list" ref={privilegesListRef}>
              <motion.div
                aria-hidden="true"
                className="privileges-progress-line"
                style={{ scaleY: privilegesLineProgress }}
              />
              {privileges.map(([title, text], index) => {
                const Icon = privilegeIcons[index];
                return (
                  <motion.article 
                    key={title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Icon aria-hidden="true" />
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
      </section>

      <section className="benefits-section">
        <div className="section-heading wide">
          <Kicker>{"WHAT'S IN IT FOR YOU"}</Kicker>
          <h2>WHY participate?</h2>
          <p>{"Build, validate, present, and connect inside one of Bhopal's flagship national-level innovation platforms"}</p>
        </div>
        <div className="benefits-grid">
          {benefits.map((item, index) => (
            <FeatureCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </section>

      <section className="faq-section">
        <div className="section-heading">
          <Kicker>{"FAQ's"}</Kicker>
          <h2>GOT QUESTIONS?</h2>
          <p>Quick answers for teams preparing their submissions</p>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <motion.details 
              key={question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <summary>{question}</summary>
              <p>{answer}</p>
            </motion.details>
          ))}
        </div>
      </section>

      <section className="sponsors-section">
        <h2>ORGANISING ECOSYSTEM</h2>
        <div className="sponsor-grid">
          {partners.map(([name, text], index) => (
            <motion.article 
              className="partner-card" 
              key={name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <h3>{name}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <footer className="footer-section" id="footer">
        <Image src={img.footer} alt="Golden gate bridge san francisco" fill sizes="100vw" />
        <div className="footer-overlay" />
        <div className="footer-content">
          <nav aria-label="Footer navigation">
            <a href="#schedule">Schedule</a>
            <a href="#register">Register</a>
          </nav>
          <h2>BUILD WHAT BECOMES YOUR FUTURE</h2>
          <div className="footer-meta">
            <div>
              <p>6th - 7th June</p>
              <span>LNCT Campus, Bhopal</span>
            </div>
            <div className="calendar">
              <strong>JUN</strong>
              <span>6</span>
              <small>DAY 1</small>
            </div>
          </div>
          <Button />
          <div className="collab-logo-row footer-collab-logo-row" aria-label="Collaboration partners">
            <div className="collab-logo klic-logo">
              <Image src="/collab-assets/klic_bigger.png" alt="KLIC" fill loading="eager" sizes="(max-width: 640px) 315px, 430px" />
            </div>
            <div className="collab-logo lnct-logo">
              <Image src="/collab-assets/lnct_bigger.png" alt="LNCT" fill loading="eager" sizes="(max-width: 640px) 315px, 430px" />
            </div>
            <div className="collab-logo anupam-logo">
              <Image src="/collab-assets/anupam_bigger.png" alt="Anupam" fill loading="eager" sizes="(max-width: 640px) 315px, 430px" />
            </div>
            <div className="collab-logo highkernel-logo">
              <Image src="/collab-assets/HighKernel_clean.png" alt="HighKernel" fill loading="eager" sizes="(max-width: 640px) 270px, 310px" />
            </div>
          </div>
          <div className="copyright">
            <span>{"\u00A9 BuildVerse Hackathon. All rights reserved."}</span>
            <a href="#navigation">KLIC-AIIC x LNCT Hackathon Club x HighKernel</a>
          </div>
        </div>
      </footer>

      <nav className={`floating-nav${showNav ? " visible" : ""}`} aria-label="Primary navigation">
        <a href="#schedule">Schedule</a>
        <span />
        <a href="#register">Register</a>
      </nav>
    </main>
  );
}
