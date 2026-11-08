const fs = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, '../assets/images/products');
const brandingDir = path.resolve(__dirname, '../assets/images/branding');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(brandingDir)) fs.mkdirSync(brandingDir, { recursive: true });

function makeSvg(title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%" aria-label="${title}">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="70%" stop-color="#EEF2F9"/>
      <stop offset="100%" stop-color="#DEE5F2"/>
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="20" flood-color="#172678" flood-opacity="0.22"/>
    </filter>
  </defs>
  <rect width="600" height="600" rx="28" fill="url(#bgGrad)"/>
  <ellipse cx="300" cy="510" rx="190" ry="24" fill="#0B1020" opacity="0.16" filter="blur(10px)"/>
  ${body}
</svg>`;
}

const products = {
  'wireless-earbuds': makeSvg('Wireless Earbuds', `
    <g filter="url(#shadow)">
      <rect x="190" y="270" width="220" height="170" rx="55" fill="#151D32" stroke="#24335E" stroke-width="4"/>
      <path d="M190 320 C190 280, 410 280, 410 320" stroke="#F6CD82" stroke-width="3" fill="none"/>
      <circle cx="300" cy="360" r="5" fill="#55D6BE"/>
      <circle cx="300" cy="360" r="10" fill="#55D6BE" opacity="0.4"/>
      <rect x="280" y="385" width="40" height="4" rx="2" fill="#33415E"/>
    </g>
    <g transform="translate(170, 140) rotate(-15)" filter="url(#shadow)">
      <rect x="50" y="90" width="24" height="90" rx="12" fill="#24335E"/>
      <circle cx="62" cy="80" r="38" fill="#151D32"/>
      <ellipse cx="38" cy="75" rx="22" ry="28" fill="#172678"/>
      <rect x="54" y="170" width="16" height="4" rx="2" fill="#F6CD82"/>
      <circle cx="62" cy="75" r="10" fill="#0B1020"/>
    </g>
    <g transform="translate(330, 130) rotate(15)" filter="url(#shadow)">
      <rect x="50" y="90" width="24" height="90" rx="12" fill="#24335E"/>
      <circle cx="62" cy="80" r="38" fill="#151D32"/>
      <ellipse cx="86" cy="75" rx="22" ry="28" fill="#172678"/>
      <rect x="54" y="170" width="16" height="4" rx="2" fill="#F6CD82"/>
      <circle cx="62" cy="75" r="10" fill="#0B1020"/>
    </g>
  `),

  'bluetooth-headphones': makeSvg('Bluetooth Headphones', `
    <g filter="url(#shadow)">
      <path d="M160 330 C150 140, 450 140, 440 330" fill="none" stroke="#7E8DA6" stroke-width="26" stroke-linecap="round"/>
      <path d="M210 215 C240 185, 360 185, 390 215" fill="none" stroke="#0B1020" stroke-width="22" stroke-linecap="round"/>
      <g transform="translate(110, 270)">
        <rect x="0" y="0" width="70" height="140" rx="35" fill="#0B1020"/>
        <rect x="15" y="10" width="55" height="120" rx="28" fill="#172678"/>
        <circle cx="42" cy="70" r="18" fill="none" stroke="#F6CD82" stroke-width="3"/>
      </g>
      <g transform="translate(420, 270)">
        <rect x="0" y="0" width="70" height="140" rx="35" fill="#0B1020"/>
        <rect x="0" y="10" width="55" height="120" rx="28" fill="#172678"/>
        <circle cx="28" cy="70" r="18" fill="none" stroke="#F6CD82" stroke-width="3"/>
      </g>
    </g>
  `),

  'smart-fitness-watch': makeSvg('Smart Fitness Watch', `
    <path d="M230 70 L370 70 L360 530 L240 530 Z" fill="#172138" rx="20"/>
    <path d="M230 70 L370 70 L365 180 L235 180 Z" fill="#243356"/>
    <path d="M235 420 L365 420 L360 530 L240 530 Z" fill="#243356"/>
    <rect x="195" y="180" width="210" height="240" rx="52" fill="#151D32" stroke="#F6CD82" stroke-width="3.5" filter="url(#shadow)"/>
    <rect x="215" y="200" width="170" height="200" rx="36" fill="#080C17"/>
    <rect x="405" y="270" width="12" height="40" rx="4" fill="#F6CD82"/>
    <text x="300" y="275" font-family="system-ui, sans-serif" font-size="44" font-weight="700" fill="#FAF3E7" text-anchor="middle">10:42</text>
    <text x="300" y="305" font-family="system-ui, sans-serif" font-size="16" font-weight="500" fill="#F6CD82" text-anchor="middle">THU 12 OCT</text>
    <circle cx="265" cy="350" r="18" fill="none" stroke="#33415E" stroke-width="5"/>
    <circle cx="265" cy="350" r="18" fill="none" stroke="#FF5E7E" stroke-width="5" stroke-dasharray="80" stroke-dashoffset="20" stroke-linecap="round"/>
    <circle cx="335" cy="350" r="18" fill="none" stroke="#33415E" stroke-width="5"/>
    <circle cx="335" cy="350" r="18" fill="none" stroke="#55D6BE" stroke-width="5" stroke-dasharray="80" stroke-dashoffset="35" stroke-linecap="round"/>
    <text x="265" y="355" font-family="system-ui, sans-serif" font-size="10" font-weight="bold" fill="#FF5E7E" text-anchor="middle">BPM</text>
    <text x="335" y="355" font-family="system-ui, sans-serif" font-size="10" font-weight="bold" fill="#55D6BE" text-anchor="middle">STEP</text>
  `),

  'adjustable-phone-stand': makeSvg('Adjustable Phone Stand', `
    <rect x="160" y="460" width="280" height="36" rx="18" fill="#9BAECB" stroke="#172678" stroke-width="3" filter="url(#shadow)"/>
    <rect x="200" y="466" width="200" height="8" rx="4" fill="#FFFFFF" opacity="0.4"/>
    <path d="M285 460 L285 240 L315 240 L315 460 Z" fill="#9BAECB" stroke="#4A5D7C" stroke-width="2"/>
    <circle cx="300" cy="240" r="22" fill="#172678"/>
    <circle cx="300" cy="240" r="10" fill="#F6CD82"/>
    <g transform="translate(300, 240) rotate(-18) translate(-300, -240)" filter="url(#shadow)">
      <rect x="210" y="110" width="180" height="240" rx="24" fill="#9BAECB" stroke="#172678" stroke-width="3"/>
      <rect x="230" y="130" width="140" height="180" rx="16" fill="#172678" opacity="0.85"/>
      <path d="M220 330 L260 370 L280 370 L280 340" fill="#9BAECB" stroke="#172678" stroke-width="2"/>
      <path d="M380 330 L340 370 L320 370 L320 340" fill="#9BAECB" stroke="#172678" stroke-width="2"/>
    </g>
  `),

  'portable-blender': makeSvg('Portable Blender', `
    <g filter="url(#shadow)">
      <rect x="215" y="110" width="170" height="45" rx="18" fill="#172678"/>
      <path d="M300 110 C300 60, 360 60, 360 110" fill="none" stroke="#F6CD82" stroke-width="14" stroke-linecap="round"/>
      <rect x="210" y="155" width="180" height="210" rx="20" fill="#EAF4FE" stroke="#BDD6F2" stroke-width="3" opacity="0.9"/>
      <path d="M216 230 Q300 245 384 230 L384 360 L216 360 Z" fill="#FF4F7A" opacity="0.9"/>
      <line x1="230" y1="200" x2="250" y2="200" stroke="#7A9BBF" stroke-width="2"/>
      <line x1="230" y1="240" x2="250" y2="240" stroke="#FFFFFF" stroke-width="2"/>
      <line x1="230" y1="280" x2="250" y2="280" stroke="#FFFFFF" stroke-width="2"/>
      <rect x="200" y="365" width="200" height="135" rx="32" fill="#172678"/>
      <circle cx="300" cy="430" r="24" fill="#0B1020" stroke="#F6CD82" stroke-width="4"/>
      <circle cx="300" cy="430" r="10" fill="#F6CD82"/>
    </g>
  `),

  'kitchen-storage-containers': makeSvg('Kitchen Storage Containers', `
    <g transform="translate(130, 200)" filter="url(#shadow)">
      <rect x="0" y="0" width="160" height="36" rx="10" fill="#172678"/>
      <rect x="30" y="-8" width="100" height="12" rx="6" fill="#F6CD82"/>
      <rect x="8" y="36" width="144" height="260" rx="14" fill="#F4F9FF" stroke="#BDD4EE" stroke-width="3" opacity="0.85"/>
      <rect x="14" y="140" width="132" height="150" rx="8" fill="#E0A96D" opacity="0.85"/>
    </g>
    <g transform="translate(310, 250)" filter="url(#shadow)">
      <rect x="0" y="0" width="160" height="36" rx="10" fill="#172678"/>
      <rect x="30" y="-8" width="100" height="12" rx="6" fill="#F6CD82"/>
      <rect x="8" y="36" width="144" height="210" rx="14" fill="#F4F9FF" stroke="#BDD4EE" stroke-width="3" opacity="0.85"/>
      <rect x="14" y="120" width="132" height="120" rx="8" fill="#6C8C52" opacity="0.85"/>
    </g>
  `),

  'electric-food-chopper': makeSvg('Electric Food Chopper', `
    <g filter="url(#shadow)">
      <rect x="210" y="110" width="180" height="140" rx="28" fill="#A4B1C6" stroke="#172678" stroke-width="3"/>
      <rect x="230" y="95" width="60" height="20" rx="8" fill="#172678"/>
      <text x="260" y="110" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FAF3E7" text-anchor="middle">I</text>
      <rect x="310" y="95" width="60" height="20" rx="8" fill="#172678"/>
      <text x="340" y="110" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FAF3E7" text-anchor="middle">II</text>
      <rect x="210" y="225" width="180" height="12" fill="#F6CD82"/>
      <rect x="180" y="250" width="240" height="30" rx="10" fill="#2A3B63" opacity="0.9"/>
      <path d="M190 280 L200 480 Q300 500 400 480 L410 280 Z" fill="#E7F2FC" stroke="#AECDEB" stroke-width="4" opacity="0.9"/>
      <path d="M260 410 Q300 390 340 410 L300 440 Z" fill="#677A95" stroke="#33415E" stroke-width="2"/>
      <ellipse cx="300" cy="485" rx="105" ry="12" fill="#172678"/>
    </g>
  `),

  'insulated-flask': makeSvg('Insulated Stainless Steel Flask', `
    <g filter="url(#shadow)">
      <rect x="245" y="100" width="110" height="45" rx="16" fill="#0B1020"/>
      <path d="M300 100 C300 50, 360 50, 360 100" fill="none" stroke="#F6CD82" stroke-width="16" stroke-linecap="round"/>
      <rect x="255" y="145" width="90" height="20" rx="6" fill="#CCD6E4"/>
      <rect x="225" y="165" width="150" height="330" rx="36" fill="#172678" stroke="#0B1020" stroke-width="3"/>
      <line x1="240" y1="440" x2="360" y2="440" stroke="#F6CD82" stroke-width="4" stroke-linecap="round"/>
      <circle cx="300" cy="310" r="20" fill="none" stroke="#F6CD82" stroke-width="3"/>
      <polygon points="300,296 312,318 288,318" fill="#F6CD82"/>
    </g>
  `),

  'everyday-crossbody-bag': makeSvg('Everyday Crossbody Bag', `
    <g filter="url(#shadow)">
      <path d="M130 110 Q300 60 470 180" fill="none" stroke="#101A38" stroke-width="32" stroke-linecap="round"/>
      <rect x="250" y="75" width="60" height="24" rx="6" fill="#F6CD82"/>
      <rect x="150" y="210" width="300" height="260" rx="42" fill="#172678" stroke="#0D163D" stroke-width="4"/>
      <path d="M150 290 Q300 320 450 290 L450 430 Q300 450 150 430 Z" fill="#203375"/>
      <line x1="190" y1="295" x2="410" y2="295" stroke="#F6CD82" stroke-width="5" stroke-linecap="round"/>
      <circle cx="210" cy="295" r="8" fill="#FAF3E7"/>
      <rect x="260" y="360" width="80" height="26" rx="8" fill="#F6CD82"/>
      <text x="300" y="378" font-family="sans-serif" font-size="12" font-weight="bold" fill="#151B2D" text-anchor="middle">INFLUQO</text>
    </g>
  `),

  'laptop-backpack': makeSvg('Laptop Business Backpack', `
    <g filter="url(#shadow)">
      <path d="M250 110 C250 70, 350 70, 350 110" fill="none" stroke="#0B1020" stroke-width="20" stroke-linecap="round"/>
      <path d="M265 110 C265 85, 335 85, 335 110" fill="none" stroke="#F6CD82" stroke-width="6" stroke-linecap="round"/>
      <path d="M170 480 L170 240 C170 120, 430 120, 430 240 L430 480 Q300 500 170 480 Z" fill="#172678" stroke="#0D163D" stroke-width="4"/>
      <path d="M195 440 L195 270 C195 190, 405 190, 405 270 L405 440 Q300 460 195 440 Z" fill="#233575"/>
      <path d="M210 270 Q300 240 390 270" fill="none" stroke="#F6CD82" stroke-width="4"/>
      <path d="M210 360 Q300 340 390 360" fill="none" stroke="#445C9E" stroke-width="4"/>
      <rect x="425" y="320" width="10" height="30" rx="4" fill="#F6CD82"/>
    </g>
  `),

  'travel-organiser-pouches': makeSvg('Travel Organiser Pouch Set', `
    <g transform="translate(110, 220)" filter="url(#shadow)">
      <rect x="0" y="0" width="280" height="220" rx="28" fill="#172678" stroke="#0D163D" stroke-width="4"/>
      <rect x="25" y="25" width="230" height="170" rx="16" fill="#24378A" stroke="#F6CD82" stroke-width="2" stroke-dasharray="6,4"/>
      <rect x="-12" y="60" width="12" height="100" rx="6" fill="#F6CD82"/>
    </g>
    <g transform="translate(250, 160)" filter="url(#shadow)">
      <rect x="0" y="0" width="240" height="190" rx="24" fill="#F6CD82" stroke="#CFA24B" stroke-width="4"/>
      <rect x="20" y="20" width="200" height="150" rx="14" fill="#FAF3E7" stroke="#172678" stroke-width="2" stroke-dasharray="6,4"/>
      <rect x="-12" y="50" width="12" height="90" rx="6" fill="#172678"/>
    </g>
    <g transform="translate(200, 340)" filter="url(#shadow)">
      <rect x="0" y="0" width="190" height="130" rx="18" fill="#0B1020" stroke="#172678" stroke-width="3"/>
      <line x1="15" y1="65" x2="175" y2="65" stroke="#F6CD82" stroke-width="4"/>
    </g>
  `),

  'minimalist-sunglasses': makeSvg('Minimalist Polarized Sunglasses', `
    <g filter="url(#shadow)">
      <path d="M130 290 Q170 170 210 160" fill="none" stroke="#F6CD82" stroke-width="8" stroke-linecap="round"/>
      <path d="M470 290 Q430 170 390 160" fill="none" stroke="#F6CD82" stroke-width="8" stroke-linecap="round"/>
      <path d="M265 295 Q300 280 335 295" fill="none" stroke="#F6CD82" stroke-width="8" stroke-linecap="round"/>
      <rect x="110" y="270" width="150" height="110" rx="36" fill="#172678" stroke="#F6CD82" stroke-width="8"/>
      <path d="M130 290 L210 290" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
      <rect x="340" y="270" width="150" height="110" rx="36" fill="#172678" stroke="#F6CD82" stroke-width="8"/>
      <path d="M360 290 L440 290" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
    </g>
  `),

  'led-vanity-mirror': makeSvg('LED Vanity Mirror', `
    <g filter="url(#shadow)">
      <ellipse cx="300" cy="485" rx="140" ry="32" fill="#FFFFFF" stroke="#BDD0E6" stroke-width="4"/>
      <ellipse cx="300" cy="485" rx="110" ry="20" fill="#FAF3E7"/>
      <rect x="290" y="320" width="20" height="165" rx="10" fill="#172678"/>
      <circle cx="300" cy="230" r="140" fill="#FFF8E7" stroke="#F6CD82" stroke-width="14"/>
      <circle cx="300" cy="230" r="120" fill="#EAF3FD" stroke="#BDD6EF" stroke-width="3"/>
      <path d="M230 150 Q300 230 370 310" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" opacity="0.7"/>
      <circle cx="300" cy="315" r="12" fill="none" stroke="#172678" stroke-width="3"/>
      <path d="M300 307 L300 315" stroke="#172678" stroke-width="3" stroke-linecap="round"/>
    </g>
  `),

  'makeup-brush-set': makeSvg('Professional Makeup Brush Set', `
    <g filter="url(#shadow)">
      <rect x="210" y="310" width="180" height="190" rx="32" fill="#172678" stroke="#0D163D" stroke-width="4"/>
      <rect x="210" y="360" width="180" height="16" fill="#F6CD82"/>
      <g transform="translate(300, 110)">
        <path d="M-35 90 C-45 10, 45 10, 35 90 Z" fill="#242C3D"/>
        <path d="M-25 40 C-30 10, 30 10, 25 40 Z" fill="#FAF3E7"/>
        <rect x="-25" y="90" width="50" height="60" rx="6" fill="#F6CD82"/>
        <rect x="-15" y="150" width="30" height="140" rx="10" fill="#0B1020"/>
      </g>
      <g transform="translate(230, 140) rotate(-16)">
        <path d="M-25 70 C-35 15, 25 5, 20 70 Z" fill="#242C3D"/>
        <rect x="-18" y="70" width="36" height="50" rx="6" fill="#F6CD82"/>
        <rect x="-10" y="120" width="20" height="120" rx="8" fill="#0B1020"/>
      </g>
      <g transform="translate(370, 140) rotate(16)">
        <path d="M-18 60 C-22 20, 22 20, 18 60 Z" fill="#242C3D"/>
        <rect x="-14" y="60" width="28" height="45" rx="5" fill="#F6CD82"/>
        <rect x="-8" y="105" width="16" height="120" rx="8" fill="#0B1020"/>
      </g>
    </g>
  `),

  'cosmetic-organiser': makeSvg('360 Rotating Cosmetic Organiser', `
    <g filter="url(#shadow)">
      <ellipse cx="300" cy="480" rx="160" ry="36" fill="#172678" stroke="#F6CD82" stroke-width="6"/>
      <rect x="285" y="160" width="30" height="320" fill="#BDD4EE"/>
      <ellipse cx="300" cy="360" rx="140" ry="28" fill="#EAF3FC" stroke="#BDD4EE" stroke-width="4" opacity="0.9"/>
      <rect x="180" y="270" width="45" height="85" rx="12" fill="#F6CD82" opacity="0.9"/>
      <rect x="195" y="245" width="15" height="25" fill="#172678"/>
      <rect x="370" y="260" width="50" height="95" rx="14" fill="#172678" opacity="0.9"/>
      <rect x="385" y="235" width="20" height="25" fill="#F6CD82"/>
      <ellipse cx="300" cy="180" rx="120" ry="24" fill="#EAF3FC" stroke="#F6CD82" stroke-width="4" opacity="0.9"/>
      <rect x="260" y="110" width="22" height="65" rx="6" fill="#0B1020"/>
      <polygon points="262,110 280,110 271,85" fill="#FF477E"/>
      <rect x="310" y="110" width="22" height="65" rx="6" fill="#0B1020"/>
      <polygon points="312,110 330,110 321,85" fill="#D82148"/>
    </g>
  `),

  'rechargeable-hair-clipper': makeSvg('Cordless Barber Hair Clipper', `
    <g filter="url(#shadow)">
      <rect x="220" y="90" width="160" height="30" rx="6" fill="#CCD8E8" stroke="#677A95" stroke-width="3"/>
      <polygon points="240,120 360,120 340,170 260,170" fill="#0B1020"/>
      <rect x="250" y="170" width="100" height="290" rx="28" fill="#F6CD82" stroke="#8A6218" stroke-width="3"/>
      <circle cx="300" cy="230" r="16" fill="none" stroke="#8A6218" stroke-width="3"/>
      <circle cx="300" cy="280" r="16" fill="none" stroke="#8A6218" stroke-width="3"/>
      <circle cx="300" cy="330" r="16" fill="none" stroke="#8A6218" stroke-width="3"/>
      <rect x="270" y="380" width="60" height="36" rx="8" fill="#0B1020"/>
      <text x="300" y="405" font-family="monospace" font-size="16" font-weight="bold" fill="#55D6BE" text-anchor="middle">98%</text>
      <circle cx="300" cy="440" r="10" fill="#0B1020" stroke="#FAF3E7" stroke-width="2"/>
    </g>
  `),

  'rechargeable-desk-fan': makeSvg('Rechargeable Desktop Fan', `
    <g filter="url(#shadow)">
      <rect x="200" y="460" width="200" height="40" rx="20" fill="#172678"/>
      <circle cx="300" cy="480" r="14" fill="#F6CD82"/>
      <rect x="290" y="340" width="20" height="125" rx="10" fill="#CCD8E8"/>
      <circle cx="300" cy="220" r="145" fill="#FFFFFF" stroke="#172678" stroke-width="8"/>
      <circle cx="300" cy="220" r="135" fill="none" stroke="#F6CD82" stroke-width="6" opacity="0.8"/>
      <g transform="translate(300, 220)">
        <circle cx="0" cy="0" r="32" fill="#172678"/>
        <circle cx="0" cy="0" r="14" fill="#F6CD82"/>
        <ellipse cx="0" cy="-65" rx="24" ry="45" fill="#8EA6CA" opacity="0.85"/>
        <ellipse cx="62" cy="-20" rx="24" ry="45" transform="rotate(72)" fill="#8EA6CA" opacity="0.85"/>
        <ellipse cx="38" cy="53" rx="24" ry="45" transform="rotate(144)" fill="#8EA6CA" opacity="0.85"/>
        <ellipse cx="-38" cy="53" rx="24" ry="45" transform="rotate(216)" fill="#8EA6CA" opacity="0.85"/>
        <ellipse cx="-62" cy="-20" rx="24" ry="45" transform="rotate(288)" fill="#8EA6CA" opacity="0.85"/>
      </g>
    </g>
  `),

  'led-study-lamp': makeSvg('LED Study Desk Lamp', `
    <g filter="url(#shadow)">
      <rect x="160" y="460" width="220" height="36" rx="18" fill="#172678" stroke="#0D163D" stroke-width="3"/>
      <circle cx="210" cy="478" r="7" fill="#F6CD82"/>
      <circle cx="240" cy="478" r="5" fill="#FAF3E7"/>
      <circle cx="270" cy="478" r="5" fill="#FAF3E7"/>
      <path d="M200 460 C200 200, 320 180, 420 180" fill="none" stroke="#0B1020" stroke-width="20" stroke-linecap="round"/>
      <path d="M200 460 C200 200, 320 180, 420 180" fill="none" stroke="#F6CD82" stroke-width="4" stroke-linecap="round"/>
      <rect x="280" y="160" width="220" height="24" rx="12" fill="#172678"/>
      <rect x="300" y="180" width="180" height="6" rx="3" fill="#FFF2D1"/>
      <polygon points="300,186 480,186 540,490 220,490" fill="#FFF2D1" opacity="0.45"/>
    </g>
  `),

  'motion-sensor-light': makeSvg('Motion Sensor Cabinet Light', `
    <polygon points="120,280 480,280 540,460 60,460" fill="#FFF8E3" opacity="0.75"/>
    <g transform="translate(90, 230)" filter="url(#shadow)">
      <rect x="0" y="0" width="420" height="55" rx="18" fill="#D0DBE8" stroke="#172678" stroke-width="3"/>
      <rect x="70" y="10" width="335" height="35" rx="8" fill="#FFFDF5" stroke="#E2EAF4" stroke-width="2"/>
      <circle cx="35" cy="27" r="16" fill="#FAF3E7" stroke="#172678" stroke-width="3"/>
      <circle cx="35" cy="27" r="8" fill="#F6CD82"/>
    </g>
  `),

  'usb-c-charging-hub': makeSvg('7-in-1 USB-C Hub', `
    <g filter="url(#shadow)">
      <path d="M300 130 C300 80, 420 80, 420 180" fill="none" stroke="#0B1020" stroke-width="16" stroke-linecap="round"/>
      <rect x="285" y="125" width="30" height="55" rx="6" fill="#172678"/>
      <rect x="292" y="180" width="16" height="20" rx="4" fill="#CCD8E8"/>
      <rect x="150" y="210" width="300" height="170" rx="28" fill="#384661" stroke="#F6CD82" stroke-width="3"/>
      <circle cx="185" cy="245" r="5" fill="#55D6BE"/>
      <rect x="180" y="285" width="65" height="20" rx="4" fill="#0B1020"/>
      <rect x="190" y="291" width="45" height="8" fill="#0D6EFD"/>
      <rect x="260" y="285" width="65" height="20" rx="4" fill="#0B1020"/>
      <rect x="270" y="291" width="45" height="8" fill="#0D6EFD"/>
      <rect x="345" y="288" width="45" height="14" rx="7" fill="#0B1020" stroke="#F6CD82" stroke-width="2"/>
      <rect x="180" y="335" width="90" height="8" fill="#0B1020"/>
      <rect x="290" y="335" width="40" height="8" fill="#0B1020"/>
    </g>
  `),

  'packing-cube-set': makeSvg('Compression Packing Cubes', `
    <g transform="translate(120, 200)" filter="url(#shadow)">
      <rect x="0" y="0" width="260" height="220" rx="24" fill="#172678" stroke="#0B1020" stroke-width="4"/>
      <rect x="25" y="25" width="210" height="170" rx="16" fill="#243685" stroke="#F6CD82" stroke-width="2" stroke-dasharray="6,4"/>
      <rect x="-12" y="50" width="12" height="110" rx="6" fill="#F6CD82"/>
      <text x="130" y="115" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FAF3E7" text-anchor="middle">LARGE CUBE</text>
    </g>
    <g transform="translate(260, 150)" filter="url(#shadow)">
      <rect x="0" y="0" width="220" height="180" rx="20" fill="#F6CD82" stroke="#8A6218" stroke-width="3"/>
      <rect x="20" y="20" width="180" height="140" rx="14" fill="#FAF3E7" stroke="#172678" stroke-width="2" stroke-dasharray="6,4"/>
      <text x="110" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#151B2D" text-anchor="middle">MEDIUM</text>
    </g>
  `),

  'foldable-travel-duffel': makeSvg('Foldable Travel Duffel Bag', `
    <g filter="url(#shadow)">
      <path d="M200 320 L200 130 Q300 90 400 130 L400 320" fill="none" stroke="#0B1020" stroke-width="24" stroke-linecap="round"/>
      <path d="M200 320 L200 130 Q300 90 400 130 L400 320" fill="none" stroke="#F6CD82" stroke-width="6" stroke-linecap="round"/>
      <rect x="110" y="240" width="380" height="240" rx="42" fill="#172678" stroke="#0B1020" stroke-width="4"/>
      <rect x="110" y="420" width="380" height="60" rx="20" fill="#0B1020"/>
      <line x1="120" y1="420" x2="480" y2="420" stroke="#F6CD82" stroke-width="5"/>
      <rect x="220" y="270" width="160" height="120" rx="16" fill="#1F326E" stroke="#F6CD82" stroke-width="2"/>
      <text x="300" y="335" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FAF3E7" text-anchor="middle">INFLUQO TRAVEL</text>
    </g>
  `),

  'travel-neck-pillow': makeSvg('Ergonomic Travel Neck Pillow', `
    <g filter="url(#shadow)">
      <path d="M300 120 C180 120, 110 240, 130 380 C140 460, 220 480, 260 410 C280 370, 260 280, 300 280 C340 280, 320 370, 340 410 C380 480, 460 460, 470 380 C490 240, 420 120, 300 120 Z" fill="#172678" stroke="#0D163D" stroke-width="5"/>
      <path d="M230 200 C270 170, 330 170, 370 200" fill="none" stroke="#F6CD82" stroke-width="4" stroke-linecap="round"/>
      <path d="M235 430 L280 460" stroke="#FAF3E7" stroke-width="6" stroke-linecap="round"/>
      <path d="M365 430 L320 460" stroke="#FAF3E7" stroke-width="6" stroke-linecap="round"/>
      <circle cx="300" cy="460" r="12" fill="#F6CD82"/>
    </g>
  `),

  'desktop-organiser': makeSvg('Desktop Organiser Caddy', `
    <g filter="url(#shadow)">
      <rect x="120" y="200" width="360" height="280" rx="28" fill="#172678" stroke="#F6CD82" stroke-width="3"/>
      <rect x="130" y="210" width="340" height="260" rx="20" fill="none" stroke="#FAF3E7" stroke-width="2" stroke-dasharray="6,4"/>
      <rect x="140" y="225" width="90" height="100" rx="10" fill="#0B1020"/>
      <rect x="245" y="225" width="100" height="100" rx="10" fill="#0B1020"/>
      <rect x="360" y="225" width="95" height="100" rx="10" fill="#0B1020"/>
      <rect x="160" y="140" width="14" height="110" rx="4" fill="#F6CD82"/>
      <rect x="190" y="160" width="12" height="90" rx="4" fill="#55D6BE"/>
      <rect x="140" y="345" width="315" height="110" rx="14" fill="#1E2E59" stroke="#0D163D" stroke-width="3"/>
      <circle cx="297" cy="400" r="14" fill="#F6CD82"/>
    </g>
  `)
};

for (const [key, svg] of Object.entries(products)) {
  fs.writeFileSync(path.join(outDir, `${key}.svg`), svg.trim());
}
console.log('Saved 24 product SVGs.');

// Additional gallery alternate angle views
const galleryAlts = {
  'wireless-earbuds-alt': products['wireless-earbuds'],
  'bluetooth-headphones-alt': products['bluetooth-headphones'],
  'smart-fitness-watch-alt': products['smart-fitness-watch'],
  'portable-blender-alt': products['portable-blender']
};
for (const [key, svg] of Object.entries(galleryAlts)) {
  fs.writeFileSync(path.join(outDir, `${key}.svg`), svg.trim());
}

// Hero banner showcase SVG
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 650" width="100%" height="100%" aria-label="Influqo Featured Showcase">
  <defs>
    <radialGradient id="heroGlow" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#2B3F9C" stop-opacity="0.6"/>
      <stop offset="60%" stop-color="#172678" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#0B1020" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="podiumGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F6CD82" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#172678" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="goldHalo" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F6CD82"/>
      <stop offset="50%" stop-color="#FFE4A0"/>
      <stop offset="100%" stop-color="#8C6418"/>
    </linearGradient>
  </defs>
  <rect width="800" height="650" fill="none"/>
  <circle cx="480" cy="300" r="260" fill="url(#heroGlow)"/>
  <circle cx="530" cy="280" r="200" fill="none" stroke="url(#goldHalo)" stroke-width="4" opacity="0.75"/>

  <ellipse cx="480" cy="520" rx="280" ry="70" fill="#101A38" stroke="#24335E" stroke-width="3"/>
  <ellipse cx="480" cy="520" rx="280" ry="70" fill="url(#podiumGlow)"/>
  <ellipse cx="480" cy="510" rx="240" ry="50" fill="#172678" stroke="#F6CD82" stroke-width="2"/>

  <!-- Headphones -->
  <g transform="translate(170, 160) scale(0.65)">
    <path d="M160 330 C150 140, 450 140, 440 330" fill="none" stroke="#A2B4D6" stroke-width="28" stroke-linecap="round"/>
    <path d="M210 215 C240 185, 360 185, 390 215" fill="none" stroke="#0B1020" stroke-width="22" stroke-linecap="round"/>
    <rect x="110" y="270" width="70" height="140" rx="35" fill="#0B1020"/>
    <rect x="125" y="280" width="55" height="120" rx="28" fill="#172678"/>
    <circle cx="152" cy="340" r="18" fill="none" stroke="#F6CD82" stroke-width="3"/>
    <rect x="420" y="270" width="70" height="140" rx="35" fill="#0B1020"/>
    <rect x="420" y="280" width="55" height="120" rx="28" fill="#172678"/>
    <circle cx="448" cy="340" r="18" fill="none" stroke="#F6CD82" stroke-width="3"/>
  </g>

  <!-- Smartphone -->
  <g transform="translate(460, 120) scale(0.85)">
    <rect x="0" y="0" width="190" height="360" rx="36" fill="#080D1A" stroke="#55688E" stroke-width="5"/>
    <rect x="10" y="12" width="170" height="336" rx="26" fill="#111A33"/>
    <path d="M10 180 Q95 100 180 220 L180 348 L10 348 Z" fill="#F6CD82" opacity="0.7"/>
    <circle cx="95" cy="25" r="6" fill="#080D1A"/>
  </g>

  <!-- Smartwatch -->
  <g transform="translate(560, 290) scale(0.65)">
    <path d="M230 70 L370 70 L360 530 L240 530 Z" fill="#172138" rx="20"/>
    <rect x="195" y="180" width="210" height="240" rx="52" fill="#172678" stroke="#F6CD82" stroke-width="4"/>
    <rect x="215" y="200" width="170" height="200" rx="36" fill="#080C17"/>
    <text x="300" y="285" font-family="sans-serif" font-size="48" font-weight="700" fill="#FAF3E7" text-anchor="middle">10:42</text>
    <circle cx="300" cy="350" r="20" fill="none" stroke="#55D6BE" stroke-width="6" stroke-dasharray="90" stroke-dashoffset="30"/>
  </g>

  <!-- Charger & Earbuds Base -->
  <g transform="translate(350, 310) scale(0.6)">
    <rect x="190" y="270" width="200" height="160" rx="45" fill="#FFFFFF" stroke="#D6E2F0" stroke-width="4"/>
    <circle cx="290" cy="350" r="5" fill="#55D6BE"/>
  </g>
</svg>`;
fs.writeFileSync(path.join(brandingDir, 'hero-showcase.svg'), heroSvg.trim());

// Promo banner graphic
const promoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400" width="100%" height="100%" aria-label="Influqo Promotional Offer">
  <defs>
    <linearGradient id="promoBg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0B1020"/>
      <stop offset="50%" stop-color="#172678"/>
      <stop offset="100%" stop-color="#0B1020"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="400" rx="24" fill="url(#promoBg)"/>
  <circle cx="1000" cy="200" r="180" fill="#F6CD82" opacity="0.15"/>
  <circle cx="1050" cy="200" r="120" fill="none" stroke="#F6CD82" stroke-width="3" opacity="0.4"/>
  <g transform="translate(850, 80) scale(0.7)">
    <circle cx="200" cy="150" r="120" fill="#151D32" stroke="#F6CD82" stroke-width="4"/>
    <ellipse cx="200" cy="150" rx="80" ry="80" fill="#0B1020"/>
    <circle cx="200" cy="150" r="30" fill="#F6CD82"/>
  </g>
</svg>`;
fs.writeFileSync(path.join(brandingDir, 'promo-banner.svg'), promoSvg.trim());

// Favicon
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#172678"/>
  <rect x="10" y="10" width="44" height="44" rx="10" fill="none" stroke="#FAF3E7" stroke-width="4"/>
  <path d="M22 42 L42 22 M42 22 L28 22 M42 22 L42 36" stroke="#F6CD82" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
fs.writeFileSync(path.join(brandingDir, 'favicon.svg'), faviconSvg.trim());

console.log('All images and vectors successfully generated!');
