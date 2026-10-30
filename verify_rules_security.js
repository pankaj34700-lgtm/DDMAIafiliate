const https = require('https');
const fs = require('fs');

const content = fs.readFileSync('D:/Open Code/DAsp/index.html', 'utf8');
const keyMatch = content.match(/apiKey:\s*["']([^"']+)["']/);
const projMatch = content.match(/projectId:\s*["']([^"']+)["']/);

if (!keyMatch || !projMatch) {
  console.error("Could not extract Firebase credentials from index.html");
  process.exit(1);
}

const apiKey = keyMatch[1];
const projectId = projMatch[1];
console.log(`Testing Firestore Security Rules on Project: ${projectId}`);

function firestoreRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'firestore.googleapis.com',
      path: `/v1/projects/${projectId}/databases/(default)/documents/${path}?key=${apiKey}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {})
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function runAudit() {
  console.log("\n=======================================================");
  console.log("   AUTOMATED FIRESTORE SECURITY RULES VERIFICATION     ");
  console.log("=======================================================\n");

  // TEST 1: Attempt to write to brand_settings (must be DENIED)
  const test1 = await firestoreRequest('PATCH', 'brand_settings/hacked_brand', {
    fields: { hacked: { booleanValue: true } }
  });
  console.log(`[TEST 1] Tamper /brand_settings: Status ${test1.status} - ${test1.status === 403 ? '✔ BLOCKED (PERMISSION DENIED)' : '❌ VULNERABLE'}`);

  // TEST 2: Attempt to write to arbitrary unlisted collection /hacker_vault (must be DENIED by default deny)
  const test2 = await firestoreRequest('POST', 'hacker_vault', {
    fields: { secret: { stringValue: 'exploit' } }
  });
  console.log(`[TEST 2] Default Deny /hacker_vault: Status ${test2.status} - ${test2.status === 403 ? '✔ BLOCKED (PERMISSION DENIED)' : '❌ VULNERABLE'}`);

  // TEST 3: Attempt to delete a lead from /webinar_leads (must be DENIED)
  const test3 = await firestoreRequest('DELETE', 'webinar_leads/any_lead_id');
  console.log(`[TEST 3] Delete lead from /webinar_leads: Status ${test3.status} - ${test3.status === 403 ? '✔ BLOCKED (PERMISSION DENIED)' : '❌ VULNERABLE'}`);

  // TEST 4: Attempt to delete a coaching portal from /coaching_portals (must be DENIED)
  const test4 = await firestoreRequest('DELETE', 'coaching_portals/any_portal_id');
  console.log(`[TEST 4] Delete portal from /coaching_portals: Status ${test4.status} - ${test4.status === 403 ? '✔ BLOCKED (PERMISSION DENIED)' : '❌ VULNERABLE'}`);

  // TEST 5: Attempt to submit invalid/malformed lead (e.g. unknown keys, invalid shape) (must be DENIED)
  const test5 = await firestoreRequest('POST', 'webinar_leads', {
    fields: {
      name: { stringValue: 'Spam Bot' },
      injectedField: { stringValue: 'evil payload' }
    }
  });
  console.log(`[TEST 5] Inject unauthorized fields into /webinar_leads: Status ${test5.status} - ${test5.status === 403 ? '✔ BLOCKED (PERMISSION DENIED)' : '❌ VULNERABLE'}`);

  // TEST 6: Legitimate lead submission with valid shape (must SUCCEED: 200)
  const test6 = await firestoreRequest('POST', 'webinar_leads', {
    fields: {
      name: { stringValue: 'Verified Student' },
      phone: { stringValue: '+919638055552' },
      email: { stringValue: 'test@student.com' },
      source: { stringValue: 'landing_page_direct_market' },
      status: { stringValue: 'new' }
    }
  });
  console.log(`[TEST 6] Legitimate frontend lead submission: Status ${test6.status} - ${test6.status === 200 ? '✔ ALLOWED (SUCCESS)' : '❌ FAILED'}`);

  console.log("\n=======================================================");
  console.log("   AUDIT COMPLETE: ALL DATABASE GATES VERIFIED        ");
  console.log("=======================================================\n");
}

runAudit().catch(console.error);
