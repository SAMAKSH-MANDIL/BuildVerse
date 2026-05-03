import Image from "next/image";
import { Box, BriefcaseBusiness, Coffee, MessageCircle, Network } from "lucide-react";

const img = {
  hero: "/conclave-assets/tfNtqsRwAfctVDeT3doARvKh410.png",
  about: "/conclave-assets/v5jCUO9x38vrQ3wlrsdzdkgG1A.png",
  group: "/conclave-assets/6lmSb8H78mt1qWXl46zggtzzxg.webp",
  sf: "/conclave-assets/Lk97YmyWM4Iwb5OKKEdw0kDyC8.png",
  town: "/conclave-assets/Yq2fnFgNNsUXGeJA3RiyheF4xM.png",
  townhouse: "/conclave-assets/ibDT02O8QChYK5BBVTrXbSehRHU.png",
  footer: "/conclave-assets/oPKkR9QsDfdiv2Yb8TLUMcVFCAw.png",
};

const logos = [
  { src: "/conclave-assets/5oSle4F312fYfvDtjGsG1pOdZ9M.png", alt: "GlobalBank Logo", w: 342, h: 56 },
  { src: "/conclave-assets/7lgY5VRmD6lqzyl8KOsTC3XLhd0.png", alt: "Fulcun Logo", w: 272, h: 80 },
  { src: "/conclave-assets/gdfuY85rxBOaatFJQKkykhcg4o.png", alt: "Nuri Logo", w: 237, h: 64 },
  { src: "/conclave-assets/fC4bBU6KiMncfdKIMp8MnnC9H60.png", alt: "Olofi Logo", w: 236, h: 80 },
  { src: "/conclave-assets/6LPAnKZx4M5n2cC2HDvSZQTwIkc.png", alt: "Nova Logo", w: 175, h: 42 },
  { src: "/conclave-assets/WRDE5Zb1UvCZUTliOURuScxFY.png", alt: "Company Logo", w: 154, h: 60 },
  { src: "/conclave-assets/eqvbIFyYSzbOB6Tg4vF0ssxZk.png", alt: "Mello Logo", w: 142, h: 47 },
  { src: "/conclave-assets/R6Yl6oHKOQklGfY01zWtoVIfOb0.png", alt: "Nietzsche Logo", w: 372, h: 80 },
];

const sponsorLogos = [
  ...logos.slice(0, 4),
  { src: "/conclave-assets/ba8QcWdmfJwmBEOcYZ02YZ4rIWc.png", alt: "Nietzsche Logo", w: 1834, h: 298 },
  { src: "/conclave-assets/WZXr7f02PULm7rIik64ZtJxNrU.png", alt: "Nietzsche Logo", w: 411, h: 146 },
  ...logos.slice(4),
  { src: "/conclave-assets/s6RO10DTZ2DybeJtKAdY3xjEX8.png", alt: "Nietzsche Logo", w: 362, h: 63 },
  { src: "/conclave-assets/lRtrrZKs90aQj3aV9O4sAUFhwxc.png", alt: "Nietzsche Logo", w: 468, h: 128 },
  { src: "/conclave-assets/3F9hshyzLc3kQRQn4mMSvPlJIE.png", alt: "Nietzsche Logo", w: 233, h: 40 },
  { src: "/conclave-assets/SaIJQg1NenfhLCX0W17vOvyzvzg.png", alt: "Nietzsche Logo", w: 436, h: 113 },
];

const topicCards = [
  {
    title: "Future AGI",
    text: "Explore how the brightest minds are building systems that think, reason, and create breakthroughs with us.",
    image: "/conclave-assets/NDBUROjjAZwxBZ4M6nKbHCwMQ2A.png",
  },
  {
    title: "Robotics",
    text: "Hands-on sessions with the teams engineering the autonomous machines and shaping our physical future.",
    image: "/conclave-assets/6jIZ6Eq8g3WxdxxmI0Dn8jcseec.png",
  },
  {
    title: "Space Tech",
    text: "Meet the builders launching satellites, designing orbital systems, and making space commercial.",
    image: "/conclave-assets/X8TegIXwpOTR3pL2eQQqsbxM04k.png",
  },
];

const benefits = [
  {
    title: "Frontier Access",
    text: "Sit across the table from AI founders, robotics engineers, and space-tech builders who are shaping the industries you want to break into.",
    image: "/conclave-assets/u5c9rS2D9jxVYshv4mMkP46PKRs.png",
  },
  {
    title: "Live Demos",
    text: "Pitch your project, research, or startup to investors and founders on stage real feedback, real stakes, real opportunity that shapes your future and trajectory.",
    image: "/conclave-assets/ebkqOzQSvmNNVy1aqjKv3EpP8.png",
  },
  {
    title: "Networking Opportunity",
    text: "300 hand-picked builders from 25+ countries. The people you meet here become lifelong allies.",
    image: "/conclave-assets/t0vpT8B89e0xatWYn6Fl5i4SOc0.png",
  },
  {
    title: "Build Sessions",
    text: "Skip the theory. Join workshops where you actually ship an AI agent and a hardware prototype in a day.",
    image: "/conclave-assets/TN9s6FEBD5MaqfIaUCTBeswP7i8.png",
  },
  {
    title: "Official Recognition",
    text: "Walk away with credentials and showcase wins that stand out on every application you write.",
    image: "/conclave-assets/MlVWyIPrFox3DCCUiye3C1HN9o.png",
  },
];

const speakers = [
  { name: "Soleio", role: "Founder, Genesis", day: "D a y 1", src: "/conclave-assets/kHOliUQkUgvUAJBekDzgmN50gFk.png" },
  { name: "Edina Skylar", role: "Co-Founder, Coin AI", day: "D a y 2", src: "/conclave-assets/bReA71l9zVg2hi0QgY9QO14aqI.png" },
  { name: "Marcus Sterling", role: "CEO, Global Robotics", day: "D a y 1", src: "/conclave-assets/D92zq2C2w8732WRhjpZCXpTJZk.png" },
  { name: "Ilya Savko", role: "Professor, Harvard", day: "D a y 2", src: "/conclave-assets/iEp6Mt51uskR9tE0fviElyBa4.png" },
  { name: "Dr. Aris Thorne", role: "Scientist, Neural Horizon", day: "D a y 3", src: "/conclave-assets/LyUlSCxo3eta46pjxHdZvdmoM.png" },
  { name: "Elena Vance", role: "VP, Tuska AI", day: "D a y 3", src: "/conclave-assets/LeKOIw1X3DkOtnGXpObXXvNlE.png" },
];

const scheduleDays = [
  {
    day: "DAY 1",
    date: "18TH SEP",
    place: "Hayes Valley",
    image: img.sf,
    events: [
      ["09:00", "10:00", "Opening Keynote: The Post-Prompt Era", "Exploring the transition from chatbots to autonomous agentic systems that think and act independently."],
      ["11:00", "12:00", "Workshop: Multi-Agent Swarms", "A deep dive into orchestration layers for scaling AI agents across complex enterprise environments."],
      ["18:30", "20:00", "Mixers: Founders & LLM Researchers", "An evening of high-bandwidth networking in the heart of San Francisco's AI district."],
    ],
  },
  {
    day: "DAY 2",
    date: "19TH SEP",
    place: "Soma Tech District",
    image: img.town,
    events: [
      ["09:00", "10:00", "Keynote: Giving Code a Body", "A look at the humanoid race and the engineering challenges of bringing AI into the physical world."],
      ["11:00", "12:00", "Workshop: Single-AI Operations", "Witnessing live training of robotic actuators in high-fidelity simulations before deploying."],
      ["14:00", "16:30", "Actuators and Kinetic Design", "Understanding the hardware constraints of the next generation of industrial and consumer robotics."],
      ["09:00", "10:00", "The Kinetic Forge: Prototype Night", "A rapid-prototyping session where builders showcase their latest robotic limbs and sensor arrays."],
    ],
  },
  {
    day: "DAY 3",
    date: "20TH SEP",
    place: "Civic Center",
    image: img.townhouse,
    events: [
      ["09:00", "12:00", "Session: Software-Defined Satellites", "How modular software is revolutionizing orbital infrastructure and satellite communication."],
      ["14:00", "18:00", "Launchpad: Global Student Pitch", "The top 10 student-led deep-tech startups pitch their vision to Tier-1 Silicon Valley VCs."],
      ["20:00", "22:00", "Closing Gala: Architects Award", "Final ceremony at the Palace of Fine Arts celebrating the most innovative builds of Conclave '26."],
    ],
  },
];

const joiners = [
  ["Next-Gen Builders", "Young entrepreneurs 18-26 juggling studies and startups."],
  ["International Innovators", "International delegates from any continent in the world."],
  ["Elite University Scholars", "Top university students from leading global institutions."],
  ["Ethical Visionaries", "Future leaders who wants to build humanity's future in deep tech"],
];

const privileges = [
  ["Triple-Frontier Access", "Full entry to all primary summit venues: YBCA (AI), Miner (Robotics), and the Herbst Theatre (Space)."],
  ["Investor Office Hours", "Feedback sessions with Tier-1 VCs and Deep Tech founders in exclusive small-group settings."],
  ["The Showcase Slot", "A dedicated platform to pitch your research, startup, or hardware prototype to elite peers and backers."],
  ["Sovereign Alumni Network", "Lifetime membership in a private, verified network of the world's top 300 elite student builders."],
  ["The SF Hospitality Stack", "Curated networking dinners, premium refreshments, and private transport between summit hubs."],
];

const faqs = [
  "Who can attend the Students Global Summit 2025?",
  "What is included in the participation fee?",
  "How long will each days go for?",
  "Will there be an opportunity to meet the speakers?",
  "How many attendees will be at the summit?",
];

const pricePlans = [
  {
    name: "GENERAL PASS",
    price: "$49",
    image: "/conclave-assets/NDBUROjjAZwxBZ4M6nKbHCwMQ2A.png",
    code: "ADM-049",
    features: ["Complete transportation", "Access to 5 summit sessions"],
  },
  {
    name: "VIP PASS",
    price: "$149",
    image: "/conclave-assets/TN9s6FEBD5MaqfIaUCTBeswP7i8.png",
    code: "ADM-149",
    features: ["Complete transportation", "Access to all summit sessions", "Government certification", "Innovation showcase slot"],
  },
];

const privilegeIcons = [BriefcaseBusiness, MessageCircle, Box, Network, Coffee];
const barcodeBars = [3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2, 2, 1, 4, 3, 1, 2, 1, 4, 2, 3];

function Button({ className = "" }: { className?: string }) {
  return (
    <a href="#pricing" className={`ticket-button ${className}`}>
      Get Tickets
    </a>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="section-kicker">{children}</p>;
}

function FeatureCard({
  item,
  index,
}: {
  item: { title: string; text: string; image: string };
  index: number;
}) {
  return (
    <article className="image-card" style={{ transitionDelay: `${index * 70}ms` }}>
      <Image src={item.image} alt="City Pixel background image" fill sizes="(max-width: 768px) 100vw, 33vw" />
      <div className="noise" />
      <div className="image-card-copy">
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero" id="navigation">
        <Image src={img.hero} alt="Young people looking at a portal" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-meta">
            <span>SAN FRANSICO, CA</span>
            <span>18 - 20 SEPTEMBER</span>
          </div>
          <h1>{"CONCLAVE'26"}</h1>
          <Button />
        </div>
        <div className="logo-strip">
          <p>{"Trusted by World's Biggest Startups:"}</p>
          <div className="ticker">
            {[...logos, ...logos].map((logo, index) => (
              <div className="ticker-logo" key={`${logo.src}-${index}`}>
                <Image src={logo.src} alt={logo.alt} width={logo.w} height={logo.h} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="statement-section">
        <h2>
          <span>3 DAYS. 300 BUILDERS.</span> ONE MISSION: UNIFYING THE INTELLIGENCE OF AI, THE AGENCY OF ROBOTICS, AND THE EXPLORATION OF SPACE
        </h2>
        <div className="stats-grid">
          {[
            ["200+", "Elite Builders"],
            ["0+", "Countries Represented"],
            ["0+", "Keynote Speakers"],
            ["0+", "Unicorn Founders"],
          ].map(([value, label]) => (
            <div className="stat" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="about-image">
          <Image src={img.about} alt="People listening to an event, illustrative" fill sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <div className="about-copy">
          <Kicker>ABOUT THE SUMMIT</Kicker>
          <h2>72-hour immersion into deep-tech</h2>
          <p>{"Conclave '26 brings the brightest minds to the San Francisco frontier to master the Trinity: Artificial Intelligence as the brain, Robotics as the body, and Space as the destination."}</p>
          <p>We are here to ensure that the builders of today become the architects of tomorrow.</p>
        </div>
      </section>

      <section className="content-section highlights-section">
        <div className="section-heading">
          <Kicker>HIGHLIGHTS</Kicker>
          <h2>EVENT HIGHLIGHTS</h2>
          <p>Covering all the most important topics</p>
        </div>
          <div className="feature-grid">
            <article className="feature-lead">
              <Image src={img.footer} alt="Golden Gate bridge, illustrative" fill sizes="(max-width: 900px) 100vw, 25vw" />
              <div className="feature-lead-copy">
                <h3>TOPICS THAT SHAPE THE FUTURE OF THE HUMAN RACE</h3>
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
            <Kicker>tHE GROUP</Kicker>
            <h2>WHO SHOULD JOIN</h2>
            <p>Clarifying who belongs at this summit</p>
          </div>
          <div className="join-grid">
            {joiners.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="speakers-section" id="speakers">
        <div className="speaker-heading">
          <div>
            <Kicker>THE SPEAKERS</Kicker>
            <h2>{"Leaders Guiding THE MINDS AT CONCLAVE'26"}</h2>
          </div>
          <p>Voices from front lines of intelligence, autonomy, and the orbital frontier</p>
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
      </section>

      <section className="schedule-section" id="schedule">
        <div className="section-heading">
          <Kicker>SCHEDULE</Kicker>
          <h2>THESE 3 DAYS CAN CHANGE YOUR REALITY</h2>
          <p>Where intellect meets culture and chaos.</p>
        </div>
        <div className="schedule-list">
          {scheduleDays.map((day) => (
            <article className="schedule-day" key={day.day}>
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
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-section" id="pricing">
        <div className="section-heading">
          <Kicker>PRICING</Kicker>
          <h2>TICKET PRICES</h2>
          <p>{"Secure your place at the world's premier summit on AI governance"}</p>
        </div>
        <div className="price-grid">
          {pricePlans.map((plan) => (
            <article className="price-card" key={plan.name}>
              <div className="price-card-media">
                <Image src={plan.image} alt="" fill sizes="(max-width: 768px) 100vw, 320px" />
              </div>
              <h3>{plan.name}</h3>
              <strong>{plan.price}</strong>
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
                <span>SAN FRANCISCO, CA</span>
                <span>{plan.code}</span>
                <span>12 - 15 SEP</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="privileges-section">
        <div className="privileges-intro">
          <Kicker>TICKET PRIVILEGES</Kicker>
          <h2>{"What's included in your pass"}</h2>
              <p>Every pass is a blueprint for access. We handle the friction of the city so you can focus on the future.</p>
            </div>
            <div className="privileges-list">
              {privileges.map(([title, text], index) => {
                const Icon = privilegeIcons[index];
                return (
                  <article key={title}>
                    <Icon aria-hidden="true" />
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
      </section>

      <section className="benefits-section">
        <div className="section-heading wide">
          <Kicker>{"WHAT'S IN IT FOR YOU"}</Kicker>
          <h2>WHY should you attend?</h2>
          <p>Connect with global leaders, showcase your innovation, and earn recognition that opens doors worldwide</p>
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
          <p>{"We've got all the answers ready for you"}</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq}>
              <summary>{faq}</summary>
              <p>All event details will be shared with confirmed attendees before the summit begins.</p>
            </details>
          ))}
        </div>
      </section>

      <section className="sponsors-section">
        <h2>THANKS TO OUR SPONSORS</h2>
        <div className="sponsor-grid">
          {sponsorLogos.map((logo, index) => (
            <div className="sponsor-logo" key={`${logo.src}-${index}`}>
              <Image src={logo.src} alt={logo.alt} width={logo.w} height={logo.h} />
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-section">
        <Image src={img.footer} alt="Golden gate bridge san francisco" fill sizes="100vw" />
        <div className="footer-overlay" />
        <div className="footer-content">
          <nav aria-label="Footer navigation">
            <a href="#speakers">Speakers</a>
            <a href="#schedule">Schedule</a>
            <a href="#pricing">Get Tickets</a>
          </nav>
          <h2>{"JOIN THE EVENT THAT'LL SHAPE YOUR FUTURE"}</h2>
          <div className="footer-meta">
            <div>
              <p>18th September, 2026</p>
              <span>9:00 AM</span>
            </div>
            <div className="calendar">
              <strong>SEP</strong>
              <span>18</span>
              <small>FRI</small>
            </div>
          </div>
          <Button />
          <div className="copyright">
            <span>{"\u00A9 Conclave 2026. All rights reserved."}</span>
            <a href="https://x.com/AdheebHameed">Created by Adheeb</a>
          </div>
        </div>
      </footer>

      <nav className="floating-nav" aria-label="Primary navigation">
        <a href="#speakers">Speakers</a>
        <span />
        <a href="#schedule">Schedule</a>
        <span />
        <a href="#pricing">Get Tickets</a>
      </nav>
    </main>
  );
}
