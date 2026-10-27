/**
 * SCRIPT: Clean old data from pankaj-umes-gupta and Seed ALL website data into ddmaiaffiliate Firestore
 */

const { chromium } = require('./playwright.cli/node_modules/playwright');
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
    firebaseProjectId: "ddmaiaffiliate",
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
      id: "lead_001",
      name: "Ramesh Kumar Sharma",
      phone: "+91 9876543210",
      email: "ramesh.sharma@example.com",
      painPoint: "Need ₹1,999 Coaching Website Portal",
      referralCode: "DDMAI-V5H4QH",
      status: "registered",
      registeredAt: new Date().toISOString()
    },
    {
      id: "lead_002",
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

async function executeMigration() {
  console.log('======================================================');
  console.log('  FIRESTORE MIGRATION TO: ddmaiaffiliate');
  console.log('======================================================\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('Connecting to browser session...');
  await page.goto(localUrl, { waitUntil: 'load' });
  await page.waitForTimeout(1000);

  const result = await page.evaluate(async (data) => {
    const log = [];

    // 1. DELETE FROM pankaj-umes-gupta (if any apps exists)
    try {
      const oldConfig = {
        apiKey: "AIzaSyA9ui7r4VqttXK_4-JbcsN0xiuJOrg-5l8",
        authDomain: "pankaj-umes-gupta.firebaseapp.com",
        projectId: "pankaj-umes-gupta",
        storageBucket: "pankaj-umes-gupta.firebasestorage.app",
        messagingSenderId: "535540715379",
        appId: "1:535540715379:web:b5bd733cf3f7acd4133f06"
      };
      
      const oldApp = window.firebase.initializeApp(oldConfig, "oldAppPankaj");
      const oldDb = oldApp.firestore();

      const collectionsToClean = ['brand_profile', 'solutions_catalog', 'coaching_portals', 'webinar_leads', 'faqs', 'marketing_directory'];
      for (const col of collectionsToClean) {
        try {
          const snapshot = await oldDb.collection(col).get();
          for (const doc of snapshot.docs) {
            await doc.ref.delete();
          }
          log.push(`✔ Cleared from pankaj-umes-gupta: ${col} (${snapshot.size} docs removed)`);
        } catch (err) {
          log.push(`ℹ pankaj-umes-gupta ${col}: ${err.message || 'clean'}`);
        }
      }
    } catch (e) {
      log.push(`Clean note: ${e.message}`);
    }

    // 2. POPULATE TO ddmaiaffiliate
    try {
      const ddmaiConfig = {
        apiKey: "AIzaSyCOSyBc3uxagaw8Sy1x7wjCd4-h9ks1t5o",
        authDomain: "ddmaiaffiliate.firebaseapp.com",
        projectId: "ddmaiaffiliate",
        storageBucket: "ddmaiaffiliate.firebasestorage.app",
        messagingSenderId: "555257342285",
        appId: "1:555257342285:web:ae23d7a64fbdacb3006f04",
        measurementId: "G-8CPQ23Y8G8"
      };

      let newApp;
      try {
        newApp = window.firebase.app("ddmaiAffiliateApp");
      } catch (err) {
        newApp = window.firebase.initializeApp(ddmaiConfig, "ddmaiAffiliateApp");
      }

      const db = newApp.firestore();

      // Seed brand_profile
      await db.collection('brand_profile').doc('main').set(data.brand_profile);
      log.push("✔ Seeded to ddmaiaffiliate: brand_profile/main");

      // Seed solutions_catalog
      for (const s of data.solutions_catalog) {
        await db.collection('solutions_catalog').doc(s.id).set(s);
      }
      log.push(`✔ Seeded to ddmaiaffiliate: solutions_catalog (${data.solutions_catalog.length} items)`);

      // Seed coaching_portals
      for (const p of data.coaching_portals) {
        await db.collection('coaching_portals').doc(p.id).set(p);
      }
      log.push(`✔ Seeded to ddmaiaffiliate: coaching_portals (${data.coaching_portals.length} portals)`);

      // Seed webinar_leads
      for (const l of data.webinar_leads) {
        await db.collection('webinar_leads').doc(l.id).set(l);
      }
      log.push(`✔ Seeded to ddmaiaffiliate: webinar_leads (${data.webinar_leads.length} leads)`);

      // Seed faqs
      for (const f of data.faqs) {
        await db.collection('faqs').doc(f.id).set(f);
      }
      log.push(`✔ Seeded to ddmaiaffiliate: faqs (${data.faqs.length} items)`);

      // Seed marketing_directory
      for (const m of data.marketing_directory) {
        await db.collection('marketing_directory').doc(m.id).set(m);
      }
      log.push(`✔ Seeded to ddmaiaffiliate: marketing_directory (${data.marketing_directory.length} channels)`);

      return { success: true, log: log };
    } catch (err) {
      return { success: false, error: err.message, log: log };
    }
  }, SEED_DATA);

  await browser.close();

  console.log('\n--- EXECUTION REPORT ---');
  result.log.forEach(l => console.log('  ' + l));
  if (result.success) {
    console.log('\n\x1b[32m✔ SUCCESS: ALL DATA HAS BEEN TRANSFERRED EXCLUSIVELY TO PROJECT: ddmaiaffiliate!\x1b[0m');
  } else {
    console.error('\n\x1b[31m✖ Error:\x1b[0m', result.error);
    process.exit(1);
  }
}

executeMigration();
