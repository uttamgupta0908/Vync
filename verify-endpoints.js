
const urls = [
    'https://api.vync.live/api/v1/community/communities/trending/',
    'https://api.vync.live/api/v1/feed/feeds/whats-happening/'
];

async function check() {
    for (const url of urls) {
        try {
            console.log(`Checking ${url}...`);
            const res = await fetch(url);
            console.log(`Status: ${res.status}`);
            if (res.ok) {
                 const data = await res.json();
                 console.log('Data keys:', Object.keys(data));
                 console.log('Sample data:', JSON.stringify(data).slice(0, 100));
            } else {
                 console.log('Response text:', await res.text());
            }
        } catch (e) {
            console.error('Error:', e.message);
        }
        console.log('---');
    }
}

check();
