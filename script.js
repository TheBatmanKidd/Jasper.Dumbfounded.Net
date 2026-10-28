const heading = document.getElementById('jasper');
heading.innerHTML = heading.textContent
  .split('')
  .map((letter, index) => {
    const delay = index * 0.15; 
    return `<span style="animation-delay: ${delay}s">${letter}</span>`;
  })
  .join('');



// updator
const CHECK_INTERVAL = 1500;
const FILES_TO_CHECK = ['/index.html', '/style.css', '/index.js'];

let initialFileFingerprints = {};

async function getFileFingerprint(url) {
    try {
        const response = await fetch(url, { 
            method: 'GET',
            cache: 'no-store',
            cf: {
                cacheTtl: -1,
                cacheEverything: false
            },
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache'
            }
        });
        
        if (!response.ok) return null;

        const text = await response.text();
        const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
        return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function checkForWebsiteUpdates() {
    let updateDetected = false;

    for (const fileUrl of FILES_TO_CHECK) {
        const serverFingerprint = await getFileFingerprint(fileUrl);
        
        if (!serverFingerprint) continue; 

        if (!initialFileFingerprints[fileUrl]) {
            initialFileFingerprints[fileUrl] = serverFingerprint;
            continue;
        }

        if (initialFileFingerprints[fileUrl] !== serverFingerprint) {
            updateDetected = true;
            break; 
        }
    }

    if (updateDetected) {
        window.location.reload();
    }
}

checkForWebsiteUpdates();
setInterval(checkForWebsiteUpdates, CHECK_INTERVAL);
