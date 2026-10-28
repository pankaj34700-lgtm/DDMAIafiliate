const fs = require('fs');

function updateFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  
  // 1. Add PWA links in <head>
  if (!content.includes('manifest.json')) {
    const headTarget = '<meta name="author" content="Veteran PankajBhai Umesh Gupta">';
    const headAddition = '<meta name="author" content="Veteran PankajBhai Umesh Gupta">\n  <!-- PWA Manifest & Mobile App Configuration -->\n  <link rel="manifest" href="/manifest.json">\n  <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">\n  <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png">\n  <link rel="apple-touch-icon" href="/icon-192.png">\n  <meta name="theme-color" content="#061B49">\n  <meta name="apple-mobile-web-app-capable" content="yes">\n  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n  <meta name="apple-mobile-web-app-title" content="DDMAI">';
    content = content.replace(headTarget, headAddition);
  }
  
  // 2. Add Service Worker registration before </script></body>
  if (!content.includes('serviceWorker.register')) {
    const scriptTarget = '</script>\r\n</body>';
    const altTarget = '</script>\n</body>';
    const swScript = '  // Register Service Worker for PWA Android App Installation\n    if (\'serviceWorker\' in navigator) {\n      window.addEventListener(\'load\', function() {\n        navigator.serviceWorker.register(\'/sw.js\')\n          .then(function(reg) { console.log(\'DDMAI PWA ServiceWorker active:\', reg.scope); })\n          .catch(function(err) { console.log(\'DDMAI ServiceWorker error:\', err); });\n      });\n    }\n  </script>\n</body>';
    if (content.includes(scriptTarget)) {
      content = content.replace(scriptTarget, swScript);
    } else {
      content = content.replace(altTarget, swScript);
    }
  }
  
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully updated:', file);
}

updateFile('D:/Open Code/DAsp/public/index.html');
updateFile('D:/Open Code/DAsp/index.html');
