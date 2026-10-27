/**
 * DDMAI COMPLETE FIRESTORE SEEDER
 * Populates all website data into Cloud Firestore:
 * - brand_profile
 * - solutions_catalog (6 items)
 * - coaching_portals (Sample approved & pending portals)
 * - webinar_leads (Sample masterclass leads)
 * - marketing_directory (16 channels)
 * - faqs (4 core Q&As)
 */

const { chromium } = require('playwright');
const path = require('path');

const localUrl = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');

const SEED_DATA = {
  brand_profile: {
    name: "Digital Direct Marketing – AI & Tech (DDMAI)",
    shortName: "DDMAI",
    tagline: "Direct Marketing Systems that Work 24/7 — Powered by Empathy, Engineered by AI.",
    founder: "Veteran PankajBhai Umesh Gupta",
    role: "Founder & Lead System Architect",
    headquarters: "Gandhinagar, Gujarat, India",
    address: "Pankajbhai Gupta Complex, Sector 14, Gandhinagar, Gujarat - 382016",
    contactMobile: "+91 9638055552",
    contactCalling: "+91 9638312311",
    email: "ddmai651@gmail.com",
    referralCode: "DDMAI-V5H4QH",
    liveHostingUrl: "https://ddmaiaffiliate.web.app",
    fiveElements: {
      jal: "72% Flow & Traffic",
      prithvi: "12% Solid Infrastructure",
      vayu: "6% Dynamic Speed & Alerts",
      agni: "4% Sales & Conversions",
      akash: "6% Scalable Cloud Expansion"
    },
    updatedAt: new Date().toISOString()
  },

  solutions_catalog: [
    {
      id: "coaching-portal-1999",
      title: "Coaching Portal System",
      category: "coaching",
      tag: "Verified Ready",
      description: "Free turnkey website portal for teachers and coaching centers. Client fills form, data hits database, admin approves in 5 mins, and page goes live instantly!",
      setupTime: "5 Minutes",
      hosting: "100% Free",
      annualFee: "₹1,999 / year",
      feeNote: "Only domain cost collected",
      rating: 4.9,
      reviewsCount: 52
    },
    {
      id: "ddmai-email-automation",
      title: "DDMAI Email Automation Engine",
      category: "email",
      tag: "Direct Market System",
      description: "Complete automated email framework: 5 pre-webinar countdown alerts + Same day followups + 11-Day Deep Nurture sequence based on pain points.",
      openRateBoost: "38% - 52% Average",
      format: "Plain text / Conversational",
      annualFee: "Masterclass Included",
      feeNote: "Personalized by pain points",
      rating: 5.0,
      reviewsCount: 120
    },
    {
      id: "business-plan-01-affiliate",
      title: "Digital Affiliate Plan (Plan 01)",
      category: "affiliate",
      tag: "Plan 01",
      description: "Low-barrier affiliate entry. One-time ₹300 Activation Pack gives 20 starter credits, unlocks your personal referral link, ₹100 direct referral, and ₹25 binary pair matching.",
      directBonus: "₹100 / referral",
      binaryMatching: "₹25 / pair",
      dailyCap: "5 Pairs Daily Cap",
      referralCode: "DDMAI-V5H4QH",
      annualFee: "₹300 One-time Activation",
      rating: 4.9,
      reviewsCount: 88
    },
    {
      id: "business-plan-02-partner",
      title: "Digital Business Partner (Plan 02)",
      category: "affiliate",
      tag: "Plan 02 High Revenue",
      description: "Create or sell approved digital courses, automation kits, e-books, and coaching resources through a marketplace revenue-sharing model.",
      sellerRoyalty: "60% (Proposed)",
      directReferralShare: "20%",
      platformShare: "20%",
      annualFee: "Free to Apply",
      rating: 4.8,
      reviewsCount: 45
    },
    {
      id: "verified-lead-matcher",
      title: "Verified Lead Matcher",
      category: "coaching",
      tag: "Anti-Spam",
      description: "No more endless chasing or wasting time on bad inquiries. Contact details remain locked and private until unlocked with 1 verified credit. Eliminates spam completely.",
      rechargePack: "₹490 / 10 Credits",
      starterBonus: "1 Free Welcome Credit",
      annualFee: "Credit-based Pay as you Go",
      rating: 4.9,
      reviewsCount: 140
    },
    {
      id: "digital-income-launchpad",
      title: "Digital Income Launchpad",
      category: "email",
      tag: "Core Offering",
      description: "The flagship program led by Veteran PankajBhai Umesh Gupta. Learn how to launch your direct marketing funnel, connect automated email engines, and generate recurring revenue.",
      host: "Veteran PankajBhai Umesh Gupta",
      nextSession: "Tonight / Upcoming",
      annualFee: "FREE Access",
      feeNote: "Instant WhatsApp Confirmation",
      rating: 5.0,
      reviewsCount: 210
    }
  ],

  coaching_portals: [
    {
      id: "apex-science-academy",
      instituteName: "Apex Science Academy",
      directorName: "Sharma Sir",
      contactPhone: "9876543210",
      city: "Gandhinagar",
      domainRequested: "apexacademy.in",
      courses: "CBSE 9-12, JEE Foundation, NEET",
      packageFee: 1999,
      status: "approved",
      referralCode: "DDMAI-V5H4QH",
      approvedBy: "Veteran PankajBhai Umesh Gupta",
      approvedAt: new Date().toISOString()
    },
    {
      id: "brightpath-coaching-academy",
      instituteName: "BrightPath Coaching Academy",
      directorName: "Sanjay Verma",
      contactPhone: "9876543211",
      city: "Ahmedabad",
      domainRequested: "brightpathacademy.in",
      courses: "Commerce 11-12, CA Foundation, Economics",
      packageFee: 1999,
      status: "approved",
      referralCode: "DDMAI-V5H4QH",
      approvedBy: "Veteran PankajBhai Umesh Gupta",
      approvedAt: new Date().toISOString()
    },
    {
      id: "scholars-learning-hub",
      instituteName: "Scholars Learning Hub",
      directorName: "Ramesh Patel",
      contactPhone: "9898012345",
      city: "Vadodara",
      domainRequested: "scholarslearning.in",
      courses: "Class 1-10 All Subjects, Spoken English",
      packageFee: 1999,
      status: "pending",
      referralCode: "DDMAI-V5H4QH",
      submittedAt: new Date().toISOString()
    }
  ],

  webinar_leads: [
    {
      name: "Ramesh Kumar Sharma",
      phone: "+91 9876543210",
      email: "ramesh.sharma@example.com",
      painPoint: "Need ₹1,999 Coaching Website Portal",
      referralCode: "DDMAI-V5H4QH",
      status: "registered",
      registeredAt: new Date().toISOString()
    },
    {
      name: "Pooja Patel",
      phone: "+91 9825012345",
      email: "pooja.patel@example.com",
      painPoint: "Want High-Showup Webinar Email System",
      referralCode: "DDMAI-V5H4QH",
      status: "registered",
      registeredAt: new Date().toISOString()
    }
  ],

  faqs: [
    {
      id: "faq-1",
      question: "How does the ₹1,999 Coaching Website Portal work?",
      answer: "We build and host the portal completely for you. You only pay ₹1,999 per year for the official domain registration and ongoing DNS integration. The multi-tenant CMS, server bandwidth, SSL security, and admin approval systems are 100% free for teachers and centers."
    },
    {
      id: "faq-2",
      question: "What is the referral code DDMAI-V5H4QH used for?",
      answer: "DDMAI-V5H4QH is the official direct partner referral code belonging to Veteran PankajBhai Umesh Gupta. Signing up through this link grants you starter unlock credits and direct mentorship access inside our Gandhinagar Digital Direct Marketing network."
    },
    {
      id: "faq-3",
      question: "What is included in the DDMAI Email Automation framework?",
      answer: "The package includes: (1) Instant Registration confirmation email, (2) 2-hour before live reminder, (3) 15-minute countdown alert, (4) 'We are Live' launch blast, (5) 20-minute join call, (6) Same-day Thank You & WhatsApp VIP invite, (7) One-click re-registration, and (8) The full 11-Day Deep Nurture sequence based on audience pain points."
    },
    {
      id: "faq-4",
      question: "How can I get remote help via TeamViewer or AnyDesk?",
      answer: "PankajBhai Umesh Gupta personally provides remote walkthrough assistance for dedicated partners. Simply message on WhatsApp (+91 9638055552) to coordinate an evening time slot."
    }
  ],

  marketing_directory: [
    { id: "whatsapp", name: "WhatsApp", category: "Messaging", url: "https://www.whatsapp.com" },
    { id: "facebook", name: "Facebook", category: "Social Networking", url: "https://www.facebook.com" },
    { id: "instagram", name: "Instagram", category: "Photo & Video", url: "https://www.instagram.com" },
    { id: "linkedin", name: "LinkedIn", category: "Professional Network", url: "https://www.linkedin.com" },
    { id: "youtube", name: "YouTube", category: "Video Sharing", url: "https://www.youtube.com" },
    { id: "telegram", name: "Telegram", category: "Messaging", url: "https://telegram.org" },
    { id: "pinterest", name: "Pinterest", category: "Image Sharing", url: "https://www.pinterest.com" },
    { id: "x-twitter", name: "X (Twitter)", category: "Microblogging", url: "https://www.x.com" }
  ]
};

async function seedAllData() {
  console.log('======================================================');
  console.log('  DDMAI FIRESTORE COMPLETE DATA POPULATION');
  console.log('  Target Database: projects/pankaj-umes-gupta/databases/(default)');
  console.log('======================================================\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('Connecting to browser and Cloud Firestore...');
  await page.goto(localUrl, { waitUntil: 'load' });
  await page.waitForTimeout(1000);

  const results = await page.evaluate(async (data) => {
    if (!window.firebase || !window.firebase.firestore) {
      return { success: false, error: "Firebase SDK not loaded in page" };
    }

    const db = window.firebase.firestore();
    const log = [];

    try {
      // 1. Seed brand_profile
      await db.collection('brand_profile').doc('main').set(data.brand_profile);
      log.push("✔ Seeded collection: brand_profile/main");

      // 2. Seed solutions_catalog (6 items)
      for (const item of data.solutions_catalog) {
        await db.collection('solutions_catalog').doc(item.id).set(item);
      }
      log.push(`✔ Seeded collection: solutions_catalog (${data.solutions_catalog.length} items)`);

      // 3. Seed coaching_portals (3 items)
      for (const portal of data.coaching_portals) {
        await db.collection('coaching_portals').doc(portal.id).set(portal);
      }
      log.push(`✔ Seeded collection: coaching_portals (${data.coaching_portals.length} portals)`);

      // 4. Seed webinar_leads (2 sample leads)
      for (const lead of data.webinar_leads) {
        await db.collection('webinar_leads').add(lead);
      }
      log.push(`✔ Seeded collection: webinar_leads (${data.webinar_leads.length} leads)`);

      // 5. Seed faqs (4 items)
      for (const faq of data.faqs) {
        await db.collection('faqs').doc(faq.id).set(faq);
      }
      log.push(`✔ Seeded collection: faqs (${data.faqs.length} Q&As)`);

      // 6. Seed marketing_directory (8 items)
      for (const item of data.marketing_directory) {
        await db.collection('marketing_directory').doc(item.id).set(item);
      }
      log.push(`✔ Seeded collection: marketing_directory (${data.marketing_directory.length} channels)`);

      return { success: true, log: log };
    } catch (e) {
      return { success: false, error: e.message, log: log };
    }
  }, SEED_DATA);

  await browser.close();

  if (results.success) {
    console.log('\x1b[32mALL FIRESTORE COLLECTIONS POPULATED SUCCESSFULLY!\x1b[0m\n');
    results.log.forEach(msg => console.log('  ' + msg));
  } else {
    console.error('\x1b[31mError populating Firestore:\x1b[0m', results.error);
    results.log.forEach(msg => console.log('  ' + msg));
    process.exit(1);
  }
}

seedAllData();
