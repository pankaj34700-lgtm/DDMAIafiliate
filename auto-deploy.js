/**
 * DDMAI AUTO-DEPLOY FILE WATCHER
 * Automatically deploys your website to Firebase (ddmaiaffiliate) whenever you save any file!
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const rootDir = __dirname;
const indexPath = path.join(rootDir, 'index.html');
const publicDir = path.join(rootDir, 'public');
const assetsDir = path.join(rootDir, 'assets');

let isDeploying = false;
let deployTimeout = null;

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function deployToFirebase() {
  if (isDeploying) return;
  isDeploying = true;

  console.log(`\n\x1b[36m[${new Date().toLocaleTimeString()}] Changes detected! Preparing auto-deployment...\x1b[0m`);

  // 1. Sync index.html and assets to public/
  try {
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
    fs.copyFileSync(indexPath, path.join(publicDir, 'index.html'));
    copyRecursiveSync(assetsDir, path.join(publicDir, 'assets'));
    console.log(`  ✔ Synced production files to public/`);
  } catch (err) {
    console.error(`  ✖ Sync error:`, err.message);
    isDeploying = false;
    return;
  }

  // 2. Run Firebase Deploy
  console.log(`  🚀 Deploying to Firebase ID: \x1b[33mddmaiaffiliate\x1b[0m ...`);
  const deployCmd = `firebase deploy --only hosting --project ddmaiaffiliate`;

  exec(deployCmd, { cwd: rootDir }, (error, stdout, stderr) => {
    isDeploying = false;
    if (error) {
      console.error(`  \x1b[31m✖ Deployment Failed:\x1b[0m`, error.message);
      return;
    }
    console.log(`  \x1b[32m✔ DEPLOY SUCCESSFUL!\x1b[0m`);
    console.log(`  🌐 Live Website: \x1b[34mhttps://ddmaiaffiliate.web.app\x1b[0m`);
    console.log(`  Watching for next changes... (Ctrl + S in OpenCode / Notepad)\n`);
  });
}

function triggerDebouncedDeploy(filename) {
  console.log(`[Event] File modified: ${filename}`);
  if (deployTimeout) clearTimeout(deployTimeout);
  deployTimeout = setTimeout(() => {
    deployToFirebase();
  }, 1500); // Wait 1.5s after user stops typing/saving
}

console.log('======================================================');
console.log('  DDMAI LIVE AUTO-DEPLOY WATCHER (ddmaiaffiliate)');
console.log('  Target: https://ddmaiaffiliate.web.app');
console.log('======================================================');
console.log('👀 Watching for file changes in:');
console.log('  - index.html');
console.log('  - assets/ folder');
console.log('\nWhenever you save (Ctrl + S), it will auto-deploy!\n');

// Watch index.html
fs.watch(indexPath, (eventType, filename) => {
  if (eventType === 'change') {
    triggerDebouncedDeploy('index.html');
  }
});

// Watch assets folder
if (fs.existsSync(assetsDir)) {
  fs.watch(assetsDir, { recursive: true }, (eventType, filename) => {
    triggerDebouncedDeploy(`assets/${filename}`);
  });
}
