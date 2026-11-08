/**
 * INFLUQO - Product Catalog Data
 * All money values stored internally as integer kobo (1 NGN = 100 kobo).
 */

const INFLUQO_PRODUCTS = [
  // 1. Gadgets & Accessories
  {
    id: "wireless-earbuds",
    slug: "wireless-earbuds",
    name: "True Wireless Noise-Isolating Earbuds",
    category: "gadgets",
    categoryName: "Gadgets & Accessories",
    priceKobo: 1850000,
    originalPriceKobo: 2400000,
    shortDescription: "Crystal-clear stereo sound with magnetic quick-charge case and touch playback controls.",
    description: "Engineered for reliable daily commutes and active workouts in Nigeria, these true wireless earbuds offer crisp acoustic balance, deep bass response, and intuitive smart-touch playback. The compact pocket-sized charging case provides up to 28 hours of total playtime, with fast USB-C recharging when you need power in a hurry.",
    specs: {
      "Connectivity": "Bluetooth 5.3 (10m range)",
      "Battery Playtime": "6 hours per charge, 28 hours with charging case",
      "Charging Interface": "USB-C Fast Charge",
      "Water Resistance": "IPX4 splash and sweat resistant",
      "Microphone": "Dual MEMS with environmental noise cancellation"
    },
    image: "assets/images/products/wireless-earbuds.jpg",
    gallery: [
      "assets/images/products/wireless-earbuds.jpg",
      "assets/images/products/wireless-earbuds-alt.jpg"
    ],
    alt: "True Wireless Noise-Isolating Earbuds in charging case",
    variants: [
      { id: "matte-black", name: "Matte Black" },
      { id: "pearl-white", name: "Pearl White" },
      { id: "navy-blue", name: "Navy Blue" }
    ],
    stock: 25,
    isFeatured: true,
    isNewArrival: false,
    isDeal: true
  },
  {
    id: "bluetooth-headphones",
    slug: "bluetooth-headphones",
    name: "Over-Ear Wireless ANC Headphones",
    category: "gadgets",
    categoryName: "Gadgets & Accessories",
    priceKobo: 2800000,
    originalPriceKobo: 3500000,
    shortDescription: "Plush memory-foam ear cushions with 40mm neodymium drivers and foldable travel design.",
    description: "Immerse yourself in rich, high-fidelity audio with active ambient sound isolation. Designed with an adjustable brushed-alloy headband and breathable protein leather cushions for all-day comfort during work, study, or international flights.",
    specs: {
      "Acoustic Driver": "40mm Dynamic Neodymium",
      "Battery Life": "Up to 35 hours continuous playback",
      "Wired Option": "Includes 3.5mm detachable audio cable",
      "Foldable": "90-degree swiveling earcups with protective pouch",
      "Weight": "240g lightweight build"
    },
    image: "assets/images/products/bluetooth-headphones.jpg",
    gallery: [
      "assets/images/products/bluetooth-headphones.jpg",
      "assets/images/products/bluetooth-headphones-alt.jpg"
    ],
    alt: "Over-Ear Wireless ANC Headphones in deep navy and gold",
    variants: [
      { id: "midnight-navy", name: "Midnight Navy" },
      { id: "space-gray", name: "Space Gray" }
    ],
    stock: 14,
    isFeatured: true,
    isNewArrival: false,
    isDeal: true
  },
  {
    id: "smart-fitness-watch",
    slug: "smart-fitness-watch",
    name: "Full-Touch Smart Fitness & Health Tracker",
    category: "gadgets",
    categoryName: "Gadgets & Accessories",
    priceKobo: 2450000,
    originalPriceKobo: 3200000,
    shortDescription: "Vibrant high-contrast colour touchscreen with 24/7 heart rate, sleep metrics and call notifications.",
    description: "Keep track of your health goals, daily steps, heart rate and incoming messages directly from your wrist. Built with durable curved mineral glass and soft skin-friendly silicone straps suited for hot climates.",
    specs: {
      "Display": "1.4-inch High-Definition Color Touchscreen",
      "Sensors": "Optical Heart Rate, SpO2 Blood Oxygen, 3-Axis Accelerometer",
      "Battery": "7-10 days normal use on a single magnetic charge",
      "Water Resistance": "IP68 water and dust resistant",
      "Compatibility": "Android 5.0+ and iOS 9.0+"
    },
    image: "assets/images/products/smart-fitness-watch.jpg",
    gallery: [
      "assets/images/products/smart-fitness-watch.jpg",
      "assets/images/products/smart-fitness-watch-alt.jpg"
    ],
    alt: "Smart Fitness Watch with high-definition digital display",
    variants: [
      { id: "sport-black", name: "Sport Black" },
      { id: "champagne-gold", name: "Champagne Gold" },
      { id: "rose-pink", name: "Rose Pink" }
    ],
    stock: 18,
    isFeatured: true,
    isNewArrival: true,
    isDeal: true
  },
  {
    id: "adjustable-phone-stand",
    slug: "adjustable-phone-stand",
    name: "Foldable Aluminum Desktop Stand",
    category: "gadgets",
    categoryName: "Gadgets & Accessories",
    priceKobo: 650000,
    originalPriceKobo: null,
    shortDescription: "Weighted anti-slip base with dual-pivot hinges for phones and 11-inch tablets.",
    description: "Solid CNC-machined aluminum stand that holds your smartphone or tablet securely at the ideal ergonomic viewing angle for Zoom meetings, cooking recipes, or video streaming. Folds completely flat for effortless pocket portability.",
    specs: {
      "Material": "Anodized Aerospace Aluminum Alloy",
      "Adjustability": "Dual 270-degree rotation axes",
      "Cable Routing": "Reserved bottom cutout for charging while docked",
      "Device Support": "Compatible with 4 to 11 inch phones and tablets"
    },
    image: "assets/images/products/adjustable-phone-stand.jpg",
    gallery: ["assets/images/products/adjustable-phone-stand.jpg"],
    alt: "Adjustable Foldable Aluminum Desktop Stand",
    variants: [
      { id: "silver", name: "Matte Silver" },
      { id: "dark-navy", name: "Dark Navy" }
    ],
    stock: 40,
    isFeatured: false,
    isNewArrival: false,
    isDeal: false
  },

  // 2. Home & Kitchen
  {
    id: "portable-blender",
    slug: "portable-blender",
    name: "Rechargeable USB-C Personal Blender",
    category: "home",
    categoryName: "Home & Kitchen",
    priceKobo: 1650000,
    originalPriceKobo: 2100000,
    shortDescription: "6-blade 3D stainless steel cutter with 400ml BPA-free cup and magnetic safety switch.",
    description: "Blend fresh smoothies, protein shakes, and baby purees anywhere on the go. Powered by a heavy-duty rechargeable battery that delivers up to 15 blends per single charge, charged easily via any standard USB-C charger or power bank.",
    specs: {
      "Capacity": "400ml BPA-Free Food Grade Container",
      "Motor Speed": "20,000 RPM high-torque motor",
      "Blade Type": "6-Leaf 304 Stainless Steel Serrated Blades",
      "Battery": "4000mAh Dual-Cell USB-C Rechargeable",
      "Safety": "Automatic stop when cup is detached from base"
    },
    image: "assets/images/products/portable-blender.jpg",
    gallery: [
      "assets/images/products/portable-blender.jpg",
      "assets/images/products/portable-blender-alt.jpg"
    ],
    alt: "Rechargeable USB-C Personal Smoothie Blender",
    variants: [
      { id: "ocean-navy", name: "Ocean Navy" },
      { id: "pastel-pink", name: "Pastel Pink" },
      { id: "mint-green", name: "Mint Green" }
    ],
    stock: 22,
    isFeatured: true,
    isNewArrival: true,
    isDeal: true
  },
  {
    id: "kitchen-storage-containers",
    slug: "kitchen-storage-containers",
    name: "Airtight Pantry Food Containers (Set of 4)",
    category: "home",
    categoryName: "Home & Kitchen",
    priceKobo: 1200000,
    originalPriceKobo: null,
    shortDescription: "Stackable clear containers with silicone lock-seal lids to keep food dry and fresh.",
    description: "Organise flour, rice, beans, pasta, and snacks with these modular stackable pantry containers. Made from crystal-clear, shatterproof BPA-free plastic with easy-lock silicone rings that keep pantry pests and humidity out.",
    specs: {
      "Set Contents": "1x 1.8L, 2x 1.0L, 1x 0.5L containers",
      "Material": "BPA-Free Food Grade SAN Plastic",
      "Lid Mechanism": "4-Sided Airtight Snap Locks with Silicone Gaskets",
      "Temperature": "Freezer and top-rack dishwasher safe"
    },
    image: "assets/images/products/kitchen-storage-containers.jpg",
    gallery: ["assets/images/products/kitchen-storage-containers.jpg"],
    alt: "Airtight Pantry Food Container Set",
    variants: [
      { id: "navy-lids", name: "Navy Blue Lids" },
      { id: "clear-white-lids", name: "White Lids" }
    ],
    stock: 30,
    isFeatured: false,
    isNewArrival: false,
    isDeal: false
  },
  {
    id: "electric-food-chopper",
    slug: "electric-food-chopper",
    name: "Dual-Speed Electric Mini Food Chopper",
    category: "home",
    categoryName: "Home & Kitchen",
    priceKobo: 1950000,
    originalPriceKobo: 2500000,
    shortDescription: "300W pure copper motor with 2L thick glass bowl and dual-tier S-shaped cutting blades.",
    description: "Take the hard work out of cooking traditional Nigerian dishes. Effortlessly chops onions, peppers, tomatoes, garlic, and minced meat in 8 to 15 seconds. Thick tempered glass bowl cleans easily without absorbing food odors.",
    specs: {
      "Motor Power": "300W Pure Copper High-Efficiency Motor",
      "Bowl Volume": "2.0L Heavy Duty Tempered Glass Bowl",
      "Speeds": "Dual 2-Speed push button control",
      "Blades": "4-Blade Detachable Bi-Level Stainless Steel",
      "Safety": "Thermal overload protection with non-slip silicone base"
    },
    image: "assets/images/products/electric-food-chopper.jpg",
    gallery: ["assets/images/products/electric-food-chopper.jpg"],
    alt: "Dual-Speed Electric Mini Food Chopper with Glass Bowl",
    variants: [
      { id: "brushed-steel", name: "Stainless Steel & Navy" }
    ],
    stock: 12,
    isFeatured: true,
    isNewArrival: false,
    isDeal: true
  },
  {
    id: "insulated-flask",
    slug: "insulated-flask",
    name: "Vacuum Insulated Stainless Steel Flask (750ml)",
    category: "home",
    categoryName: "Home & Kitchen",
    priceKobo: 950000,
    originalPriceKobo: null,
    shortDescription: "Keeps beverages cold for 24 hours or steaming hot for 12 hours with sweat-proof powder coat.",
    description: "Stay hydrated during traffic or at your desk. Double-walled vacuum insulation prevents condensation while preserving beverage temperature from morning until night. Features a leakproof spout lid with an integrated carry loop.",
    specs: {
      "Capacity": "750ml (25 oz)",
      "Insulation": "Double-Wall 18/8 Pro-Grade Stainless Steel",
      "Performance": "Cold for 24h, Hot for 12h",
      "Finish": "Durable Matte Powder Coat"
    },
    image: "assets/images/products/insulated-flask.jpg",
    gallery: ["assets/images/products/insulated-flask.jpg"],
    alt: "Vacuum Insulated Stainless Steel Flask",
    variants: [
      { id: "deep-navy", name: "Deep Navy" },
      { id: "matte-black", name: "Matte Black" },
      { id: "desert-sand", name: "Desert Sand" }
    ],
    stock: 35,
    isFeatured: false,
    isNewArrival: true,
    isDeal: false
  },

  // 3. Fashion & Bags
  {
    id: "everyday-crossbody-bag",
    slug: "everyday-crossbody-bag",
    name: "Water-Resistant Everyday Crossbody Sling",
    category: "fashion",
    categoryName: "Fashion & Bags",
    priceKobo: 1500000,
    originalPriceKobo: null,
    shortDescription: "Urban multi-pocket sling bag with quick-release buckle and scratch-resistant oxford fabric.",
    description: "A compact everyday carry bag tailored for keeping your phone, power bank, wallet, keys, and transit cards secure and organized. Features water-resistant high-density nylon to keep your essentials protected during sudden rain.",
    specs: {
      "Material": "Water-Repellent 600D Oxford Fabric",
      "Strap": "Adjustable padded shoulder strap with quick buckle",
      "Compartments": "3 external zippered pockets + 1 hidden back anti-theft pocket",
      "Dimensions": "31cm x 17cm x 8cm"
    },
    image: "assets/images/products/everyday-crossbody-bag.jpg",
    gallery: ["assets/images/products/everyday-crossbody-bag.jpg"],
    alt: "Everyday Crossbody Sling Bag in navy and gold trim",
    variants: [
      { id: "classic-navy", name: "Classic Navy" },
      { id: "stealth-black", name: "Stealth Black" },
      { id: "olive-green", name: "Olive Green" }
    ],
    stock: 28,
    isFeatured: true,
    isNewArrival: false,
    isDeal: false
  },
  {
    id: "laptop-backpack",
    slug: "laptop-backpack",
    name: "Anti-Theft Business Laptop Backpack (15.6\")",
    category: "fashion",
    categoryName: "Fashion & Bags",
    priceKobo: 2200000,
    originalPriceKobo: 2900000,
    shortDescription: "Padded 15.6-inch laptop pocket, external USB charging port, and rear luggage trolley strap.",
    description: "Designed for tech professionals and students commuting in busy city transit. Includes a concealed anti-theft zipper, ergonomic airflow back padding, water-repellent shell, and dedicated shock-absorbent sleeves for laptops and tablets.",
    specs: {
      "Laptop Fit": "Fits up to 15.6-inch laptops + 11-inch tablet",
      "USB Pass-Through": "External charging port with built-in internal cable",
      "Ergonomics": "S-shaped breathable honeycomb shoulder straps",
      "Capacity": "22 Litres storage volume"
    },
    image: "assets/images/products/laptop-backpack.jpg",
    gallery: ["assets/images/products/laptop-backpack.jpg"],
    alt: "Anti-Theft Business Laptop Backpack",
    variants: [
      { id: "navy-heather", name: "Navy Heather" },
      { id: "charcoal-black", name: "Charcoal Black" }
    ],
    stock: 16,
    isFeatured: true,
    isNewArrival: true,
    isDeal: true
  },
  {
    id: "travel-organiser-pouches",
    slug: "travel-organiser-pouches",
    name: "6-Piece Packing Organiser Pouch Set",
    category: "fashion",
    categoryName: "Fashion & Bags",
    priceKobo: 850000,
    originalPriceKobo: null,
    shortDescription: "Lightweight breathable mesh travel organizers with double two-way zippers.",
    description: "Maximize suitcase space and eliminate travel clutter. This 6-piece assortment includes varied pouch sizes for shirts, trousers, toiletries, shoes, and electronic cables, keeping your luggage pristine on domestic and international trips.",
    specs: {
      "Set Contents": "3 Mesh packing cubes + 3 flat zippered laundry/cable pouches",
      "Material": "Ultra-lightweight ripstop nylon with breathable mesh panels",
      "Zippers": "Smooth gliding two-way metallic pull zippers",
      "Washable": "Hand wash or gentle wipe clean"
    },
    image: "assets/images/products/travel-organiser-pouches.jpg",
    gallery: ["assets/images/products/travel-organiser-pouches.jpg"],
    alt: "6-Piece Packing Organiser Pouch Set",
    variants: [
      { id: "navy-gold", name: "Navy & Gold Trim" },
      { id: "slate-gray", name: "Slate Gray" }
    ],
    stock: 35,
    isFeatured: false,
    isNewArrival: false,
    isDeal: false
  },
  {
    id: "minimalist-sunglasses",
    slug: "minimalist-sunglasses",
    name: "Minimalist Polarized UV400 Sunglasses",
    category: "fashion",
    categoryName: "Fashion & Bags",
    priceKobo: 750000,
    originalPriceKobo: null,
    shortDescription: "Lightweight golden alloy frame with glare-reducing polarized TAC composite lenses.",
    description: "Shield your eyes from intense equatorial sun with timeless minimalist aesthetics. Features UV400 full protection lenses that filter out 100% of harmful UVA/UVB rays and eliminate highway glare.",
    specs: {
      "Lens Technology": "9-Layer Polarized Triacetate Cellulose (TAC)",
      "UV Protection": "UV400 Certified (Blocks 100% UVA/UVB)",
      "Frame": "Corrosion-resistant stainless alloy with soft silicone nose pads",
      "Includes": "Protective leatherette pouch and microfiber cleaning cloth"
    },
    image: "assets/images/products/minimalist-sunglasses.jpg",
    gallery: ["assets/images/products/minimalist-sunglasses.jpg"],
    alt: "Minimalist Polarized Sunglasses with gold frame",
    variants: [
      { id: "gold-black", name: "Gold Frame / Black Lens" },
      { id: "black-black", name: "Black Frame / Black Lens" }
    ],
    stock: 45,
    isFeatured: false,
    isNewArrival: true,
    isDeal: false
  },

  // 4. Beauty & Personal Care
  {
    id: "led-vanity-mirror",
    slug: "led-vanity-mirror",
    name: "Rechargeable 3-Tone LED Vanity Mirror",
    category: "beauty",
    categoryName: "Beauty & Personal Care",
    priceKobo: 1800000,
    originalPriceKobo: 2300000,
    shortDescription: "Touchscreen sensor with warm, natural, and cool light settings and 90-degree swivel.",
    description: "Achieve flawless makeup application in any room lighting. Features high-definition distortion-free glass surrounded by energy-efficient daylight LEDs, with smooth touch-dimming and a convenient jewelry base tray.",
    specs: {
      "Lighting Modes": "Warm White (3000K), Natural (4500K), Cool White (6500K)",
      "Brightness": "Stepless touch dimming",
      "Battery": "1800mAh Rechargeable Lithium (lasts up to 2 weeks per charge)",
      "Base": "Detachable storage dish for rings and earrings"
    },
    image: "assets/images/products/led-vanity-mirror.jpg",
    gallery: ["assets/images/products/led-vanity-mirror.jpg"],
    alt: "Rechargeable 3-Tone LED Vanity Mirror",
    variants: [
      { id: "pearl-white", name: "Pearl White" },
      { id: "blush-pink", name: "Blush Pink" }
    ],
    stock: 20,
    isFeatured: true,
    isNewArrival: true,
    isDeal: true
  },
  {
    id: "makeup-brush-set",
    slug: "makeup-brush-set",
    name: "Professional 12-Piece Soft Makeup Brush Set",
    category: "beauty",
    categoryName: "Beauty & Personal Care",
    priceKobo: 800000,
    originalPriceKobo: null,
    shortDescription: "Ultra-soft cruelty-free synthetic bristles with solid wood handles and protective travel cylinder.",
    description: "A complete professional set covering powder, foundation, contour, blush, eyeshadow blending, and precision brows. Premium synthetic fibers pick up powder smoothly without shedding or irritating sensitive skin.",
    specs: {
      "Pieces": "12 essential cosmetic brushes",
      "Bristles": "100% Cruelty-free fine synthetic micro-fibers",
      "Ferrules": "Thickened electroplated gold aluminum",
      "Case": "Cylindrical hard-shell travel container"
    },
    image: "assets/images/products/makeup-brush-set.jpg",
    gallery: ["assets/images/products/makeup-brush-set.jpg"],
    alt: "Professional 12-Piece Soft Makeup Brush Set",
    variants: [
      { id: "navy-gold", name: "Navy & Gold" },
      { id: "black-gold", name: "Black & Gold" }
    ],
    stock: 32,
    isFeatured: false,
    isNewArrival: false,
    isDeal: false
  },
  {
    id: "cosmetic-organiser",
    slug: "cosmetic-organiser",
    name: "360-Degree Rotating Cosmetic Organiser",
    category: "beauty",
    categoryName: "Beauty & Personal Care",
    priceKobo: 1250000,
    originalPriceKobo: null,
    shortDescription: "Multi-tier adjustable acrylic carousel holds 30+ skincare bottles, lotions, and perfumes.",
    description: "Transform your vanity table into an uncluttered luxury display. Smooth 360-degree silent rotation gives instant access to all your creams, serums, lipsticks, and brushes, with 6 adjustable shelf heights to accommodate tall bottles.",
    specs: {
      "Material": "Reinforced High-Impact Crystal Clear Polystyrene",
      "Capacity": "Accommodates at least 30 cosmetics & 60 lipsticks/brushes",
      "Rotation": "Silent smooth steel bearing base mechanism",
      "Assembly": "Tool-free modular assembly in under 3 minutes"
    },
    image: "assets/images/products/cosmetic-organiser.jpg",
    gallery: ["assets/images/products/cosmetic-organiser.jpg"],
    alt: "360-Degree Rotating Cosmetic Organiser Tower",
    variants: [
      { id: "diamond-clear", name: "Diamond Clear" }
    ],
    stock: 26,
    isFeatured: false,
    isNewArrival: false,
    isDeal: false
  },
  {
    id: "rechargeable-hair-clipper",
    slug: "rechargeable-hair-clipper",
    name: "Cordless Barber Hair & Beard Trimmer",
    category: "beauty",
    categoryName: "Beauty & Personal Care",
    priceKobo: 2100000,
    originalPriceKobo: 2700000,
    shortDescription: "Zero-gapped carbon steel T-blade, carved all-metal body, and digital battery percentage readout.",
    description: "Get crisp salon-grade line-ups, fades, and beard trimming right at home. Features an ultra-sharp titanium-coated T-blade that trims close without snagging or pulling, powered by a powerful rotary motor and an LCD battery monitor.",
    specs: {
      "Blade": "Zero-Gapped Self-Sharpening Carbon Steel T-Blade",
      "Motor": "7000 RPM Low-Noise High-Torque Motor",
      "Battery": "1500mAh Lithium-ion with 180 minutes runtime",
      "Display": "Digital LCD remaining charge display",
      "Accessories": "4 Guide combs (1.5mm, 2mm, 3mm, 4mm), cleaning brush, USB cable"
    },
    image: "assets/images/products/rechargeable-hair-clipper.jpg",
    gallery: ["assets/images/products/rechargeable-hair-clipper.jpg"],
    alt: "Cordless Barber Hair & Beard Trimmer",
    variants: [
      { id: "carved-gold", name: "Carved Antique Gold" },
      { id: "onyx-black", name: "Onyx Black" }
    ],
    stock: 19,
    isFeatured: true,
    isNewArrival: true,
    isDeal: true
  },

  // 5. Lighting & Power
  {
    id: "rechargeable-desk-fan",
    slug: "rechargeable-desk-fan",
    name: "Rechargeable Oscillating Desk Fan with Light",
    category: "lighting",
    categoryName: "Lighting & Power",
    priceKobo: 2650000,
    originalPriceKobo: 3400000,
    shortDescription: "Whisper-quiet brushless motor with 7200mAh battery, 120-degree oscillation, and ambient night lamp.",
    description: "A lifesaver during Nigerian power outages and warm afternoons. Provides powerful, refreshing airflow for up to 14 hours on a single charge. Features 4 speed settings, automatic wide-angle oscillation, and a gentle LED glow ring for reading.",
    specs: {
      "Battery Capacity": "7200mAh USB-C Rechargeable",
      "Runtime": "5 hours on High, up to 14 hours on Low",
      "Noise Level": "Less than 28dB whisper-quiet operation",
      "Lighting": "Integrated 2-stage warm LED night light",
      "Portability": "Foldable compact base with carry groove"
    },
    image: "assets/images/products/rechargeable-desk-fan.jpg",
    gallery: ["assets/images/products/rechargeable-desk-fan.jpg"],
    alt: "Rechargeable Oscillating Desk Fan with Ambient Light",
    variants: [
      { id: "arctic-white", name: "White & Navy" },
      { id: "midnight-blue", name: "Midnight Navy" }
    ],
    stock: 15,
    isFeatured: true,
    isNewArrival: true,
    isDeal: true
  },
  {
    id: "led-study-lamp",
    slug: "led-study-lamp",
    name: "Eye-Care Foldable LED Study Desk Lamp",
    category: "lighting",
    categoryName: "Lighting & Power",
    priceKobo: 1400000,
    originalPriceKobo: null,
    shortDescription: "Flicker-free eye protection lighting with 5 color temperatures and touch sliding dimmer.",
    description: "Engineered to minimize eye fatigue during late-night study sessions and remote work. The flexible multi-angle gooseneck positions light exactly where you need it, with warm to daylight color modes that prevent blue-light strain.",
    specs: {
      "Illumination": "48 High-CRI Flicker-Free LED Diodes (CRI > 90)",
      "Color Temperature": "5 Modes (2700K - 6500K)",
      "Dimming": "Smooth touch brightness slider",
      "Power Source": "USB Powered (5V/2A compatible with power banks and laptops)"
    },
    image: "assets/images/products/led-study-lamp.jpg",
    gallery: ["assets/images/products/led-study-lamp.jpg"],
    alt: "Eye-Care Foldable LED Study Desk Lamp",
    variants: [
      { id: "classic-white", name: "Classic White" },
      { id: "matte-navy", name: "Matte Navy" }
    ],
    stock: 24,
    isFeatured: false,
    isNewArrival: false,
    isDeal: false
  },
  {
    id: "motion-sensor-light",
    slug: "motion-sensor-light",
    name: "Magnetic Motion Sensor Cabinet LED Light Bar",
    category: "lighting",
    categoryName: "Lighting & Power",
    priceKobo: 700000,
    originalPriceKobo: null,
    shortDescription: "Ultra-thin aluminum bar with PIR motion sensor and magnetic adhesive strip.",
    description: "Illuminate dark wardrobes, kitchen counters, stairways, and storage pantries automatically without drilling holes or running wires. The sensor detects motion within 3 meters and turns off after 20 seconds of no movement.",
    specs: {
      "Detection Angle": "120-degree wide PIR motion detection up to 3 meters",
      "Mounting": "Built-in strong magnets + peel-and-stick 3M magnetic plate",
      "Modes": "Always-On / Auto Motion-Detect / Off",
      "Battery": "Rechargeable via included Micro-USB cable (lasts 30+ days in auto mode)"
    },
    image: "assets/images/products/motion-sensor-light.jpg",
    gallery: ["assets/images/products/motion-sensor-light.jpg"],
    alt: "Magnetic Motion Sensor Cabinet LED Light Bar",
    variants: [
      { id: "warm-light", name: "Warm Light (3000K)" },
      { id: "daylight-white", name: "Daylight White (6000K)" }
    ],
    stock: 45,
    isFeatured: false,
    isNewArrival: false,
    isDeal: false
  },
  {
    id: "usb-c-charging-hub",
    slug: "usb-c-charging-hub",
    name: "7-in-1 Aluminum USB-C Hub & Adapter",
    category: "lighting",
    categoryName: "Lighting & Power",
    priceKobo: 1600000,
    originalPriceKobo: 2150000,
    shortDescription: "4K HDMI video output, 100W Power Delivery pass-through, USB 3.0 ports, and SD/TF card slots.",
    description: "Expand a single USB-C port on your laptop or tablet into a full workstation. Connect external monitors at 4K 30Hz, plug in flash drives, transfer photos from camera memory cards, and fast-charge your laptop simultaneously.",
    specs: {
      "Ports": "1x 4K HDMI, 1x USB-C PD 100W, 2x USB 3.0 (5Gbps), 1x USB 2.0, 1x SD, 1x TF",
      "Casing": "Heat-dissipating anodized aluminum alloy body",
      "Compatibility": "MacBook, Windows laptops, iPad Pro, and Android OTG devices",
      "Plug & Play": "No drivers or software installation required"
    },
    image: "assets/images/products/usb-c-charging-hub.jpg",
    gallery: ["assets/images/products/usb-c-charging-hub.jpg"],
    alt: "7-in-1 Aluminum USB-C Hub and Adapter",
    variants: [
      { id: "space-gray", name: "Space Gray" },
      { id: "gold-champagne", name: "Champagne Gold" }
    ],
    stock: 28,
    isFeatured: true,
    isNewArrival: false,
    isDeal: true
  },

  // 6. Lifestyle & Travel
  {
    id: "packing-cube-set",
    slug: "packing-cube-set",
    name: "Compression Travel Luggage Packing Cubes (4-Pack)",
    category: "lifestyle",
    categoryName: "Lifestyle & Travel",
    priceKobo: 1050000,
    originalPriceKobo: null,
    shortDescription: "Double-zipper compression technology compresses bulky clothing volume by up to 50%.",
    description: "Pack more into your carry-on without exceeding airline size constraints. Durable compression zippers squeeze excess trapped air out of shirts, dresses, and trousers, keeping garments organized and wrinkle-free.",
    specs: {
      "Pieces": "1 Extra Large (40x30cm), 1 Large (35x25cm), 1 Medium (30x20cm), 1 Shoe/Pouch",
      "Fabric": "High-Density Honeycomb Ripstop Poly-Nylon",
      "Zippers": "Reinforced heavy-gauge anti-burst metal zippers",
      "Weight": "Under 350 grams total set weight"
    },
    image: "assets/images/products/packing-cube-set.jpg",
    gallery: ["assets/images/products/packing-cube-set.jpg"],
    alt: "Compression Travel Luggage Packing Cubes 4-Pack",
    variants: [
      { id: "navy-gold", name: "Navy & Gold Accent" },
      { id: "charcoal", name: "Charcoal Black" }
    ],
    stock: 30,
    isFeatured: false,
    isNewArrival: true,
    isDeal: false
  },
  {
    id: "foldable-travel-duffel",
    slug: "foldable-travel-duffel",
    name: "Expandable Foldable Weekend Travel Duffel",
    category: "lifestyle",
    categoryName: "Lifestyle & Travel",
    priceKobo: 1800000,
    originalPriceKobo: 2400000,
    shortDescription: "Bottom zipper expansion adds 40% capacity with wet/dry separation pocket and trolley sleeve.",
    description: "The ultimate flexible travel companion for weekend trips, gym gear, or extra shopping baggage. Folds into a tiny compact pouch when not in use, and slides easily over your suitcase handle for hands-free airport navigation.",
    specs: {
      "Capacity": "Standard 35L expandable to 50L via bottom zipper",
      "Material": "Waterproof Tear-Resistant High-Density Oxford",
      "Special Pocket": "Waterproof PVC dry/wet separation compartment for towels or swimsuits",
      "Suitcase Strap": "Rear trolley sleeve fits standard suitcase retractable handles"
    },
    image: "assets/images/products/foldable-travel-duffel.jpg",
    gallery: ["assets/images/products/foldable-travel-duffel.jpg"],
    alt: "Expandable Foldable Weekend Travel Duffel Bag",
    variants: [
      { id: "navy-blue", name: "Navy Blue" },
      { id: "deep-purple", name: "Deep Plum" },
      { id: "classic-black", name: "Classic Black" }
    ],
    stock: 20,
    isFeatured: true,
    isNewArrival: true,
    isDeal: true
  },
  {
    id: "travel-neck-pillow",
    slug: "travel-neck-pillow",
    name: "360 Ergonomic Memory Foam Neck Pillow",
    category: "lifestyle",
    categoryName: "Lifestyle & Travel",
    priceKobo: 850000,
    originalPriceKobo: null,
    shortDescription: "High-density slow-rebound memory foam with breathable washable cover and travel pouch.",
    description: "Prevents stiff neck pain on long bus rides or flights. Contoured orthopedic lobes cradle your chin and cervical spine from all angles, with adjustable front drawstring toggles to customize your snugness.",
    specs: {
      "Cushioning": "100% Pure Slow-Rebound High-Density Memory Foam",
      "Cover Fabric": "Breathable sweat-wicking magnetic therapy fabric (removable and machine washable)",
      "Packability": "Rolls up to 1/2 size into included compact drawstring pouch",
      "Clasp": "Adjustable magnetic sliding clasp"
    },
    image: "assets/images/products/travel-neck-pillow.jpg",
    gallery: ["assets/images/products/travel-neck-pillow.jpg"],
    alt: "360 Ergonomic Memory Foam Travel Neck Pillow",
    variants: [
      { id: "navy-blue", name: "Navy Blue" },
      { id: "heather-gray", name: "Heather Gray" }
    ],
    stock: 35,
    isFeatured: false,
    isNewArrival: false,
    isDeal: false
  },
  {
    id: "desktop-organiser",
    slug: "desktop-organiser",
    name: "Multi-Compartment Faux Leather Desk Caddy",
    category: "lifestyle",
    categoryName: "Lifestyle & Travel",
    priceKobo: 900000,
    originalPriceKobo: null,
    shortDescription: "6 storage sections with pull-out drawer, gold stitching, and soft velvet lining.",
    description: "Clear desktop clutter with sophisticated style. Features designated slots for smartphones, remote controls, stationery pens, scissors, sticky notes, and business cards, finished in premium water-resistant vegan leather.",
    specs: {
      "Material": "Textured Vegan PU Leather with MDF reinforced structure",
      "Lining": "Anti-scratch soft microfiber velvet interior",
      "Compartments": "5 open sorting compartments + 1 smooth-sliding drawer",
      "Dimensions": "22.5cm x 14.5cm x 12.5cm"
    },
    image: "assets/images/products/desktop-organiser.jpg",
    gallery: ["assets/images/products/desktop-organiser.jpg"],
    alt: "Multi-Compartment Faux Leather Desk Caddy",
    variants: [
      { id: "navy-gold", name: "Navy Blue with Gold Accent" },
      { id: "rich-brown", name: "Rich Walnut Brown" }
    ],
    stock: 25,
    isFeatured: false,
    isNewArrival: false,
    isDeal: false
  }
];

/**
 * Format an integer kobo amount into Nigerian Naira (NGN)
 * @param {number} kobo - Amount in kobo (e.g. 1850000)
 * @returns {string} - Formatted string (e.g. "₦18,500")
 */
function formatKobo(kobo) {
  if (typeof kobo !== 'number' || isNaN(kobo)) return "₦0";
  const naira = Math.round(kobo / 100);
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(naira);
}

/** Catalog Access Functions */
function getAllProducts() {
  return INFLUQO_PRODUCTS;
}

function getProductById(id) {
  if (!id) return null;
  return INFLUQO_PRODUCTS.find(p => p.id === id || p.slug === id) || null;
}

function getProductsByCategory(category) {
  if (!category || category === 'all') return INFLUQO_PRODUCTS;
  return INFLUQO_PRODUCTS.filter(p => p.category === category);
}

function getFeaturedProducts() {
  return INFLUQO_PRODUCTS.filter(p => p.isFeatured);
}

function getNewArrivals() {
  return INFLUQO_PRODUCTS.filter(p => p.isNewArrival);
}

function getDeals() {
  return INFLUQO_PRODUCTS.filter(p => p.isDeal);
}

function getRelatedProducts(currentId, limit = 4) {
  const current = getProductById(currentId);
  if (!current) return INFLUQO_PRODUCTS.slice(0, limit);
  const sameCat = INFLUQO_PRODUCTS.filter(p => p.category === current.category && p.id !== current.id);
  if (sameCat.length >= limit) return sameCat.slice(0, limit);
  const others = INFLUQO_PRODUCTS.filter(p => p.category !== current.category && p.id !== current.id);
  return [...sameCat, ...others].slice(0, limit);
}

// Global exposure for browser and test environments
if (typeof window !== 'undefined') {
  window.INFLUQO_PRODUCTS = INFLUQO_PRODUCTS;
  window.formatKobo = formatKobo;
  window.getAllProducts = getAllProducts;
  window.getProductById = getProductById;
  window.getProductsByCategory = getProductsByCategory;
  window.getFeaturedProducts = getFeaturedProducts;
  window.getNewArrivals = getNewArrivals;
  window.getDeals = getDeals;
  window.getRelatedProducts = getRelatedProducts;
}
if (typeof globalThis !== 'undefined') {
  globalThis.INFLUQO_PRODUCTS = INFLUQO_PRODUCTS;
  globalThis.formatKobo = formatKobo;
  globalThis.getAllProducts = getAllProducts;
  globalThis.getProductById = getProductById;
  globalThis.getProductsByCategory = getProductsByCategory;
  globalThis.getFeaturedProducts = getFeaturedProducts;
  globalThis.getNewArrivals = getNewArrivals;
  globalThis.getDeals = getDeals;
  globalThis.getRelatedProducts = getRelatedProducts;
}
