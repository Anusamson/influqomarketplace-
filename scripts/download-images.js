const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '../assets/images/products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Curated high quality real photographs from Unsplash (verified working public direct URLs)
const imagesToDownload = [
  // Gadgets & Accessories
  {
    id: 'wireless-earbuds',
    url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    alt: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'bluetooth-headphones',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    alt: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'smart-fitness-watch',
    url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
    alt: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'adjustable-phone-stand',
    url: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&auto=format&fit=crop&q=80'
  },

  // Home & Kitchen
  {
    id: 'portable-blender',
    url: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80',
    alt: 'https://images.unsplash.com/photo-1589733955941-5eeaf753fe92?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'kitchen-storage-containers',
    url: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'electric-food-chopper',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'insulated-flask',
    url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80'
  },

  // Fashion & Bags
  {
    id: 'everyday-crossbody-bag',
    url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'laptop-backpack',
    url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'travel-organiser-pouches',
    url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'minimalist-sunglasses',
    url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80'
  },

  // Beauty & Personal Care
  {
    id: 'led-vanity-mirror',
    url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'makeup-brush-set',
    url: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'cosmetic-organiser',
    url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'rechargeable-hair-clipper',
    url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80'
  },

  // Lighting & Power
  {
    id: 'rechargeable-desk-fan',
    url: 'https://images.unsplash.com/photo-1618941716939-553df3c6c278?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'led-study-lamp',
    url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'motion-sensor-light',
    url: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'usb-c-charging-hub',
    url: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&auto=format&fit=crop&q=80'
  },

  // Lifestyle & Travel
  {
    id: 'packing-cube-set',
    url: 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'foldable-travel-duffel',
    url: 'https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'travel-neck-pillow',
    url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'desktop-organiser',
    url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop&q=80'
  }
];

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    function getWithRedirect(targetUrl, redirects = 0) {
      if (redirects > 5) {
        return reject(new Error('Too many redirects for ' + targetUrl));
      }
      const client = targetUrl.startsWith('https') ? https : http;
      client.get(targetUrl, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return getWithRedirect(res.headers.location, redirects + 1);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`Failed to download ${targetUrl}, status: ${res.statusCode}`));
        }
        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      }).on('error', (err) => {
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        reject(err);
      });
    }
    getWithRedirect(url);
  });
}

async function run() {
  console.log(`Starting download of ${imagesToDownload.length} real product photos from Unsplash...`);
  for (const item of imagesToDownload) {
    const mainFile = path.join(targetDir, `${item.id}.jpg`);
    try {
      await downloadFile(item.url, mainFile);
      console.log(`[SUCCESS] Downloaded ${item.id}.jpg`);
    } catch (e) {
      console.error(`[ERROR] ${item.id}.jpg: ${e.message}`);
    }

    if (item.alt) {
      const altFile = path.join(targetDir, `${item.id}-alt.jpg`);
      try {
        await downloadFile(item.alt, altFile);
        console.log(`[SUCCESS] Downloaded ${item.id}-alt.jpg`);
      } catch (e) {
        console.error(`[ERROR] ${item.id}-alt.jpg: ${e.message}`);
      }
    }
  }
  console.log('Finished downloading photos.');
}

run();
